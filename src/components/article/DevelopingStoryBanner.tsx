'use client';

import { useEffect, useState } from 'react';

interface DevelopingStoryBannerProps {
  lastUpdate?: string;
  isBreaking?: boolean;
  updateCount?: number;
}

/**
 * Developing Story Banner
 * Shows live update status for breaking news stories
 * Critical for Google News Top Stories placement
 */
export default function DevelopingStoryBanner({ 
  lastUpdate, 
  isBreaking = false,
  updateCount = 0 
}: DevelopingStoryBannerProps) {
  const [pulse, setPulse] = useState(true);
  
  useEffect(() => {
    // Pulse animation for breaking news
    if (isBreaking) {
      const interval = setInterval(() => {
        setPulse(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isBreaking]);
  
  if (!isBreaking && updateCount === 0) {
    return null;
  }
  
  return (
    <div className={`developing-story-banner ${
      isBreaking ? 'bg-red-600' : 'bg-orange-500'
    } text-white p-3 mb-6 rounded-lg shadow-lg`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            {isBreaking && (
              <span className={`flex h-3 w-3 relative ${pulse ? 'animate-ping' : ''}`}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            )}
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">
              {isBreaking ? 'BREAKING' : 'DEVELOPING STORY'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {updateCount > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded">
                {updateCount} update{updateCount > 1 ? 's' : ''}
              </span>
            )}
            {lastUpdate && (
              <span className="opacity-90">
                <span className="hidden sm:inline">Last updated: </span>
                <span className="sm:hidden">Updated: </span>
                {new Date(lastUpdate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* LiveBlogPosting schema for Google */}
      {isBreaking && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LiveBlogPosting",
              "about": {
                "@type": "Event",
                "startDate": lastUpdate || new Date().toISOString(),
                "name": "Breaking News Event"
              },
              "coverageStartTime": lastUpdate || new Date().toISOString(),
              "coverageEndTime": new Date().toISOString(),
              "liveBlogUpdate": []
            })
          }}
        />
      )}
    </div>
  );
}