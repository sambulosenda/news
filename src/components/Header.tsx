'use client';

import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';

const navigation = [
  { name: 'Politics', href: '/category/politics' },
  { name: 'Business', href: '/category/business' },
  { name: 'Technology', href: '/category/technology' },
  { name: 'World', href: '/category/world' },
  { name: 'Sports', href: '/category/sports' },
  { name: 'Opinion', href: '/category/opinion' },
  { name: 'Arts', href: '/category/arts' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const today = new Date();

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
            <button className="p-2 -mr-2">
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
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block py-2 border-t border-gray-900">
          <ul className="flex items-center justify-center space-x-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium uppercase tracking-wide hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}