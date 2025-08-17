'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BreakingNewsItem {
  id: string;
  title: string;
  slug: string;
}

interface BreakingNewsBannerProps {
  news?: BreakingNewsItem[];
}

export default function BreakingNewsBanner({ news }: BreakingNewsBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!news || news.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className="bg-brand-red text-white">
      <div className="container-wide py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 overflow-hidden">
            <span className="breaking-news-badge bg-white text-brand-red flex-shrink-0">
              Breaking
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="flex space-x-6 animate-marquee">
                {news.map((item) => (
                  <Link
                    key={item.id}
                    href={`/post/${item.slug}`}
                    className="whitespace-nowrap hover:underline text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 hover:bg-brand-darkred rounded"
            aria-label="Close breaking news"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}