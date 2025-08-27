import { WPPost } from '@/types/wordpress';
import { getImageUrl } from '@/lib/utils/image-url-helper';

interface NewsArticleSchemaProps {
  article: WPPost;
  url: string;
}

export default function NewsArticleSchema({ article, url }: NewsArticleSchemaProps) {
  const publishDate = new Date(article.date).toISOString();
  const modifiedDate = article.modified ? new Date(article.modified).toISOString() : publishDate;
  
  // Use Yoast meta description if available, otherwise excerpt
  const description = article.seo?.metaDesc ||
    (article.excerpt
      ? article.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
      : article.title);

  // Helper to get SEO-friendly image URLs for structured data
  // Force minimum 1200px width for Google Discover
  const getSeoImageUrl = (url: string | undefined) => {
    return getImageUrl(url, { 
      context: 'seo'
    });
  };
  
  // Use Yoast OpenGraph image if available, otherwise featured image
  // Ensure minimum 1200px width for Google Discover
  const imageUrl = article.seo?.opengraphImage?.sourceUrl || article.featuredImage?.node?.sourceUrl;
  
  // Only include image if we have a real article image
  // Don't use fallback images that Google might index incorrectly
  const images = imageUrl ? [
    {
      "@type": "ImageObject",
      "url": getSeoImageUrl(imageUrl),
      "width": article.featuredImage?.node?.mediaDetails?.width || 1200,
      "height": article.featuredImage?.node?.mediaDetails?.height || 630,
      "caption": article.featuredImage?.node?.caption || article.featuredImage?.node?.altText || article.title
    }
  ] : undefined;

  // Build keywords from Yoast focus keywords and tags
  const focusKeyword = article.seo?.focuskw || '';
  const metaKeywords = article.seo?.metaKeywords ? article.seo.metaKeywords.split(',').map((k: string) => k.trim()) : [];
  const yoastKeywords = [focusKeyword, ...metaKeywords].filter(Boolean);
  
  const allKeywords = [
    ...yoastKeywords,
    ...(article.tags?.edges?.map(tag => tag.node.name) || [])
  ].filter(Boolean);

  // Calculate word count for schema
  const wordCount = article.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.seo?.title || article.title,
    "description": description,
    ...(images && { "image": images }),
    ...(imageUrl && { "thumbnailUrl": getSeoImageUrl(imageUrl) }),
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": article.author?.node?.name || "Report Focus News Staff",
      "url": `https://reportfocusnews.com/author/${article.author?.node?.slug || article.author?.node?.name?.toLowerCase().replace(/\s+/g, '-') || 'staff'}/`
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Report Focus News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reportfocusnews.com/logo.svg",
        "width": 600,
        "height": 60
      },
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ZA"
      },
      "sameAs": [
        "https://twitter.com/reportfocusnews",
        "https://facebook.com/reportfocusnews",
        "https://instagram.com/reportfocusnews"
      ]
    },
    "articleSection": article.categories?.edges?.[0]?.node?.name || "News",
    "keywords": allKeywords.join(', '),
    "url": article.seo?.canonical || url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.seo?.canonical || url
    },
    // Critical for Google Discover and paywall detection
    "isAccessibleForFree": true,
    "hasPart": {
      "@type": "WebPageElement",
      "isAccessibleForFree": true,
      "cssSelector": ".article-content"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-content"]
    },
    // News-specific fields
    "dateline": `${article.categories?.edges?.[0]?.node?.name || "SOUTH AFRICA"}, ${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
    "articleBody": article.content?.replace(/<[^>]*>/g, '').substring(0, 1000) || "",
    "wordCount": wordCount,
    // Geographic relevance
    "spatialCoverage": [
      {
        "@type": "Place",
        "name": "South Africa",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -30.5595,
          "longitude": 22.9375
        }
      },
      {
        "@type": "Place",
        "name": "Zimbabwe",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -19.0154,
          "longitude": 29.1549
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}