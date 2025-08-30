import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { SEARCH_POSTS } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import SimpleSearch from '@/components/search/SimpleSearch';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import SearchResultsSchema from '@/components/seo/SearchResultsSchema';
import { WPPost } from '@/types/wordpress';
import { Metadata } from 'next';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

async function searchPosts(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const data = await fetchGraphQL(SEARCH_POSTS, { 
      search: query,
      first: 50  // Get up to 50 results
    }, {}, controller.signal);

    clearTimeout(timeoutId);
    return data?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [];
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Search request timed out');
      return [];
    }
    
    console.error('Search error:', error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const _currentPage = params.page || '1'; // Prefix with _ to indicate intentionally unused
  const posts = await searchPosts(query);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://reportfocusnews.com' },
    { name: 'Search', url: 'https://reportfocusnews.com/search' },
    ...(query ? [{ name: `Results for "${query}"`, url: `https://reportfocusnews.com/search?q=${encodeURIComponent(query)}` }] : [])
  ];

  // Prepare structured data for search results
  const searchResultsData = posts.map((post: WPPost) => {
    const date = new Date(post.date);
    const url = `https://reportfocusnews.com/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${post.slug}`;
    
    return {
      title: post.title,
      url: url,
      description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160),
      datePublished: post.date,
      author: post.author?.node?.name,
      image: post.featuredImage?.node?.sourceUrl
    };
  });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <SearchResultsSchema 
        query={query}
        resultsCount={posts.length}
        results={searchResultsData}
      />
      <HeaderWrapper />
      
      <main className="bg-gray-50 min-h-screen">
        <div className="container-wide py-8">
          {/* SEO-optimized headings */}
          {query ? (
            <>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600 mb-6">
                {posts.length > 0 
                  ? `Found ${posts.length} news articles about ${query} from South Africa, Zimbabwe and worldwide`
                  : `No articles found for "${query}". Try different keywords or browse our categories.`
                }
              </p>
            </>
          ) : (
            <>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Search Report Focus News
              </h1>
              <p className="text-gray-600 mb-6">
                Find the latest breaking news, politics, business, sports and entertainment from South Africa and Zimbabwe
              </p>
            </>
          )}
          
          <SimpleSearch 
            initialQuery={query} 
            searchResults={posts}
            isLoading={false}
          />
          
          {/* SEO Content Block */}
          {!query && (
            <div className="mt-12 prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold mb-4">Search South African and Zimbabwe News</h2>
              <p className="text-gray-700 mb-4">
                Report Focus News provides comprehensive coverage of breaking news and current events across Southern Africa. 
                Our search feature helps you find specific topics, people, and events from our extensive news archive.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Popular Search Topics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  'Load Shedding Updates',
                  'South Africa Politics', 
                  'Zimbabwe Economy',
                  'Crime News',
                  'Sports Results',
                  'Weather Forecast',
                  'Business News',
                  'Entertainment',
                  'Breaking News'
                ].map((topic) => (
                  <Link
                    key={topic}
                    href={`/search?q=${encodeURIComponent(topic)}`}
                    className="text-primary hover:underline"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">How to Use Our Search</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Enter keywords related to the news you're looking for</li>
                <li>Use specific terms like names, places, or events for better results</li>
                <li>Search for topics like "elections", "economy", or "cricket" for category-specific news</li>
                <li>Add location names like "Johannesburg" or "Harare" for local news</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

// Generate dynamic metadata based on search query
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';
  
  if (query) {
    return {
      title: `${query} - Search Results`,
      description: `Find news about ${query} from South Africa and Zimbabwe. Latest updates, breaking news, and in-depth coverage on Report Focus News.`,
      openGraph: {
        title: `${query} - Search Results | Report Focus News`,
        description: `Find news about ${query} from South Africa and Zimbabwe. Latest updates and breaking news.`,
        type: 'website',
        url: `https://reportfocusnews.com/search?q=${encodeURIComponent(query)}`,
      },
      twitter: {
        card: 'summary',
        title: `${query} - Search Results | Report Focus News`,
        description: `Find news about ${query} from South Africa and Zimbabwe.`,
      },
      robots: {
        index: false,  // Don't index search result pages
        follow: true,  // But do follow links to articles
        noarchive: true,
        nosnippet: false,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
      alternates: {
        canonical: `https://reportfocusnews.com/search?q=${encodeURIComponent(query)}`,
      },
      other: {
        'X-Robots-Tag': 'noindex, follow, noarchive',
      },
    };
  }
  
  return {
    title: 'Search',
    description: 'Search Report Focus News for breaking news from South Africa, Zimbabwe, politics, business, sports, entertainment and more.',
    keywords: 'search news, South Africa news search, Zimbabwe news search, breaking news search, politics, business, sports, entertainment',
    openGraph: {
      title: 'Search | Report Focus News',
      description: 'Search for news articles and stories from South Africa and Zimbabwe',
      type: 'website',
      url: 'https://reportfocusnews.com/search',
    },
    twitter: {
      card: 'summary',
      title: 'Search | Report Focus News',
      description: 'Search for news from South Africa and Zimbabwe',
    },
    robots: {
      index: true,  // Index the main search page only
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: 'https://reportfocusnews.com/search',
    },
  };
}