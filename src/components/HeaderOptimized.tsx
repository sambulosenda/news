'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { WPCategory } from '@/types/wordpress';
import { navigationConfig, mapCategoriesToNavigation } from '@/config/navigation';

interface HeaderProps {
  categories?: WPCategory[];
  breakingNews?: {
    show: boolean;
    title: string;
    link: string;
  };
}

export default function HeaderOptimized({ categories = [], breakingNews }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const today = new Date();

  // Map WordPress categories to our navigation structure
  const navigation = mapCategoriesToNavigation(categories);
  // Filter out Breaking News from featured nav since we have the banner
  const featuredNav = navigation.filter(item => item.featured && item.slug !== 'breaking-news');
  const moreNav = navigation.filter(item => !item.featured || item.slug === 'breaking-news');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic Breaking News Banner - Only show when there's actual breaking news */}
      {breakingNews?.show && (
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-2.5 px-4">
          <div className="container-wide flex items-center justify-center">
            <span className="inline-flex h-2 w-2 rounded-full bg-white animate-pulse mr-2"></span>
            <Link href={breakingNews.link} className="text-sm font-semibold hover:underline">
              BREAKING: {breakingNews.title}
            </Link>
          </div>
        </div>
      )}

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : ''}`}>
        {/* Top bar */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="container-wide">
            <div className="flex justify-between items-center py-2 text-sm">
              <div className="flex items-center space-x-4">
                <time className="text-gray-600">
                  {format(today, 'EEEE, MMMM d, yyyy')}
                </time>
                <span className="hidden sm:inline text-gray-400">|</span>
                <Link href="/today" className="hidden sm:inline text-gray-600 hover:text-red-700 transition-colors">
                  Today's Paper
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/newsletters" className="hidden md:inline text-gray-600 hover:text-red-700 transition-colors">
                  Newsletters
                </Link>
                <Link href="/subscribe" className="bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-800 transition-colors">
                  Subscribe
                </Link>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header with centered logo */}
        <div className="container-wide">
          <div className={`transition-all duration-200 ${isScrolled ? 'py-3' : 'py-5'}`}>
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Centered Logo */}
              <div className="flex-1 flex justify-center lg:justify-center">
                <Link href="/" className="group text-center">
                  <h1 className={`font-display font-bold tracking-tight text-gray-900 group-hover:text-red-700 transition-all duration-200 ${isScrolled ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'}`}>
                    Report Focus News
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-600 uppercase tracking-widest mt-1">
                    Independent • Reliable • Insightful
                  </p>
                </Link>
              </div>

              {/* Search */}
              <Link href="/search" className="p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Search">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:block border-t border-gray-900">
            <ul className="flex items-center justify-center space-x-0">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-red-700 hover:bg-gray-50 border-b-2 border-transparent hover:border-red-700 transition-all"
                >
                  HOME
                </Link>
              </li>

              {/* Main navigation items */}
              {featuredNav.map((section) => {
                const hasChildren = section.children && section.children.length > 0;
                
                return (
                  <li 
                    key={section.slug} 
                    className="relative group"
                  >
                    <Link
                      href={`/news/${section.slug}/`}
                      className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-red-700 hover:bg-gray-50 border-b-2 border-transparent hover:border-red-700 transition-all"
                    >
                      {section.name.toUpperCase()}
                      {hasChildren && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>
                    
                    {/* Dropdown */}
                    {hasChildren && (
                      <div className="absolute top-full left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pt-0">
                        <div className="bg-white border border-gray-200 shadow-lg min-w-[250px] max-w-md">
                          <div className="py-2">
                            <Link
                              href={`/news/${section.slug}/`}
                              className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:text-red-700 hover:bg-gray-50 border-b border-gray-200 transition-colors"
                            >
                              All {section.name}
                            </Link>
                            <div className={`${section.children && section.children.length > 6 ? 'columns-2' : ''} p-2`}>
                              {section.children?.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={`/news/${child.slug}/`}
                                  className="block px-2 py-1.5 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded transition-colors"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
              
              {/* More dropdown */}
              {moreNav.length > 0 && (
                <li className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-red-700 hover:bg-gray-50 border-b-2 border-transparent hover:border-red-700 transition-all"
                  >
                    MORE
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute top-full right-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pt-0">
                    <div className="bg-white border border-gray-200 shadow-lg w-56">
                      <div className="py-2 max-h-96 overflow-y-auto">
                        {moreNav.map((section) => (
                          <Link
                            key={section.slug}
                            href={`/news/${section.slug}/`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 transition-colors"
                          >
                            {section.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Menu</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <nav className="p-4">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {navigation.map((section) => {
                    const hasChildren = section.children && section.children.length > 0;
                    
                    return (
                      <div key={section.slug}>
                        <Link
                          href={`/news/${section.slug}/`}
                          className={`block px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg ${section.featured && section.slug !== 'breaking-news' ? '' : 'text-gray-600'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {section.name}
                        </Link>
                        {hasChildren && (
                          <div className="ml-4 mt-1 space-y-1">
                            {section.children?.map((child) => (
                              <Link
                                key={child.slug}
                                href={`/news/${child.slug}/`}
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
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
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-1">
                  <Link
                    href="/search"
                    className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Search
                  </Link>
                  <Link
                    href="/today"
                    className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Today's Paper
                  </Link>
                  <Link
                    href="/newsletters"
                    className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Newsletters
                  </Link>
                  <Link
                    href="/subscribe"
                    className="block px-4 py-3 text-base text-white bg-red-700 font-semibold hover:bg-red-800 rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Subscribe
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}