'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import type { FormEvent, PointerEvent } from 'react';
import { WPCategory } from '@/types/wordpress';
import { mapCategoriesToNavigation } from '@/config/navigation';
import { getMarketData, formatMarketData } from '@/lib/data/market-data';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  categories?: WPCategory[];
  breakingNews?: {
    show: boolean;
    title: string;
    link: string;
  };
}

// Memoized date formatter
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Get current time for different cities
const getTimeForCity = (timeZone: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
    hour12: false
  };
  return new Date().toLocaleTimeString('en-US', options);
};

export default function HeaderNYT({ categories = [], breakingNews }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [johannesburgTime, setJohannesburgTime] = useState<string | null>(null);
  const [harareTime, setHarareTime] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [marketData, setMarketData] = useState<ReturnType<typeof formatMarketData> | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Map WordPress categories to our navigation structure
  const navigation = mapCategoriesToNavigation(categories);
  const allFeatured = navigation.filter(item => item.featured && item.slug !== 'breaking-news');
  // Limit main nav items to prevent overflow - Al Jazeera style
  const featuredNav = allFeatured.slice(0, 6); // Show 6 main items
  const remainingFeatured = allFeatured.slice(6);
  const unfeatured = navigation.filter(item => !item.featured || item.slug === 'breaking-news');
  const moreNav = [...remainingFeatured, ...unfeatured];

  // Set date and times on client side
  useEffect(() => {
    const updateDateTime = () => {
      setFormattedDate(formatDate(new Date()));
      setJohannesburgTime(getTimeForCity('Africa/Johannesburg'));
      setHarareTime(getTimeForCity('Africa/Harare'));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Fetch market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await getMarketData();
        setMarketData(formatMarketData(data));
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Fallback to default values
        setMarketData({
          jse: {
            display: '▲',
            percent: '0.8%',
            color: 'text-green-600'
          },
          zarUsd: {
            rate: '18.45',
            change: '+0.15',
            color: 'text-green-600'
          }
        });
      }
    };

    fetchMarketData();
    // Update market data every 5 minutes
    const marketInterval = setInterval(fetchMarketData, 5 * 60 * 1000);

    return () => clearInterval(marketInterval);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  // Close search on escape key or clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchTerm('');
      }
    };

    const handlePointerDownOutside = (event: PointerEvent | MouseEvent) => {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchTerm('');
      }
    };

    if (searchOpen) {
      document.addEventListener('keydown', handleEscape);
  document.addEventListener('pointerdown', handlePointerDownOutside as (event: Event) => void);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
  document.removeEventListener('pointerdown', handlePointerDownOutside as (event: Event) => void);
    };
  }, [searchOpen]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      {/* Breaking News Banner - More subtle */}
      {breakingNews?.show && (
        <div className="bg-red-600 text-white py-2 px-4">
          <div className="container-wide flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" aria-hidden="true"></span>
              <span className="text-xs font-bold uppercase tracking-wider">Breaking</span>
            </span>
            <Link href={breakingNews.link} className="text-sm hover:underline">
              {breakingNews.title}
            </Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Enhanced Top Bar with Professional Elements */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="container-wide">
            <div className="flex justify-between items-center py-2.5">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                {formattedDate && (
                  <time className="font-medium" suppressHydrationWarning>
                    {formattedDate}
                  </time>
                )}
                {formattedDate && <span className="hidden sm:inline text-gray-400">|</span>}
                {johannesburgTime && (
                  <span className="hidden sm:inline" suppressHydrationWarning>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="font-medium">JHB</span> {johannesburgTime}
                  </span>
                )}
                {harareTime && (
                  <span className="hidden md:inline" suppressHydrationWarning>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="font-medium">HRE</span> {harareTime}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {marketData && (
                  <div className="hidden lg:flex items-center gap-3 text-xs text-gray-600">
                    <span className="font-medium">JSE</span>
                    <span className={marketData.jse.color}>
                      {marketData.jse.display} {marketData.jse.percent}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="font-medium">ZAR/USD</span>
                    <span>{marketData.zarUsd.rate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation bar - Al Jazeera style with logo on left */}
        <div className="shadow-md">
          <div className="container-wide">
            <div className="flex items-center h-14 lg:h-16">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-3 -ml-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>

              {/* Mobile logo - centered on mobile */}
              <div className="flex lg:hidden flex-1 justify-center">
                <Link href="/">
                  <h1 className="font-serif text-xl font-bold tracking-tight text-black">
                    Report Focus News
                  </h1>
                </Link>
              </div>

              {/* Desktop Logo - Clean Professional Style */}
              <Link href="/" className="hidden lg:block flex-shrink-0">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-black">
                  Report Focus News
                </h1>
              </Link>

              {/* Desktop Navigation - Professional Spacing */}
              <nav className="hidden lg:flex flex-1 justify-center items-center" aria-label="Main navigation">
                <ul className="flex items-center gap-0" role="menubar">
                  {/* Main navigation items */}
                  {featuredNav.map((section) => {
                    const hasChildren = section.children && section.children.length > 0;
                    
                    return (
                      <Fragment key={section.slug}>
                        <li className="relative group" role="none">
                          <Link
                            href={`/news/${section.slug}/`}
                            className="flex items-center gap-1 px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-black hover:bg-gray-50 transition-all border-b-2 border-transparent hover:border-black"
                            role="menuitem"
                            aria-haspopup={hasChildren ? "true" : undefined}
                          >
                            {section.name}
                            {hasChildren && (
                              <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </Link>
                          
                          {/* Dropdown */}
                          {hasChildren && (
                            <div className="absolute top-full left-0 invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 pt-1 z-50">
                              <div className="bg-white border border-gray-200 shadow-xl rounded-md min-w-[280px] max-w-md overflow-hidden">
                                <div className="py-2">
                                  <Link
                                    href={`/news/${section.slug}/`}
                                    className="block px-5 py-3 text-sm font-semibold text-gray-900 hover:text-red-700 hover:bg-red-50 border-b border-gray-100 transition-colors"
                                  >
                                    All {section.name}
                                  </Link>
                                  <div className={`${section.children && section.children.length > 6 ? 'columns-2 gap-4' : ''} p-3`}>
                                    {section.children?.map((child) => (
                                      <Link
                                        key={child.slug}
                                        href={`/news/${child.slug}/`}
                                        className="block px-3 py-2.5 text-sm text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors break-inside-avoid"
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
                      </Fragment>
                    );
                  })}
                  
                  {/* More dropdown */}
                  {moreNav.length > 0 && (
                    <li className="relative group" role="none">
                      <button
                        className="flex items-center gap-1 px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-black hover:bg-gray-50 transition-all border-b-2 border-transparent hover:border-black"
                        role="menuitem"
                        aria-haspopup="true"
                      >
                        More
                        <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    
                      <div className="absolute top-full left-0 invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 pt-1 z-50">
                        <div className="bg-white border border-gray-200 shadow-xl rounded-md w-72 overflow-hidden">
                          <div className="py-2 max-h-96 overflow-y-auto">
                            {moreNav.map((section) => (
                              <Link
                                key={section.slug}
                                href={section.slug === 'weather' ? '/weather' : `/news/${section.slug}/`}
                                className="block px-5 py-3 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 transition-colors"
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

              {/* Search Icon Button */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors" 
                aria-label="Search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Simple Search Bar Below Navigation */}
        {searchOpen && (
          <div 
            ref={searchModalRef}
            className="absolute top-full left-0 right-0 bg-gray-50 border-b border-gray-200 shadow-md z-50 animate-slide-down"
          >
            <div className="container-wide py-3">
              <form onSubmit={handleSearchSubmit} className="flex gap-3 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search news..."
                    className="w-full pl-12 pr-12 py-3 text-base bg-white border border-gray-300 rounded-full focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    aria-label="Search news"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchTerm('');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu - Professional & Compact */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            <div className="fixed left-0 top-0 bottom-0 w-72 max-w-[75vw] bg-white z-50 lg:hidden shadow-2xl animate-slide-in-left">
              {/* Header - Compact & Professional */}
              <div className="sticky top-0 bg-white border-b border-gray-200 backdrop-blur-lg bg-white/95 z-10">
                <div className="flex items-center justify-between p-4">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <h2 className="font-serif text-lg font-bold tracking-tight">Report Focus News</h2>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Navigation - Compact with Accordion Style */}
              <nav className="overflow-y-auto h-[calc(100vh-72px)]" aria-label="Mobile navigation">
                {/* Quick Links - Compact Grid */}
                <div className="p-4 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/"
                      className="flex items-center justify-center px-3 py-2.5 bg-gray-50 hover:bg-red-50 hover:text-red-700 rounded-lg text-sm font-semibold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Home
                    </Link>
                    <Link
                      href="/search"
                      className="flex items-center justify-center px-3 py-2.5 bg-gray-50 hover:bg-red-50 hover:text-red-700 rounded-lg text-sm font-semibold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search
                    </Link>
                  </div>
                </div>

                {/* Main Navigation - Compact Accordion */}
                <div className="px-4 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Categories</h3>
                  <div className="space-y-0.5">
                    {navigation.map((section) => {
                      const hasChildren = section.children && section.children.length > 0;
                      const isExpanded = expandedSections.has(section.slug);
                      
                      return (
                        <div key={section.slug}>
                          <div className="flex items-stretch">
                            <Link
                              href={`/news/${section.slug}/`}
                              className={`flex-1 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 rounded-l-lg transition-colors flex items-center ${
                                section.featured && section.slug !== 'breaking-news' 
                                  ? 'text-gray-900 font-semibold' 
                                  : 'text-gray-700'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {section.name}
                            </Link>
                            {hasChildren && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedSections(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(section.slug)) {
                                      newSet.delete(section.slug);
                                    } else {
                                      newSet.add(section.slug);
                                    }
                                    return newSet;
                                  });
                                }}
                                className="px-3 py-2.5 hover:bg-gray-50 rounded-r-lg border-l border-gray-200 transition-colors"
                                aria-label={`Toggle ${section.name} submenu`}
                                aria-expanded={isExpanded}
                              >
                                <svg 
                                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            )}
                          </div>
                          
                          {/* Collapsible Children */}
                          {hasChildren && isExpanded && (
                            <div className="ml-6 mt-1 space-y-0.5 animate-accordion-down">
                              {section.children?.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={`/news/${child.slug}/`}
                                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-700 rounded-md transition-colors"
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
                </div>

                {/* Additional Links - Compact */}
                <div className="p-4 border-t border-gray-100">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">More</h3>
                  <div className="space-y-1">
                    <Link
                      href="/weather"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      Weather
                    </Link>
                    {marketData && (
                      <div className="px-3 py-2 text-sm text-gray-600">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Markets</span>
                          <span className="text-xs">
                            JSE <span className={marketData.jse.color}>{marketData.jse.percent}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Info - Ultra Compact */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    {formattedDate && (
                      <div suppressHydrationWarning>{formattedDate}</div>
                    )}
                    <div className="flex gap-3">
                      {johannesburgTime && (
                        <span suppressHydrationWarning>JHB {johannesburgTime}</span>
                      )}
                      {harareTime && (
                        <span suppressHydrationWarning>HRE {harareTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}