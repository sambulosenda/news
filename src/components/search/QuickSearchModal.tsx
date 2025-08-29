'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, Loader2, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SearchBox from './SearchBox';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recent = localStorage.getItem('recentSearches');
      if (recent) {
        setRecentSearches(JSON.parse(recent));
      }
    }
  }, [isOpen]);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  const handleQuickSearch = (query: string) => {
    // Save to recent searches
    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };
  
  const trendingTopics = [
    'Load Shedding',
    'Zimbabwe Politics',
    'South Africa Economy',
    'SADC Summit',
    'Springboks',
    'JSE Market'
  ];
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-20 px-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Quick Search</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <SearchBox
              placeholder="Search news, topics, or keywords..."
              autoFocus={true}
              className="w-full"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleQuickSearch(search)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Trending Topics */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending Topics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleQuickSearch(topic)}
                    className="text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">{topic}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-3 text-center">
                <a
                  href="/category/breaking-news"
                  className="py-2 text-sm text-primary hover:underline"
                  onClick={onClose}
                >
                  Breaking News
                </a>
                <a
                  href="/category/politics"
                  className="py-2 text-sm text-primary hover:underline"
                  onClick={onClose}
                >
                  Politics
                </a>
                <a
                  href="/category/business"
                  className="py-2 text-sm text-primary hover:underline"
                  onClick={onClose}
                >
                  Business
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}