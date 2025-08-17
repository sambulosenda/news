'use client';

// This is a client-only version of the header for error, loading, and not-found pages
// It doesn't fetch categories from the API to avoid server-side dependencies

import HeaderOptimized from './HeaderOptimized';

export default function HeaderClient() {
  // Use a minimal set of default categories for error/loading pages
  const defaultCategories = [];
  
  const breakingNews = {
    show: false,
    title: "",
    link: ""
  };
  
  return <HeaderOptimized categories={defaultCategories} breakingNews={breakingNews} />;
}