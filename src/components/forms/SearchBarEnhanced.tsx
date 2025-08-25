'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { debounce } from 'lodash';

const INSTANT_SEARCH = gql`
  query InstantSearch($search: String!) {
    posts(first: 5, where: { search: $search, orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          date
          excerpt
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  categories: {
    edges: Array<{
      node: {
        name: string;
        slug: string;
      };
    }>;
  };
}

export default function SearchBarEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [searchPosts, { data, loading }] = useLazyQuery(INSTANT_SEARCH);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 2) {
        searchPosts({ variables: { search: term } });
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
      setSearchTerm('');
      inputRef.current?.blur();
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setSearchTerm('');
    inputRef.current?.blur();
  };

  const results = data?.posts?.edges || [];

  // Popular searches for SEO
  const popularSearches = [
    'load shedding',
    'elections',
    'crime',
    'politics',
    'business',
  ];

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search news..."
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
          aria-label="Search news articles"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-600 hover:text-red-600"
          aria-label="Submit search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Instant Search Results Dropdown */}
      {isOpen && (
        <div
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {loading && (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Search Results
                </p>
              </div>
              <ul role="listbox">
                {results.map((edge: { node: SearchResult }) => {
                  const post = edge.node;
                  const postDate = new Date(post.date);
                  const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${post.slug}/`;
                  const category = post.categories?.edges?.[0]?.node;

                  return (
                    <li key={post.id} role="option">
                      <Link
                        href={postUrl}
                        onClick={handleResultClick}
                        className="block p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            {category && (
                              <span className="inline-block text-xs text-red-600 font-semibold mb-1">
                                {category.name}
                              </span>
                            )}
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(postDate, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={`/search?q=${encodeURIComponent(searchTerm)}`}
                onClick={handleResultClick}
                className="block p-3 text-center text-sm text-red-600 hover:bg-gray-50 font-semibold border-t border-gray-100"
              >
                View all results for "{searchTerm}" →
              </Link>
            </>
          )}

          {!loading && results.length === 0 && searchTerm.length >= 2 && (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-3">No results found for "{searchTerm}"</p>
              <p className="text-sm text-gray-400">Try different keywords or browse categories</p>
            </div>
          )}

          {/* Popular Searches - Show when focused but not searching */}
          {isFocused && searchTerm.length < 2 && (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Popular Searches
                </p>
              </div>
              <ul className="p-2">
                {popularSearches.map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm(term);
                        inputRef.current?.focus();
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <svg className="inline-block w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}