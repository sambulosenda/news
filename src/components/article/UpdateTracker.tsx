'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface UpdateTrackerProps {
  publishDate: string;
  modifiedDate?: string;
  updates?: ArticleUpdate[];
}

interface ArticleUpdate {
  date: string;
  type: 'correction' | 'addition' | 'clarification' | 'breaking';
  description: string;
  author?: string;
}

/**
 * Article Update Tracking Component
 * Shows update history for transparency and Google News freshness signals
 */
export default function UpdateTracker({ 
  publishDate, 
  modifiedDate,
  updates = []
}: UpdateTrackerProps) {
  const [showUpdates, setShowUpdates] = useState(false);
  const [hasSignificantUpdate, setHasSignificantUpdate] = useState(false);
  
  useEffect(() => {
    // Check if article was significantly updated (more than 1 hour after publish)
    if (modifiedDate && publishDate) {
      const published = new Date(publishDate);
      const modified = new Date(modifiedDate);
      const hoursDiff = (modified.getTime() - published.getTime()) / (1000 * 60 * 60);
      setHasSignificantUpdate(hoursDiff > 1);
    }
  }, [publishDate, modifiedDate]);
  
  if (!hasSignificantUpdate && updates.length === 0) {
    return null;
  }
  
  const getUpdateIcon = (type: ArticleUpdate['type']) => {
    switch (type) {
      case 'correction':
        return '🔴'; // Red for corrections
      case 'addition':
        return '🟢'; // Green for additions
      case 'clarification':
        return '🔵'; // Blue for clarifications
      case 'breaking':
        return '⚡'; // Lightning for breaking updates
      default:
        return '📝';
    }
  };
  
  const getUpdateLabel = (type: ArticleUpdate['type']) => {
    switch (type) {
      case 'correction':
        return 'Correction';
      case 'addition':
        return 'Update';
      case 'clarification':
        return 'Clarification';
      case 'breaking':
        return 'Breaking';
      default:
        return 'Update';
    }
  };
  
  return (
    <div className="article-update-tracker bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold text-blue-900">
            Article Updated
          </span>
          {modifiedDate && (
            <time className="text-sm text-blue-700">
              {format(new Date(modifiedDate), 'MMM d, yyyy h:mm a')}
            </time>
          )}
        </div>
        {updates.length > 0 && (
          <button
            onClick={() => setShowUpdates(!showUpdates)}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {showUpdates ? 'Hide' : 'Show'} update history
          </button>
        )}
      </div>
      
      {/* Update history */}
      {showUpdates && updates.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="font-semibold text-sm text-blue-900">Update History:</h4>
          {updates.map((update, index) => (
            <div key={index} className="flex gap-3 text-sm">
              <span className="text-lg" title={getUpdateLabel(update.type)}>
                {getUpdateIcon(update.type)}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-900">
                    {getUpdateLabel(update.type)}
                  </span>
                  <time className="text-xs text-blue-600">
                    {format(new Date(update.date), 'MMM d, h:mm a')}
                  </time>
                  {update.author && (
                    <span className="text-xs text-blue-600">
                      by {update.author}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{update.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* SEO metadata for updates */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "UpdateAction",
            "object": {
              "@type": "NewsArticle",
              "dateModified": modifiedDate || publishDate
            },
            "startTime": publishDate,
            "endTime": modifiedDate || new Date().toISOString(),
            "actionStatus": "CompletedActionStatus"
          })
        }}
      />
    </div>
  );
}