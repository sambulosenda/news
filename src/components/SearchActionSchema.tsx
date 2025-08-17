export default function SearchActionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://reportfocusnews.com',
    name: 'Report Focus News',
    description: 'Independent news coverage of South Africa and Zimbabwe',
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Report Focus News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://reportfocusnews.com/logo.png',
        width: 800,
        height: 200,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://reportfocusnews.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    // Additional SEO properties
    sameAs: [
      'https://twitter.com/ReportFocus',
      'https://facebook.com/ReportFocusNews',
      'https://linkedin.com/company/report-focus-news',
    ],
    inLanguage: 'en-ZA',
    // Speakable specification for voice search
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.headline', '.summary'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}