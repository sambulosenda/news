// Pre-build the most important category pages at build time
export async function generateStaticParams() {
  // Pre-render these critical category pages
  return [
    { category: 'politics' },
    { category: 'business' },
    { category: 'sports' },
    { category: 'south-africa' },
    { category: 'zimbabwe' },
    { category: 'breaking-news' },
    { category: 'africa' },
    { category: 'world' },
    { category: 'opinion' },
    { category: 'entertainment' },
  ];
}