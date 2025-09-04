'use client';

import { navigationConfig } from '@/config/navigation';

export default function SiteNavigationSchema() {
  // Build comprehensive navigation schema from config
  const navigationItems = [];
  let position = 1;

  // Add all featured categories first (main navigation)
  navigationConfig
    .filter(item => item.featured)
    .sort((a, b) => a.priority - b.priority)
    .forEach(section => {
      navigationItems.push({
        '@type': 'SiteNavigationElement',
        name: section.name,
        url: `https://reportfocusnews.com/news/${section.slug}/`,
        position: position++,
        // Include subcategories if they exist
        ...(section.children && section.children.length > 0 && {
          hasPart: section.children.map((child, index) => ({
            '@type': 'SiteNavigationElement',
            name: child.name,
            url: `https://reportfocusnews.com/news/${child.slug}/`,
            position: index + 1,
          }))
        })
      });
    });

  // Add non-featured categories (secondary navigation)
  navigationConfig
    .filter(item => !item.featured)
    .sort((a, b) => a.priority - b.priority)
    .forEach(section => {
      navigationItems.push({
        '@type': 'SiteNavigationElement',
        name: section.name,
        url: `https://reportfocusnews.com/news/${section.slug}/`,
        position: position++,
      });
    });

  // Add static pages
  const staticPages = [
    { name: 'Home', url: 'https://reportfocusnews.com/', position: position++ },
    { name: 'Search', url: 'https://reportfocusnews.com/search', position: position++ },
    { name: 'All Categories', url: 'https://reportfocusnews.com/news/', position: position++ },
    { name: 'About Us', url: 'https://reportfocusnews.com/about', position: position++ },
    { name: 'Contact', url: 'https://reportfocusnews.com/contact', position: position++ },
    { name: 'Privacy Policy', url: 'https://reportfocusnews.com/privacy-policy', position: position++ },
    { name: 'Terms of Service', url: 'https://reportfocusnews.com/terms', position: position++ },
  ];

  navigationItems.push(...staticPages);

  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: 'https://reportfocusnews.com',
    hasPart: navigationItems,
  };

  // Also add WebSite schema with SearchAction for better sitelinks
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Report Focus News',
    url: 'https://reportfocusnews.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://reportfocusnews.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    // Add main entity navigation
    mainEntity: navigationItems.filter(item => 
      ['Africa', 'World', 'Politics', 'Business', 'Sports', 'Entertainment', 'Opinion'].includes(item.name)
    ).map(item => ({
      '@type': 'WebPage',
      '@id': item.url,
      name: item.name,
      url: item.url,
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}