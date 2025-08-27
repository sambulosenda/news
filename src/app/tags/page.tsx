import { Metadata } from 'next';
import Link from 'next/link';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_ALL_TAGS } from '@/lib/queries/tags';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'All Tags - Browse Topics',
  description: 'Browse all news tags and topics on Report Focus News. Find articles organized by subject matter covering South Africa and Zimbabwe.',
  keywords: 'news tags, news topics, browse articles, South Africa news tags, Zimbabwe news tags, news categories',
  openGraph: {
    title: 'Browse All News Tags & Topics',
    description: 'Explore all news topics and tags on Report Focus News. Find articles organized by subject.',
    type: 'website',
    url: 'https://reportfocusnews.com/tags/',
    siteName: 'Report Focus News'
  },
  alternates: {
    canonical: 'https://reportfocusnews.com/tags/'
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large'
  }
};

// Revalidate every 30 minutes
export const revalidate = 1800;

// Tag size calculation for tag cloud effect
function getTagSizeClass(count: number, maxCount: number): string {
  const ratio = count / maxCount;
  if (ratio > 0.8) return 'text-3xl font-bold';
  if (ratio > 0.6) return 'text-2xl font-semibold';
  if (ratio > 0.4) return 'text-xl font-medium';
  if (ratio > 0.2) return 'text-lg';
  return 'text-base';
}

// Color classes for variety
function getTagColorClass(index: number): string {
  const colors = [
    'text-red-600 hover:text-red-700',
    'text-blue-600 hover:text-blue-700',
    'text-green-600 hover:text-green-700',
    'text-purple-600 hover:text-purple-700',
    'text-orange-600 hover:text-orange-700',
    'text-indigo-600 hover:text-indigo-700',
    'text-pink-600 hover:text-pink-700',
    'text-gray-700 hover:text-gray-900'
  ];
  return colors[index % colors.length];
}

export default async function TagsPage() {
  // Fetch all tags
  const tagsData = await fetchGraphQLCached(
    GET_ALL_TAGS,
    { first: 200 },
    { ttl: 1800 } // 30 minutes cache
  );

  const tags = tagsData?.tags?.edges || [];
  const maxCount = Math.max(...tags.map((edge: any) => edge.node.count || 0));

  // Group tags alphabetically
  const groupedTags = tags.reduce((acc: any, edge: any) => {
    const tag = edge.node;
    const firstLetter = tag.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedTags).sort();

  return (
    <>
      <HeaderWrapper />
      
      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container-wide py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Browse All Tags
              </h1>
              <p className="text-xl text-gray-600">
                Explore news and articles organized by topic
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {tags.length} tags
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-1a1 1 0 100-2h1a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4V7a4 4 0 014-4z" clipRule="evenodd" />
                  </svg>
                  {tags.reduce((sum: number, edge: any) => sum + (edge.node.count || 0), 0)} articles
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tag Cloud Section */}
        <section className="container-wide py-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Popular Tags
            </h2>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {tags.slice(0, 30).map((edge: any, index: number) => {
                const tag = edge.node;
                return (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}/`}
                    className={`inline-block transition-all duration-200 hover:scale-110 ${getTagSizeClass(tag.count, maxCount)} ${getTagColorClass(index)}`}
                    title={`${tag.count} articles`}
                  >
                    {tag.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Alphabetical List */}
        <section className="container-wide pb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              All Tags A-Z
            </h2>
            
            {/* Quick Jump Links */}
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
              {sortedLetters.map(letter => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>

            {/* Tags by Letter */}
            <div className="space-y-8">
              {sortedLetters.map(letter => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {groupedTags[letter].map((tag: any) => (
                      <Link
                        key={tag.id}
                        href={`/tag/${tag.slug}/`}
                        className="group flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                          {tag.name}
                        </span>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                          {tag.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}