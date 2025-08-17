interface NewsArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  keywords?: string[];
}

export default function NewsArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  publisherName = 'Report Focus News',
  publisherLogo = 'https://reportfocusnews.com/logo.png',
  keywords = [],
}: NewsArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: authorName ? {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    image: imageUrl ? {
      '@type': 'ImageObject',
      url: imageUrl,
    } : undefined,
    keywords: keywords.join(', '),
    articleSection: keywords[0] || 'News',
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}