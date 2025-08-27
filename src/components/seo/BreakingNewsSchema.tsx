import { isBreakingNews } from '@/lib/utils/time-utils';

interface BreakingNewsSchemaProps {
  article: {
    title: string;
    date: string;
    modified?: string;
    url: string;
    excerpt?: string;
    author?: {
      node?: {
        name: string;
      };
    };
  };
}

/**
 * Breaking News Schema for Google News
 * Adds special markup for very fresh articles (< 2 hours old)
 * Helps with Google News Top Stories carousel
 */
export default function BreakingNewsSchema({ article }: BreakingNewsSchemaProps) {
  // Only show for breaking news
  if (!isBreakingNews(article.date)) {
    return null;
  }
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "datePublished": new Date(article.date).toISOString(),
    "dateModified": article.modified ? new Date(article.modified).toISOString() : new Date(article.date).toISOString(),
    "url": article.url,
    "description": article.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || article.title,
    "author": {
      "@type": "Person",
      "name": article.author?.node?.name || "Report Focus News Staff"
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Report Focus News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reportfocusnews.com/logo.svg"
      }
    },
    // Breaking news specific fields
    "articleSection": "Breaking News",
    "keywords": "breaking news, latest news, urgent, developing story",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-content"]
    },
    // Add urgency indicator
    "backstory": {
      "@type": "CreativeWork",
      "name": "Breaking News Alert",
      "text": "This is a developing story and will be updated as more information becomes available."
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Add meta tag for news_keywords */}
      <meta name="news_keywords" content="breaking, urgent, developing" />
    </>
  );
}