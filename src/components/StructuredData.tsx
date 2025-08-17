interface ArticleStructuredDataProps {
  title: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  url,
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
      '@type': 'Organization',
      name: 'Report Focus News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.reportfocusnews.com/logo.png',
      },
    },
    image: imageUrl ? [imageUrl] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
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