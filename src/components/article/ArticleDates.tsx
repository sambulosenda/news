'use client';

import { format, differenceInHours, differenceInDays } from 'date-fns';
import { useState, useEffect } from 'react';

interface ArticleDatesProps {
  publishDate: string;
  modifiedDate?: string;
  variant?: 'compact' | 'detailed';
  showRelativeTime?: boolean;
}

/**
 * Enhanced Article Date Display Component
 * Prominently shows both publish and modified dates for transparency
 */
export default function ArticleDates({ 
  publishDate, 
  modifiedDate,
  variant = 'detailed',
  showRelativeTime = true
}: ArticleDatesProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const published = new Date(publishDate);
  const modified = modifiedDate ? new Date(modifiedDate) : null;
  const hasUpdate = modified && modified > published;
  
  // Calculate time differences
  const hoursSinceUpdate = modified ? differenceInHours(new Date(), modified) : 0;
  const _daysSincePublish = differenceInDays(new Date(), published);
  
  // Determine if this is a significant update
  const isSignificantUpdate = hasUpdate && modified && 
    (modified.getTime() - published.getTime()) > (60 * 60 * 1000); // More than 1 hour
  
  const getRelativeTime = (date: Date) => {
    if (!mounted) return '';
    
    const hours = differenceInHours(new Date(), date);
    const days = differenceInDays(new Date(), date);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return format(date, 'MMM d, yyyy');
  };
  
  if (variant === 'compact') {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
        <time dateTime={publishDate} className="text-gray-600">
          <span className="font-medium">Published:</span> {mounted ? getRelativeTime(published) : format(published, 'MMM d, yyyy')}
        </time>
        {isSignificantUpdate && modified && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-blue-600 font-medium">
              Updated {mounted ? getRelativeTime(modified) : format(modified, 'MMM d')}
            </span>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="article-dates space-y-2">
      {/* Primary date display */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-600">Published:</span>
          <time 
            dateTime={publishDate}
            className="font-medium text-gray-900"
            itemProp="datePublished"
          >
            {format(published, 'MMMM d, yyyy')} at {format(published, 'h:mm a')}
          </time>
          {showRelativeTime && mounted && (
            <span className="text-gray-500">
              ({getRelativeTime(published)})
            </span>
          )}
        </div>
      </div>
      
      {/* Modified date with prominence */}
      {isSignificantUpdate && modified && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {hoursSinceUpdate < 24 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
            </div>
            <span className="text-blue-600 font-medium">Last Updated:</span>
            <time 
              dateTime={modifiedDate}
              className="font-semibold text-blue-900"
              itemProp="dateModified"
            >
              {format(modified, 'MMMM d, yyyy')} at {format(modified, 'h:mm a')}
            </time>
            {showRelativeTime && mounted && (
              <span className="text-blue-600">
                ({getRelativeTime(modified)})
              </span>
            )}
          </div>
          
          {/* Update badge for recent updates */}
          {hoursSinceUpdate < 24 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              Recently Updated
            </span>
          )}
        </div>
      )}
      
      {/* Schema markup for dates */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "datePublished": publishDate,
            "dateModified": modifiedDate || publishDate
          })
        }}
      />
    </div>
  );
}