import Script from 'next/script';

interface SearchResultsSchemaProps {
  query: string;
  resultsCount: number;
  results: Array<{
    title: string;
    url: string;
    description?: string;
    datePublished?: string;
    author?: string;
    image?: string;
  }>;
}

export default function SearchResultsSchema({ 
  query, 
  resultsCount, 
  results 
}: SearchResultsSchemaProps) {
  // SearchAction schema removed - already handled globally in layout.tsx via SearchActionSchema component

  // Create ItemList schema for search results
  const searchResultsSchema = results.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "mainEntity": {
      "@type": "ItemList",
      "name": `Search results for "${query}"`,
      "description": `Found ${resultsCount} news articles for "${query}" on Report Focus News`,
      "numberOfItems": resultsCount,
    "itemListElement": results.map((result, index) => {
        const article: Record<string, unknown> = {
          "@type": "NewsArticle",
          "headline": result.title,
          "url": result.url,
          "publisher": {
            "@type": "Organization",
            "name": "Report Focus News",
            "logo": {
              "@type": "ImageObject",
              "url": "https://reportfocusnews.com/logo.png"
            }
          }
        };

        // Conditionally add properties only if they exist
        if (result.description) {
          article.description = result.description;
        }
        if (result.datePublished) {
          article.datePublished = result.datePublished;
        }
        if (result.image) {
          article.image = result.image;
        }
        if (result.author) {
          article.author = {
            "@type": "Person",
            "name": result.author
          };
        }

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": article
        };
      }).filter(item => item.item), // Filter out any null/undefined entries
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://reportfocusnews.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Search",
          "item": "https://reportfocusnews.com/search"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Results for "${query}"`,
          "item": `https://reportfocusnews.com/search?q=${encodeURIComponent(query)}`
        }
      ]
    }
  } : null;

  // FAQPage schema for common search queries
  const faqSchema = query ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What news articles are available about ${query}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Report Focus News has ${resultsCount} articles about ${query}, covering the latest news and updates from South Africa, Zimbabwe, and beyond.`
        }
      },
      {
        "@type": "Question",
        "name": `How recent are the ${query} news articles?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${query} articles are updated regularly with the latest breaking news and developments. Use our search filters to find the most recent coverage.`
        }
      }
    ]
  } : null;

  return (
    <>
      {searchResultsSchema && (
        <Script
          id="search-results-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchResultsSchema)
          }}
        />
      )}
      {faqSchema && (
        <Script
          id="search-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}
    </>
  );
}