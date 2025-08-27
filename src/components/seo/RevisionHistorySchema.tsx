import Script from 'next/script';

interface Revision {
  date: string;
  type: 'correction' | 'update' | 'clarification' | 'breaking' | 'major_update' | 'minor_update' | 'fact_check';
  description: string;
  author?: string;
  affectedSection?: string;
}

interface RevisionHistorySchemaProps {
  articleUrl: string;
  headline: string;
  publishDate: string;
  modifiedDate?: string;
  revisions?: Revision[];
}

/**
 * Comprehensive Revision History Schema for Google News
 * Provides detailed update tracking for transparency and freshness signals
 */
export default function RevisionHistorySchema({
  articleUrl,
  headline,
  publishDate,
  modifiedDate,
  revisions = []
}: RevisionHistorySchemaProps) {
  
  // Generate comprehensive revision history schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": articleUrl,
    "headline": headline,
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    
    // Add update frequency indicator
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "updateFrequency",
      "value": revisions.length > 0 ? "Updated" : "Original"
    },
    
    // Detailed revision history
    "hasPart": revisions.map((revision, index) => ({
      "@type": "CreativeWork",
      "@id": `${articleUrl}#revision-${index + 1}`,
      "name": `${getRevisionLabel(revision.type)}: ${revision.description.substring(0, 100)}`,
      "dateCreated": revision.date,
      "description": revision.description,
      "author": revision.author ? {
        "@type": "Person",
        "name": revision.author
      } : {
        "@type": "Organization",
        "name": "Report Focus News Editorial Team"
      },
      "isPartOf": {
        "@type": "NewsArticle",
        "@id": articleUrl
      }
    })),
    
    // Correction tracking specifically
    "correction": revisions
      .filter(r => r.type === 'correction')
      .map(revision => ({
        "@type": "CorrectionComment", 
        "dateCreated": revision.date,
        "text": revision.description,
        "commentText": `Correction: ${revision.description}`,
        "creator": revision.author ? {
          "@type": "Person",
          "name": revision.author
        } : undefined
      })),
    
    // Update action history
    "potentialAction": revisions.map((revision, index) => ({
      "@type": "UpdateAction",
      "name": getRevisionLabel(revision.type),
      "startTime": index === 0 ? publishDate : revisions[index - 1].date,
      "endTime": revision.date,
      "object": {
        "@type": "NewsArticle",
        "headline": headline,
        "url": articleUrl
      },
      "result": {
        "@type": "CreativeWork",
        "text": revision.description,
        "dateCreated": revision.date
      },
      "actionStatus": "CompletedActionStatus"
    })),
    
    // Version history for transparency
    "version": revisions.length > 0 ? `${revisions.length + 1}.0` : "1.0",
    
    // Editorial notes if corrections exist
    ...(revisions.some(r => r.type === 'correction') && {
      "editorialNote": "This article has been corrected. See revision history for details."
    }),
    
    // Backstory for major updates
    ...(revisions.some(r => r.type === 'major_update' || r.type === 'breaking') && {
      "backstory": {
        "@type": "CreativeWork",
        "name": "Article Update History",
        "text": `This is a developing story that has been updated ${revisions.filter(r => r.type === 'major_update' || r.type === 'breaking').length} time(s) with breaking information.`
      }
    })
  };
  
  return (
    <Script
      id="revision-history-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Helper function to get revision label
function getRevisionLabel(type: Revision['type']): string {
  switch (type) {
    case 'correction':
      return 'CORRECTION';
    case 'update':
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
}