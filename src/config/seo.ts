// SEO configuration and defaults
export const seoConfig = {
  // Default meta tags
  defaultTitle: 'Report Focus News - Breaking News & Analysis',
  titleTemplate: '%s | Report Focus News',
  defaultDescription: 'Get the latest breaking news, in-depth analysis, and comprehensive coverage of politics, business, technology, and more from Report Focus News.',
  
  // Default Open Graph tags
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.reportfocusnews.com',
    siteName: 'Report Focus News',
    images: [
      {
        url: 'https://www.reportfocusnews.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Report Focus News',
      },
    ],
  },
  
  // Twitter card configuration
  twitter: {
    handle: '@reportfocusnews',
    site: '@reportfocusnews',
    cardType: 'summary_large_image',
  },
  
  // Structured data defaults
  structuredData: {
    organization: {
      '@type': 'NewsMediaOrganization',
      name: 'Report Focus News',
      alternateName: ['Report Focus', 'RF News', 'ReportFocusNews'],
      url: 'https://www.reportfocusnews.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.reportfocusnews.com/logo.png',
        width: 600,
        height: 60,
      },
      sameAs: [
        'https://twitter.com/reportfocusnews',
        'https://facebook.com/reportfocusnews',
        'https://instagram.com/reportfocusnews',
        'https://linkedin.com/company/reportfocusnews',
      ],
    },
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Additional meta tags
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'Report Focus News',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
} as const;