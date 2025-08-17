'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { WPPost } from '@/types/wordpress';
import { format } from 'date-fns';

const SEARCH_WITH_FILTERS = gql`
  query SearchWithFilters(
    $search: String!
    $first: Int = 20
    $after: String
    $categoryIn: [ID]
  ) {
    posts(
      first: $first
      after: $after
      where: {
        search: $search
        categoryIn: $categoryIn
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      }
    }
    categories(first: 20) {
      edges {
        node {
          id
          name
          slug
          count
        }
      }
    }
  }
`;

interface SearchResultsProps {
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
  };
}

export default function SearchResults({ searchParams }: SearchResultsProps) {
  const query = searchParams.q || '';
  const categoryFilter = searchParams.category;
  const currentPage = parseInt(searchParams.page || '1');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [sortBy, setSortBy] = useState<'relevance' | 'date'>('relevance');

  const { data, loading, error, fetchMore } = useQuery(SEARCH_WITH_FILTERS, {
    variables: {
      search: query,
      first: 20,
      categoryIn: selectedCategory ? [selectedCategory] : undefined,
    },
    skip: !query || query.length < 2,
  });

  const posts = data?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [];
  const categories = data?.categories?.edges?.map((e: { node: any }) => e.node) || [];
  const hasNextPage = data?.posts?.pageInfo?.hasNextPage;
  const endCursor = data?.posts?.pageInfo?.endCursor;

  // Track search for analytics
  useEffect(() => {
    if (query && typeof window !== 'undefined') {
      // Track search query for analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'search', {
          search_term: query,
          category: selectedCategory || 'all',
        });
      }
    }
  }, [query, selectedCategory]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after: endCursor,
        },
      });
    }
  };

  // Related searches for SEO
  const relatedSearches = [
    'load shedding schedule',
    'elections 2024',
    'crime statistics',
    'economic news',
    'political updates',
  ].filter(term => term !== query.toLowerCase());

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-6">
          Search Report Focus News
        </h1>
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 mb-6">
            Search for breaking news, politics, business, and more from South Africa and Zimbabwe.
          </p>
          
          {/* Popular Topics */}
          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-4">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Load Shedding', 'Elections', 'Crime', 'Economy', 'Politics', 'Sports'].map((topic) => (
                <Link
                  key={topic}
                  href={`/search?q=${encodeURIComponent(topic.toLowerCase())}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-600">Searching for "{query}"...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">An error occurred while searching. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
          Search Results{query && ` for "${query}"`}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-gray-600">
            {posts.length > 0 
              ? `Found ${posts.length} result${posts.length === 1 ? '' : 's'}`
              : 'No results found'
            }
          </p>
          
          {/* Filters */}
          {posts.length > 0 && (
            <div className="flex gap-4">
              {/* Category Filter */}
              {categories.length > 0 && (
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || undefined)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              )}
              
              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date')}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                aria-label="Sort results"
              >
                <option value="relevance">Most Relevant</option>
                <option value="date">Most Recent</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {posts.length > 0 ? (
        <>
          <div className="space-y-6">
            {posts.map((post: WPPost) => {
              const postDate = new Date(post.date);
              const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${post.slug}/`;
              
              return (
                <article key={post.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                  {/* Highlight search terms in results */}
                  <ArticleCard
                    article={post}
                    variant="horizontal"
                    showImage={true}
                    showExcerpt={true}
                    showAuthor={true}
                    showCategory={true}
                  />
                  
                  {/* Search result URL for SEO */}
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      reportfocusnews.com{postUrl}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More */}
          {hasNextPage && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
              >
                Load More Results
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-700 mb-4">
            No results found for "{query}"
          </p>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse our categories
          </p>
          
          {/* Suggested Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {['Politics', 'Business', 'Technology', 'World', 'Sports', 'Crime'].map((cat) => (
              <Link
                key={cat}
                href={`/news/${cat.toLowerCase()}/`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-red-600 hover:text-red-600 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Searches for SEO */}
      {posts.length > 0 && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="font-semibold text-lg mb-4">Related Searches</h2>
          <div className="flex flex-wrap gap-2">
            {relatedSearches.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:border-red-600 hover:text-red-600 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Trending Topics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/faq/load-shedding" className="flex items-center gap-3 p-3 bg-white rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold">Load Shedding Schedule</p>
              <p className="text-sm text-gray-600">Latest updates and stages</p>
            </div>
          </Link>
          <Link href="/faq/elections" className="flex items-center gap-3 p-3 bg-white rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">🗳️</span>
            <div>
              <p className="font-semibold">Elections 2024</p>
              <p className="text-sm text-gray-600">Voter registration and dates</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}