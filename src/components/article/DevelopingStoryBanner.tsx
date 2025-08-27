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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isBreaking && (
            <span className={`flex h-3 w-3 relative ${pulse ? 'animate-ping' : ''}`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          )}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-sm uppercase tracking-wide">
              {isBreaking ? 'BREAKING' : 'DEVELOPING STORY'}
            </span>
          </div>
          {updateCount > 0 && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {updateCount} update{updateCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {lastUpdate && (
          <time className="text-xs">
            Last updated: {new Date(lastUpdate).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit'
            })}
          </time>
        )}
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