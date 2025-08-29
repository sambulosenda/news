'use client';

import { InstantSearch, SearchBox, Hits, Pagination, RefinementList, Stats, Configure, Highlight } from 'react-instantsearch';
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX_NAME } from '@/lib/algolia/config';
import { algoliasearch } from 'algoliasearch';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import SearchErrorBoundary from './SearchErrorBoundary';

interface HitProps {
  hit: {
    objectID: string;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    categories: string[];
    author: string;
    featuredImage: string | null;
    readingTime: number;
  };
}

function Hit({ hit }: HitProps) {
  const articleDate = new Date(hit.date);
  const articleUrl = `/${articleDate.getFullYear()}/${String(articleDate.getMonth() + 1).padStart(2, '0')}/${String(articleDate.getDate()).padStart(2, '0')}/${hit.slug}`;

  return (
    <article className="border-b border-gray-200 pb-6 mb-6 last:border-0">
      <Link href={articleUrl} className="group block">
        <div className="flex gap-6">
          {hit.featuredImage && (
            <div className="flex-shrink-0 w-48 h-32 relative overflow-hidden rounded-lg">
              <Image
                src={hit.featuredImage}
                alt={hit.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary mb-2 line-clamp-2">
              <Highlight attribute="title" hit={hit} />
            </h2>
            
            <p className="text-gray-600 line-clamp-2 mb-3">
              <Highlight attribute="excerpt" hit={hit} />
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={hit.date}>
                  {formatDistanceToNow(articleDate, { addSuffix: true })}
                </time>
              </div>
              
              {hit.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{hit.author}</span>
                </div>
              )}
              
              {hit.readingTime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{hit.readingTime} min read</span>
                </div>
              )}
              
              {hit.categories.length > 0 && (
                <div className="flex gap-2">
                  {hit.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

interface SearchResultsProps {
  initialQuery?: string;
}

export default function SearchResults({ initialQuery = '' }: SearchResultsProps) {
  // Debug logging
  console.log('Algolia Config:', {
    appId: ALGOLIA_APP_ID,
    apiKey: ALGOLIA_SEARCH_API_KEY ? 'Set' : 'Missing',
    indexName: ALGOLIA_INDEX_NAME
  });

  // Create search client directly here to ensure it's initialized properly
  const searchClient = ALGOLIA_APP_ID && ALGOLIA_SEARCH_API_KEY 
    ? algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY)
    : null;

  if (!searchClient || !ALGOLIA_INDEX_NAME) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Search is currently unavailable. Please check configuration.
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                App ID: {ALGOLIA_APP_ID ? 'Set' : 'Missing'} | 
                API Key: {ALGOLIA_SEARCH_API_KEY ? 'Set' : 'Missing'} | 
                Index: {ALGOLIA_INDEX_NAME || 'Missing'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SearchErrorBoundary>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        <Configure hitsPerPage={20} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <RefinementList
                  attribute="categories"
                  limit={10}
                  showMore={true}
                  classNames={{
                    root: 'space-y-2',
                    item: 'flex items-center',
                    checkbox: 'mr-2 text-primary focus:ring-primary',
                    label: 'flex items-center cursor-pointer',
                    labelText: 'text-sm text-gray-700',
                    count: 'ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded'
                  }}
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Authors</h3>
                <RefinementList
                  attribute="author"
                  limit={5}
                  showMore={true}
                  classNames={{
                    root: 'space-y-2',
                    item: 'flex items-center',
                    checkbox: 'mr-2 text-primary focus:ring-primary',
                    label: 'flex items-center cursor-pointer',
                    labelText: 'text-sm text-gray-700',
                    count: 'ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded'
                  }}
                />
              </div>
            </div>
          </aside>
          
          {/* Search Results */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <SearchBox
                  placeholder="Search articles..."
                  classNames={{
                    root: 'w-full',
                    form: 'relative',
                    input: 'w-full px-4 py-3 pl-12 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    submit: 'absolute left-4 top-1/2 transform -translate-y-1/2',
                    submitIcon: 'w-5 h-5 text-gray-400',
                    reset: 'absolute right-4 top-1/2 transform -translate-y-1/2',
                    resetIcon: 'w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer',
                  }}
                  defaultRefinement={initialQuery}
                />
                
                <div className="mt-4">
                  <Stats
                    classNames={{
                      root: 'text-sm text-gray-600',
                      text: 'font-medium'
                    }}
                    translations={{
                      stats(nbHits, processingTimeMS) {
                        return `${nbHits.toLocaleString()} results found in ${processingTimeMS}ms`;
                      },
                    }}
                  />
                </div>
              </div>
              
              <div className="p-6">
                <Hits 
                  hitComponent={Hit}
                  classNames={{
                    root: 'space-y-4',
                    emptyRoot: 'text-center py-12',
                    list: 'space-y-4'
                  }}
                />
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <Pagination
                  classNames={{
                    root: 'flex justify-center',
                    list: 'flex gap-2',
                    item: 'rounded',
                    link: 'px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50',
                    selectedItem: 'bg-primary text-white',
                    disabledItem: 'opacity-50 cursor-not-allowed'
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </InstantSearch>
    </SearchErrorBoundary>
  );
}