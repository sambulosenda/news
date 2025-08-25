'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/HeaderNYT';
import { WPCategory } from '@/types/wordpress';

export default function ClientHeader() {
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories client-side
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Default categories for immediate rendering
  const defaultCategories: WPCategory[] = [
    { id: '1', name: 'Politics', slug: 'politics', uri: '/category/politics' },
    { id: '2', name: 'Business', slug: 'business', uri: '/category/business' },
    { id: '3', name: 'Technology', slug: 'technology', uri: '/category/technology' },
    { id: '4', name: 'Sports', slug: 'sports', uri: '/category/sports' },
    { id: '5', name: 'Entertainment', slug: 'entertainment', uri: '/category/entertainment' },
  ] as WPCategory[];

  const breakingNews = {
    show: false,
    title: "Major story developing",
    link: "/breaking/story-slug"
  };

  return <Header categories={loading ? defaultCategories : categories} breakingNews={breakingNews} />;
}