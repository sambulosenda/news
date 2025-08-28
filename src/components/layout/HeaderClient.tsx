'use client';

// This is a client-only version of the header for error, loading, and not-found pages
// It doesn't fetch categories from the API to avoid server-side dependencies

import Header from '@/components/layout/HeaderNYT';
import { WPCategory } from '@/types/wordpress';

export default function HeaderClient() {
  // Use a minimal set of default categories for error/loading pages
  const defaultCategories: WPCategory[] = [];
  
  const breakingNews = {
    show: false,
    title: "",
    link: ""
  };
  
  return <Header categories={defaultCategories} breakingNews={breakingNews} />;
}