'use client';

import { useEffect, useState } from 'react';
import { getRelativeTime, isBreakingNews, getUpdateIndicator } from '@/lib/utils/time-utils';

interface ArticleTimestampProps {
  publishDate: string;
  modifiedDate?: string;
  showBreaking?: boolean;
  showUpdate?: boolean;
  className?: string;
}

/**
 * Real-time article timestamp component
 * Updates every minute to show fresh content signals to users
 * Critical for Google News ranking
 */
export default function ArticleTimestamp({
  publishDate,
  modifiedDate,
  showBreaking = true,
  showUpdate = true,
  className = '',
}: ArticleTimestampProps) {
  const [relativeTime, setRelativeTime] = useState<string>('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [updateText, setUpdateText] = useState<string | null>(null);
  
  useEffect(() => {
    // Initial calculation
    const updateTimestamp = () => {
      setRelativeTime(getRelativeTime(publishDate));
      setIsBreaking(showBreaking && isBreakingNews(publishDate));
      setUpdateText(showUpdate ? getUpdateIndicator(publishDate, modifiedDate) : null);
    };
    
    updateTimestamp();
    
    // Update every minute for fresh timestamps
    const interval = setInterval(updateTimestamp, 60000);
    
    return () => clearInterval(interval);
  }, [publishDate, modifiedDate, showBreaking, showUpdate]);
  
  // Server-side render fallback
  if (!relativeTime) {
    const date = new Date(publishDate);
    return (
      <time dateTime={date.toISOString()} className={className}>
        {date.toLocaleDateString()}
      </time>
    );
  }
  
  return (
    <div className={`article-timestamp ${className}`}>
      {isBreaking && (
        <span className="breaking-indicator inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 mr-2">
          <svg className="w-3 h-3 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          BREAKING
        </span>
      )}
      
      <time 
        dateTime={new Date(publishDate).toISOString()} 
        className={`text-gray-600 ${isBreaking ? 'font-semibold text-red-600' : ''}`}
      >
        {relativeTime}
      </time>
      
      {updateText && (
        <span className="update-indicator ml-2 text-blue-600 text-sm">
          <svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          {updateText}
        </span>
      )}
    </div>
  );
}