'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, Fragment } from 'react';
import { WPCategory } from '@/types/wordpress';
import { mapCategoriesToNavigation } from '@/config/navigation';
import { getMarketData, formatMarketData } from '@/lib/data/market-data';

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
  const [formattedDate, setFormattedDate] = useState('');
  const [johannesburgTime, setJohannesburgTime] = useState('');
  const [harareTime, setHarareTime] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [marketData, setMarketData] = useState<ReturnType<typeof formatMarketData> | null>(null);
  
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
                  <time className="font-medium" dateTime={new Date().toISOString()}>
                    {formattedDate}
                  </time>
                )}
                <span className="hidden sm:inline text-gray-400">|</span>
                {typeof window !== 'undefined' && johannesburgTime && (
                  <span className="hidden sm:inline">
                    <span className="font-medium">JHB</span> {johannesburgTime}
                  </span>
                )}
                {typeof window !== 'undefined' && harareTime && (
                  <span className="hidden md:inline">
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="font-medium">HRE</span> {harareTime}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {typeof window !== 'undefined' && marketData && (
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
                <Link href="/newsletters" className="hidden md:inline text-xs text-gray-600 hover:text-black transition-colors font-medium">
                  Newsletters
                </Link>
                <Link href="/subscribe" className="bg-black text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                  Subscribes
                </Link>
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

              {/* Enhanced Search */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-gray-300 rounded-lg shadow-lg animate-fade-in">
                    <input
                      type="search"
                      placeholder="Search news..."
                      className="px-4 py-2 w-64 text-sm focus:outline-none rounded-l-lg"
                      autoFocus
                      onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                    />
                    <button className="px-3 py-2 hover:bg-gray-50 border-l border-gray-200">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors" 
                    aria-label="Search"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto animate-slide-in-left">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold">Report Focus News</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <nav className="p-6" aria-label="Mobile navigation">
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block px-6 py-4 text-base font-semibold text-gray-900 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 min-h-[48px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {navigation.map((section) => {
                    const hasChildren = section.children && section.children.length > 0;
                    
                    return (
                      <div key={section.slug} className="space-y-1">
                        <Link
                          href={`/news/${section.slug}/`}
                          className={`block px-6 py-4 text-base font-medium hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 min-h-[48px] flex items-center ${section.featured && section.slug !== 'breaking-news' ? 'text-gray-900' : 'text-gray-600'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {section.name}
                        </Link>
                        {hasChildren && (
                          <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                            {section.children?.map((child) => (
                              <Link
                                key={child.slug}
                                href={`/news/${child.slug}/`}
                                className="block px-5 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
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

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                  <Link
                    href="/weather"
                    className="block px-6 py-4 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 min-h-[48px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Weather
                  </Link>
                  <Link
                    href="/search"
                    className="block px-6 py-4 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 min-h-[48px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Search
                  </Link>
                  <Link
                    href="/newsletters"
                    className="block px-6 py-4 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 min-h-[48px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Newsletters
                  </Link>
                  <Link
                    href="/subscribe"
                    className="block px-6 py-4 text-base text-white bg-red-700 font-semibold hover:bg-red-800 rounded-xl text-center shadow-md transition-all duration-200 mt-4 min-h-[48px] flex items-center justify-center"
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