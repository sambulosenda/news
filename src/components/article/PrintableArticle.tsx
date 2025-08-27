import React from 'react';

interface ArticleData {
  title: string;
  content: string;
  author?: { name: string };
  publishedDate: string;
  lastModified?: string;
  categories?: string[];
}

interface PrintableArticleProps {
  article: ArticleData;
  children: React.ReactNode;
}

export default function PrintableArticle({ article, children }: PrintableArticleProps) {
  const articleUrl = typeof window !== 'undefined' ? window.location.href : '';
  const printDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      {/* Print-only header with metadata */}
      <div className="print-only article-print-header hidden">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Report Focus News</h1>
          <p className="text-sm text-gray-600">Your trusted source for Southern Africa news</p>
        </div>
        <div className="article-print-meta">
          <p><strong>Article:</strong> {article.title}</p>
          <p><strong>Author:</strong> {article.author?.name || 'Report Focus News Staff'}</p>
          <p><strong>Published:</strong> {new Date(article.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          {article.lastModified && (
            <p><strong>Last Updated:</strong> {new Date(article.lastModified).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          )}
          <p><strong>Category:</strong> {article.categories?.join(', ') || 'News'}</p>
          <p className="article-print-url"><strong>Original URL:</strong> {articleUrl}</p>
        </div>
      </div>

      {/* Main article content */}
      <article className="printable-article">
        {children}
      </article>

      {/* Print-only footer */}
      <div className="print-only print-copyright hidden mt-8 pt-4 border-t">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Report Focus News. All rights reserved.
        </p>
        <p className="text-center text-xs text-gray-600 mt-2">
          This article was printed from Report Focus News on {printDate}
        </p>
        <p className="text-center text-xs text-gray-600 mt-1">
          For the latest updates, visit: https://reportfocusnews.com
        </p>
        {articleUrl && (
          <p className="text-center text-xs text-gray-600 mt-2">
            Original article: {articleUrl}
          </p>
        )}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>This is a printed copy for personal use only.</p>
          <p>Redistribution or commercial use requires written permission.</p>
        </div>
      </div>
    </>
  );
}