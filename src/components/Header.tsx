'use client';

import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';
import { WPCategory } from '@/types/wordpress';

interface HeaderProps {
  categories?: WPCategory[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const today = new Date();

  // Get only top-level categories (those without parents) for main navigation
  const topLevelCategories = categories.filter(cat => !cat.parentId);
  
  // Sort by count (most posts first) or alphabetically
  const sortedCategories = topLevelCategories.sort((a, b) => {
    // First by count (if available), then alphabetically
    if (a.count && b.count) {
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name);
  });

  // Take first 10 for main nav, rest go in "More" dropdown
  const mainNavCategories = sortedCategories.slice(0, 8);
  const moreCategories = sortedCategories.slice(8);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-wide">
        {/* Top bar with date */}
        <div className="hidden lg:flex justify-between items-center py-2 border-b border-gray-200">
          <time className="text-sm text-gray-600">
            {format(today, 'EEEE, MMMM d, yyyy')}
          </time>
          <div className="flex items-center space-x-4">
            <Link href="/subscribe" className="text-sm font-medium hover:underline">
              Subscribe
            </Link>
            <Link href="/login" className="text-sm font-medium hover:underline">
              Log In
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <Link href="/" className="text-center lg:text-left">
                <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">
                  Report Focus
                </h1>
                <p className="text-xs lg:text-sm text-gray-600 uppercase tracking-widest mt-1">
                  News & Analysis
                </p>
              </Link>
            </div>

            {/* Search button */}
            <Link href="/search" className="p-2 -mr-2">
              <span className="sr-only">Search</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Navigation with hierarchical dropdowns */}
        <nav className="hidden lg:block py-2 border-t border-gray-900">
          <ul className="flex items-center justify-center space-x-6">
            {mainNavCategories.map((category) => {
              const hasChildren = category.children && category.children.nodes.length > 0;
              
              return (
                <li 
                  key={category.id} 
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenDropdown(category.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {hasChildren ? (
                    <>
                      <button
                        className="text-sm font-medium uppercase tracking-wide hover:underline py-2 flex items-center gap-1"
                      >
                        {category.name}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown for children */}
                      {openDropdown === category.id && (
                        <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 shadow-lg z-50 min-w-[200px]">
                          <div className="py-2">
                            {/* Parent category link */}
                            <Link
                              href={`/category/${category.slug}`}
                              className="block px-4 py-2 text-sm hover:bg-gray-50 font-medium border-b border-gray-200"
                              onClick={() => setOpenDropdown(null)}
                            >
                              All {category.name}
                            </Link>
                            {/* Child categories */}
                            {category.children?.nodes?.map((child) => (
                              <Link
                                key={child.id}
                                href={`/category/${child.slug}`}
                                className="block px-4 py-2 text-sm hover:bg-gray-50"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {child.name}
                                {child.count && child.count > 0 && (
                                  <span className="text-gray-500 text-xs ml-1">
                                    ({child.count})
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-sm font-medium uppercase tracking-wide hover:underline py-2 block"
                    >
                      {category.name}
                    </Link>
                  )}
                </li>
              );
            })}
            
            {/* More dropdown for additional categories */}
            {moreCategories.length > 0 && (
              <li 
                className="relative"
                onMouseEnter={() => setOpenDropdown('more')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="text-sm font-medium uppercase tracking-wide hover:underline py-2 flex items-center gap-1"
                >
                  More
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openDropdown === 'more' && (
                  <div className="absolute top-full right-0 mt-0 bg-white border border-gray-200 shadow-lg z-50 min-w-[200px] max-h-96 overflow-y-auto">
                    <div className="py-2">
                      {moreCategories.map((category) => (
                        <div key={category.id}>
                          <Link
                            href={`/category/${category.slug}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-50 font-medium"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {category.name}
                          </Link>
                          {/* Show children inline */}
                          {category.children && category.children.nodes.length > 0 && (
                            <div className="pl-4">
                              {category.children?.nodes?.map((child) => (
                                <Link
                                  key={child.id}
                                  href={`/category/${child.slug}`}
                                  className="block px-4 py-1 text-xs text-gray-600 hover:bg-gray-50"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  → {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            )}
            
            {/* Today's Paper link */}
            <li>
              <Link
                href="/today"
                className="text-sm font-medium uppercase tracking-wide hover:underline py-2 block"
              >
                Today&apos;s Paper
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 max-h-[70vh] overflow-y-auto">
            <nav className="space-y-2">
              {sortedCategories.map((category) => {
                const hasChildren = category.children && category.children.nodes.length > 0;
                
                return (
                  <div key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className={`block text-base font-medium hover:underline py-2 ${hasChildren ? 'font-bold' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    {hasChildren && (
                      <div className="pl-4 space-y-1">
                        {category.children?.nodes?.map((child) => (
                          <Link
                            key={child.id}
                            href={`/category/${child.slug}`}
                            className="block text-sm text-gray-600 hover:underline py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/today"
                  className="block text-base font-medium hover:underline py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Today&apos;s Paper
                </Link>
                <Link
                  href="/search"
                  className="block text-base font-medium hover:underline py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}