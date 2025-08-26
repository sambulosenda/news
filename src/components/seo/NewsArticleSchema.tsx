import { WPPost } from '@/types/wordpress';
import { getImageUrl } from '@/lib/utils/image-url-helper';

interface NewsArticleSchemaProps {
  article: WPPost;
  url: string;
}

export default function NewsArticleSchema({ article, url }: NewsArticleSchemaProps) {
  const publishDate = new Date(article.date).toISOString();
  const modifiedDate = article.modified ? new Date(article.modified).toISOString() : publishDate;
  
  // Extract plain text from excerpt for description
  const description = article.excerpt
    ? article.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
    : article.title;

  // Helper to get SEO-friendly image URLs for structured data
  const getSeoImageUrl = (url: string | undefined) => {
    return getImageUrl(url, { context: 'seo' });
  };
  
  const images = article.featuredImage?.node ? [
    {
      "@type": "ImageObject",
      "url": getSeoImageUrl(article.featuredImage.node.sourceUrl),
      "width": article.featuredImage.node.mediaDetails?.width || 1200,
      "height": article.featuredImage.node.mediaDetails?.height || 630,
      "caption": article.featuredImage.node.caption || article.featuredImage.node.altText || article.title
    }
  ] : [
    {
      "@type": "ImageObject",
      "url": "https://reportfocusnews.com/og-image.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Report Focus News"
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": description,
    "image": images,
    "thumbnailUrl": getSeoImageUrl(article.featuredImage?.node?.sourceUrl),
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": article.author?.node?.name || "Report Focus News Staff",
      "url": `https://reportfocusnews.com/author/${article.author?.node?.name?.toLowerCase().replace(/\s+/g, '-') || 'staff'}/`
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
    "keywords": article.tags?.edges?.map(tag => tag.node.name).join(', ') || "",
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "isAccessibleForFree": true,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-content"]
    },
    // News-specific fields
    "dateline": `${article.categories?.edges?.[0]?.node?.name || "SOUTH AFRICA"}, ${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
    "articleBody": article.content?.replace(/<[^>]*>/g, '').substring(0, 1000) || "",
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