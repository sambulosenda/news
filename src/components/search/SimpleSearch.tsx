'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Search, Loader2, Calendar, User, Clock, AlertCircle } from 'lucide-react';
import { WPPost } from '@/types/wordpress';

interface SimpleSearchProps {
  initialQuery?: string;
  searchResults?: WPPost[];
  isLoading?: boolean;
}

export default function SimpleSearch({ 
  initialQuery = '', 
  searchResults = [],
  isLoading = false 
}: SimpleSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [localLoading, setLocalLoading] = useState(false);

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  // Format article URL
  const getArticleUrl = (post: WPPost) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `/${year}/${month}/${day}/${post.slug}`;
  };

  // Highlight search terms in text
  const highlightSearchTerms = (text: string, searchQuery: string) => {
    if (!searchQuery || !text) return text;
    
    const terms = searchQuery.split(' ').filter(term => term.length > 2);
    let highlightedText = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    });
    
    return highlightedText;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocalLoading(true);
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const loading = isLoading || localLoading;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news, topics, or keywords..."
            className="w-full pl-12 pr-24 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {loading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <Search className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Results Count */}
      {initialQuery && !loading && (
        <div className="mb-6 text-gray-600">
          {searchResults.length > 0 ? (
            <p className="text-lg">
              Found <span className="font-semibold text-gray-900">{searchResults.length}</span> results 
              for "<span className="font-semibold text-gray-900">{initialQuery}</span>"
            </p>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                <div>
                  <p className="font-semibold text-yellow-800">No results found</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Try different keywords or browse our categories below
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
          <p className="text-gray-600">Searching articles...</p>
        </div>
      )}

      {/* Search Results */}
      {!loading && searchResults.length > 0 && (
        <div className="space-y-6">
          {searchResults.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <Link href={getArticleUrl(post)} className="group">
                <div className="flex gap-6">
                  {/* Article Image */}
                  {post.featuredImage?.node?.sourceUrl && (
                    <div className="flex-shrink-0 w-48 h-32 relative overflow-hidden rounded-lg">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Article Content */}
                  <div className="flex-1">
                    <h2 
                      className="text-xl font-bold text-gray-900 group-hover:text-primary mb-2 line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightSearchTerms(post.title, initialQuery) 
                      }}
                    />
                    
                    {post.excerpt && (
                      <p 
                        className="text-gray-600 line-clamp-2 mb-3"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightSearchTerms(
                            post.excerpt.replace(/<[^>]*>/g, ''), 
                            initialQuery
                          ) 
                        }}
                      />
                    )}
                    
                    {/* Article Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>
                          {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                        </time>
                      </div>
                      
                      {post.author?.node?.name && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author.node.name}</span>
                        </div>
                      )}
                      
                      {post.content && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{calculateReadingTime(post.content)} min read</span>
                        </div>
                      )}
                      
                      {/* Categories */}
                      {post.categories?.edges && post.categories.edges.length > 0 && (
                        <div className="flex gap-2">
                          {post.categories.edges.slice(0, 2).map((cat) => (
                            <span
                              key={cat.node.id}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {cat.node.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* No Results - Suggest Categories */}
      {!loading && initialQuery && searchResults.length === 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Politics', 'Business', 'Sports', 'World', 'Africa', 'Entertainment', 'Opinion', 'Technology'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="px-4 py-3 text-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Helper Text */}
      {!initialQuery && !loading && (
        <div className="text-center py-8 text-gray-600">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Search Report Focus News
          </h2>
          <p className="mb-6">
            Find the latest news from South Africa, Zimbabwe, and around the world. 
            Search for breaking news, politics, business, sports, and more.
          </p>
          
          {/* Popular Search Suggestions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Load Shedding', 'South Africa Politics', 'Zimbabwe Economy', 'Cricket', 'Crime', 'Weather'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    window.location.href = `/search?q=${encodeURIComponent(term)}`;
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}