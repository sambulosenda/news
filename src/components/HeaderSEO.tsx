'use client';

import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';
import { WPCategory } from '@/types/wordpress';
import { navigationConfig, mapCategoriesToNavigation, NavSection } from '@/config/navigation';

interface HeaderProps {
  categories?: WPCategory[];
}

export default function HeaderSEO({ categories = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const today = new Date();

  // Map WordPress categories to our navigation structure
  const navigation = mapCategoriesToNavigation(categories);
  
  // Separate featured and more sections
  const featuredNav = navigation.filter(item => item.featured);
  const moreNav = navigation.filter(item => !item.featured);

  return (
    <>
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
                aria-label="Open menu"
              >
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

              {/* Logo with Schema.org markup */}
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
              <Link href="/search" className="p-2 -mr-2" aria-label="Search">
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

          {/* Main Navigation - SEO Optimized */}
          <nav 
            className="hidden lg:block py-2 border-t border-gray-900"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="flex items-center justify-center space-x-6">
              {/* Home link - important for SEO */}
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium uppercase tracking-wide hover:underline py-2 block"
                >
                  Home
                </Link>
              </li>

              {/* Featured navigation items */}
              {featuredNav.map((section) => {
                const hasChildren = section.children && section.children.length > 0;
                
                return (
                  <li 
                    key={section.slug} 
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenDropdown(section.slug)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {hasChildren ? (
                      <>
                        <button
                          className="text-sm font-medium uppercase tracking-wide hover:underline py-2 flex items-center gap-1"
                          aria-expanded={openDropdown === section.slug}
                          aria-haspopup="true"
                        >
                          {section.name}
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Mega menu dropdown */}
                        {openDropdown === section.slug && (
                          <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 shadow-lg z-50 min-w-[250px]">
                            <div className="py-2">
                              {/* Main category link */}
                              <Link
                                href={`/category/${section.slug}`}
                                className="block px-4 py-2 text-sm hover:bg-gray-50 font-semibold border-b border-gray-200"
                                onClick={() => setOpenDropdown(null)}
                              >
                                All {section.name}
                              </Link>
                              
                              {/* Subcategories - organized in columns for mega menu effect */}
                              <div className={`grid ${section.children.length > 6 ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4`}>
                                {section.children.map((child) => (
                                  <Link
                                    key={child.slug}
                                    href={`/category/${child.slug}`}
                                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`/category/${section.slug}`}
                        className="text-sm font-medium uppercase tracking-wide hover:underline py-2 block"
                      >
                        {section.name}
                      </Link>
                    )}
                  </li>
                );
              })}
              
              {/* More dropdown for additional categories */}
              {moreNav.length > 0 && (
                <li 
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('more')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="text-sm font-medium uppercase tracking-wide hover:underline py-2 flex items-center gap-1"
                    aria-expanded={openDropdown === 'more'}
                    aria-haspopup="true"
                  >
                    More
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openDropdown === 'more' && (
                    <div className="absolute top-full right-0 mt-0 bg-white border border-gray-200 shadow-lg z-50 min-w-[200px] max-h-96 overflow-y-auto">
                      <div className="py-2">
                        {moreNav.map((section) => (
                          <Link
                            key={section.slug}
                            href={`/category/${section.slug}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {section.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 max-h-[70vh] overflow-y-auto">
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                <Link
                  href="/"
                  className="block text-base font-medium hover:underline py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                {navigation.map((section) => {
                  const hasChildren = section.children && section.children.length > 0;
                  
                  return (
                    <div key={section.slug}>
                      <Link
                        href={`/category/${section.slug}`}
                        className={`block text-base font-medium hover:underline py-2 ${section.featured ? 'font-bold' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {section.name}
                      </Link>
                      {hasChildren && (
                        <div className="pl-4 space-y-1">
                          {section.children.map((child) => (
                            <Link
                              key={child.slug}
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
      
      {/* Schema.org structured data for navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "Main navigation",
            "url": "https://www.reportfocusnews.com",
            "hasPart": [
              {
                "@type": "SiteNavigationElement",
                "name": "Home",
                "url": "https://www.reportfocusnews.com/"
              },
              ...featuredNav.map(section => ({
                "@type": "SiteNavigationElement", 
                "name": section.name,
                "url": `https://www.reportfocusnews.com/category/${section.slug}`,
                ...(section.children && {
                  "hasPart": section.children.map(child => ({
                    "@type": "SiteNavigationElement",
                    "name": child.name,
                    "url": `https://www.reportfocusnews.com/category/${child.slug}`
                  }))
                })
              }))
            ]
          })
        }}
      />
    </>
  );
}