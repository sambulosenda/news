import { fetchGraphQL } from '@/lib/fetch-graphql';
import { SEARCH_POSTS } from '@/lib/queries/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import { WPPost } from '@/types/wordpress';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

async function searchPosts(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const data = await fetchGraphQL(SEARCH_POSTS, { 
    search: query,
    first: 30 
  });

  return data?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const posts = await searchPosts(query);

  return (
    <>
      <Header />
      
      <main className="container-wide py-8 min-h-screen">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Search Report Focus News
          </h1>
          <SearchBar initialQuery={query} />
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-4">
            <p className="text-gray-600">
              {posts.length > 0 
                ? `Found ${posts.length} result${posts.length === 1 ? '' : 's'} for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          </div>
        )}

        {/* Results Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-6">
            {posts.map((post: WPPost) => (
              <div key={post.id} className="pb-6 border-b border-gray-200">
                <ArticleCard
                  article={post}
                  variant="horizontal"
                  showImage={true}
                  showExcerpt={true}
                  showAuthor={true}
                  showCategory={true}
                />
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or browse our categories:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Politics', 'Business', 'Technology', 'World', 'Sports'].map((cat) => (
                <a
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Enter a search term to find articles
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export const metadata = {
  title: 'Search - Report Focus News',
  description: 'Search for news articles and stories on Report Focus News',
};