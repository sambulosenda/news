'use client';

export default function SiteNavigationSchema() {
  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: 'https://reportfocusnews.com',
    hasPart: [
      {
        '@type': 'SiteNavigationElement',
        name: 'Africa',
        url: 'https://reportfocusnews.com/news/africa/',
        position: 1,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'World',
        url: 'https://reportfocusnews.com/news/world/',
        position: 2,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Politics',
        url: 'https://reportfocusnews.com/news/politics/',
        position: 3,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Business',
        url: 'https://reportfocusnews.com/news/business/',
        position: 4,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Sports',
        url: 'https://reportfocusnews.com/news/sports/',
        position: 5,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Opinion',
        url: 'https://reportfocusnews.com/news/opinion/',
        position: 6,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'About Us',
        url: 'https://reportfocusnews.com/about',
        position: 7,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Contact',
        url: 'https://reportfocusnews.com/contact',
        position: 8,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Search',
        url: 'https://reportfocusnews.com/search',
        position: 9,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
    />
  );
}