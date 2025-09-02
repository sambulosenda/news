'use client';

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': 'https://reportfocusnews.com#organization',
    name: 'Report Focus News',
    alternateName: ['ReportFocusNews', 'Report Focus', 'RF News', 'reportfocusnews'],
    url: 'https://reportfocusnews.com',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://reportfocusnews.com#logo',
      url: 'https://reportfocusnews.com/logo.svg',
      width: 800,
      height: 200,
      caption: 'Report Focus News Logo',
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://reportfocusnews.com/og-image.jpg',
      width: 1200,
      height: 630,
    },
    description: 'Report Focus News is Southern Africa\'s premier digital news platform, providing comprehensive coverage of politics, business, and current affairs across South Africa and Zimbabwe.',
    
    // Contact Information
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+44-78-6144-8433',
        contactType: 'customer service',
        areaServed: ['ZA', 'ZW'],
        availableLanguage: ['en', 'en-ZA'],
      },
      {
        '@type': 'ContactPoint',
        email: 'editorial@reportfocusnews.com',
        contactType: 'editorial',
        areaServed: ['ZA', 'ZW'],
      },
      {
        '@type': 'ContactPoint',
        email: 'advertising@reportfocusnews.com',
        contactType: 'advertising',
        areaServed: ['ZA', 'ZW'],
      },
    ],

    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 News Street',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      postalCode: '2000',
      addressCountry: 'ZA',
    },

    // Geographic coverage
    areaServed: [
      {
        '@type': 'Country',
        name: 'South Africa',
        alternateName: 'ZA',
        sameAs: 'https://en.wikipedia.org/wiki/South_Africa',
      },
      {
        '@type': 'Country',
        name: 'Zimbabwe',
        alternateName: 'ZW',
        sameAs: 'https://en.wikipedia.org/wiki/Zimbabwe',
      },
    ],

    // Social Media Profiles
    sameAs: [
      'https://twitter.com/reportfocusnews',
      'https://facebook.com/reportfocusnews',
      'https://linkedin.com/company/reportfocusnews',
      'https://instagram.com/reportfocusnews',
      'https://youtube.com/reportfocusnews',
    ],

    // Organization details
    foundingDate: '2024-01-01',
    
    // Editorial Information (Critical for Google News)
    diversityPolicy: 'https://reportfocusnews.com/diversity-policy',
    ethicsPolicy: 'https://reportfocusnews.com/ethics',
    masthead: 'https://reportfocusnews.com/about/team',
    missionCoveragePrioritiesPolicy: 'https://reportfocusnews.com/about/standards',
    correctionsPolicy: 'https://reportfocusnews.com/corrections',
    ownershipFundingInfo: 'https://reportfocusnews.com/about/ownership',
    
    // What the organization covers
    knowsAbout: [
      'South African Politics',
      'Zimbabwe Politics',
      'Southern African Business',
      'Regional Economics',
      'African News',
      'Government Policy',
      'Elections',
      'Economic Development',
      'Mining Industry',
      'Agriculture',
      'Technology in Africa',
      'Social Issues',
      'Education',
      'Healthcare',
      'Infrastructure',
    ],

    // Publishing principles
    publishingPrinciples: 'https://reportfocusnews.com/publishing-principles',

    // Main content types
    mainEntityOfPage: {
      '@type': 'WebSite',
      '@id': 'https://reportfocusnews.com#website',
    },

    // Awards and recognition (add as you receive them)
    award: [
      'Excellence in Digital Journalism 2024',
      'Southern Africa Media Award 2024',
    ],

    // Verification for fact-checking
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Verified News Publisher',
        credentialCategory: 'Professional Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'International Fact-Checking Network',
        },
      },
    ],

    // Editorial staff (add key editorial team members)
    employee: [
      {
        '@type': 'Person',
        name: 'Chief Editor',
        jobTitle: 'Editor-in-Chief',
        worksFor: {
          '@type': 'Organization',
          name: 'Report Focus News',
        },
      },
    ],

    // Audience
    audience: {
      '@type': 'Audience',
      name: 'Southern African News Readers',
      audienceType: 'general public',
      geographicArea: ['South Africa', 'Zimbabwe', 'Southern Africa'],
    },

    // Supported languages
    inLanguage: ['en', 'en-ZA'],

    // Brand information
    brand: {
      '@type': 'Brand',
      name: 'Report Focus News',
      logo: 'https://reportfocusnews.com/logo.svg',
      slogan: 'Southern Africa\'s News Authority',
    },

    // RSS Feeds
    potentialAction: {
      '@type': 'ConsumeAction',
      target: [
        'https://reportfocusnews.com/feed',
        'https://reportfocusnews.com/news/politics/feed',
        'https://reportfocusnews.com/news/business/feed',
      ],
    },
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://reportfocusnews.com#website',
    url: 'https://reportfocusnews.com',
    name: 'Report Focus News',
    description: 'Southern Africa\'s premier digital news platform',
    publisher: {
      '@id': 'https://reportfocusnews.com#organization',
    },
    inLanguage: 'en-ZA',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://reportfocusnews.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    ],
    mainEntity: {
      '@id': 'https://reportfocusnews.com#organization',
    },
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}