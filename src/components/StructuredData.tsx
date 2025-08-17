interface ArticleStructuredDataProps {
  title: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  url: string;
  categoryName?: string;
  wordCount?: number;
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  url,
  categoryName,
  wordCount,
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: authorName ? {
      '@type': 'Person',
      name: authorName,
    } : undefined,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Report Focus News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.reportfocusnews.com/logo.png',
        width: 600,
        height: 60,
      },
    },
    image: imageUrl ? [imageUrl] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(categoryName && { articleSection: categoryName }),
    ...(wordCount && { wordCount: wordCount }),
    ...(imageUrl && { thumbnailUrl: imageUrl }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.prose p'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Report Focus News',
    url: 'https://www.reportfocusnews.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.reportfocusnews.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Report Focus News',
    url: 'https://www.reportfocusnews.com',
    logo: 'https://www.reportfocusnews.com/logo.png',
    sameAs: [
      'https://twitter.com/reportfocusnews',
      'https://facebook.com/reportfocusnews',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@reportfocusnews.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}