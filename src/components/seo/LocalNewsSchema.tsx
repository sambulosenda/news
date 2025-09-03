interface LocalNewsSchemaProps {
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
  category?: string;
  location?: {
    country: 'South Africa' | 'Zimbabwe';
    city?: string;
    region?: string;
  };
  contentTier?: 'free' | 'premium';
}

export default function LocalNewsSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  publisherName = 'Report Focus News',
  publisherLogo = 'https://reportfocusnews.com/logo.svg',
  keywords = [],
  category = 'News',
  location,
  contentTier = 'free',
}: LocalNewsSchemaProps) {
  // Enhanced schema for regional news
  const newsSchema = {
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
      '@type': 'NewsMediaOrganization',
      name: publisherName,
      url: 'https://reportfocusnews.com',
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
        width: 800,
        height: 200,
      },
      // Critical for Google News
      foundingDate: '2018-09-27',
      diversityPolicy: 'https://reportfocusnews.com/diversity-policy',
      ethicsPolicy: 'https://reportfocusnews.com/ethics-policy',
      masthead: 'https://reportfocusnews.com/masthead',
      missionCoveragePrioritiesPolicy: 'https://reportfocusnews.com/coverage-policy',
      // Geographic coverage
      areaServed: [
        {
          '@type': 'Country',
          name: 'South Africa',
          alternateName: 'ZA',
        },
        {
          '@type': 'Country',
          name: 'Zimbabwe',
          alternateName: 'ZW',
        }
      ],
    },
    image: imageUrl ? {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    } : undefined,
    keywords: keywords.join(', '),
    articleSection: category,
    inLanguage: 'en-ZA',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    // Location-specific data
    ...(location && {
      contentLocation: {
        '@type': 'Place',
        name: location.city || location.country,
        containedInPlace: {
          '@type': 'Country',
          name: location.country,
        },
        ...(location.region && {
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: location.region,
            containedInPlace: {
              '@type': 'Country',
              name: location.country,
            },
          },
        }),
      },
      about: {
        '@type': 'Place',
        name: location.country,
        sameAs: location.country === 'South Africa' 
          ? 'https://en.wikipedia.org/wiki/South_Africa'
          : 'https://en.wikipedia.org/wiki/Zimbabwe',
      },
    }),
    // Content accessibility
    isAccessibleForFree: contentTier === 'free',
    ...(contentTier === 'premium' && {
      hasPart: {
        '@type': 'WebPageElement',
        isAccessibleForFree: false,
        cssSelector: '.paywall-content',
      },
    }),
  };

  // Additional local business schema for news organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: publisherName,
    url: 'https://reportfocusnews.com',
    logo: publisherLogo,
    sameAs: [
      'https://twitter.com/reportfocusnews',
      'https://facebook.com/reportfocusnews',
      'https://linkedin.com/company/reportfocusnews',
    ],
    foundingDate: '2018-09-27',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
      addressRegion: 'Gauteng',
      addressLocality: 'Johannesburg',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'South Africa',
      },
      {
        '@type': 'Country',
        name: 'Zimbabwe',
      },
    ],
    knowsAbout: [
      'South African Politics',
      'Zimbabwe Politics',
      'Southern African Business',
      'Regional Economics',
      'African News',
    ],
    publishingPrinciples: 'https://reportfocusnews.com/publishing-principles',
    diversityPolicy: 'https://reportfocusnews.com/diversity-policy',
    ethicsPolicy: 'https://reportfocusnews.com/ethics-policy',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}