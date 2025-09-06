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
  type: 'correction' | 'addition' | 'clarification' | 'breaking' | 'major_update' | 'minor_update' | 'fact_check';
  description: string;
  author?: string;
  affectedSection?: string;
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
      case 'major_update':
        return '⭐'; // Star for major updates
      case 'minor_update':
        return '✏️'; // Pencil for minor updates
      case 'fact_check':
        return '✅'; // Check for fact checks
      default:
        return '📝';
    }
  };
  
  const getUpdateLabel = (type: ArticleUpdate['type']) => {
    switch (type) {
      case 'correction':
        return 'CORRECTION';
      case 'addition':
        return 'UPDATE';
      case 'clarification':
        return 'CLARIFICATION';
      case 'breaking':
        return 'BREAKING UPDATE';
      case 'major_update':
        return 'MAJOR UPDATE';
      case 'minor_update':
        return 'MINOR UPDATE';
      case 'fact_check':
        return 'FACT CHECK';
      default:
        return 'UPDATE';
    }
  };
  
  const _getUpdateColor = (type: ArticleUpdate['type']) => {
    switch (type) {
      case 'correction':
        return 'bg-red-50 border-red-400 text-red-900';
      case 'breaking':
        return 'bg-yellow-50 border-yellow-400 text-yellow-900';
      case 'major_update':
        return 'bg-purple-50 border-purple-400 text-purple-900';
      case 'fact_check':
        return 'bg-green-50 border-green-400 text-green-900';
      default:
        return 'bg-blue-50 border-blue-400 text-blue-900';
    }
  };
  
  return (
    <div className="article-update-tracker bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-sm sm:text-base text-blue-900">
              Article Updated
            </span>
          </div>
          {modifiedDate && (
            <time className="text-xs sm:text-sm text-blue-700 pl-6 sm:pl-0">
              {format(new Date(modifiedDate), 'MMM d')}
              <span className="hidden sm:inline">, {format(new Date(modifiedDate), 'yyyy')}</span>
              {' at '}
              {format(new Date(modifiedDate), 'h:mm a')}
            </time>
          )}
        </div>
        {updates.length > 0 && (
          <button
            onClick={() => setShowUpdates(!showUpdates)}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 underline self-start sm:self-auto"
          >
            {showUpdates ? 'Hide' : 'Show'} history
          </button>
        )}
      </div>
      
      {/* Update history */}
      {showUpdates && updates.length > 0 && (
        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
          <h4 className="font-semibold text-xs sm:text-sm text-blue-900">Update History:</h4>
          {updates.map((update, index) => (
            <div key={index} className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="text-base sm:text-lg flex-shrink-0" title={getUpdateLabel(update.type)}>
                {getUpdateIcon(update.type)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <span className="font-semibold text-blue-900 text-xs sm:text-sm">
                    {getUpdateLabel(update.type)}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <time className="text-blue-600">
                      {format(new Date(update.date), 'MMM d, h:mm a')}
                    </time>
                    {update.author && (
                      <span className="text-blue-600">
                        by {update.author}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 break-words">{update.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Enhanced revision history schema for Google News */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "dateModified": modifiedDate || publishDate,
            "backstory": updates.length > 0 ? {
              "@type": "CreativeWork",
              "name": "Article Revision History",
              "text": `This article has been updated ${updates.length} time(s) since publication.`
            } : undefined,
            "correction": updates.filter(u => u.type === 'correction').map(update => ({
              "@type": "CorrectionComment",
              "dateCreated": update.date,
              "text": update.description,
              "creator": update.author ? {
                "@type": "Person",
                "name": update.author
              } : undefined
            })),
            "updateHistory": {
              "@type": "ItemList",
              "itemListElement": updates.map((update, index) => ({
                "@type": "UpdateAction",
                "position": index + 1,
                "startTime": index === 0 ? publishDate : updates[index - 1].date,
                "endTime": update.date,
                "object": {
                  "@type": "NewsArticle",
                  "headline": `${getUpdateLabel(update.type)}: ${update.description.substring(0, 100)}`
                },
                "agent": update.author ? {
                  "@type": "Person",
                  "name": update.author
                } : {
                  "@type": "Organization",
                  "name": "Report Focus News Editorial Team"
                },
                "actionStatus": "CompletedActionStatus",
                "result": {
                  "@type": "CreativeWork",
                  "text": update.description
                }
              }))
            }
          })
        }}
      />
    </div>
  );
}