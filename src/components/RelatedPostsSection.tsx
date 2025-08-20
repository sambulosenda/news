'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { WPPost } from '@/types/wordpress';

interface RelatedPostsSectionProps {
  slug: string;
}

export default function RelatedPostsSection({ slug }: RelatedPostsSectionProps) {
  const [related, setRelated] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const response = await fetch(`/api/related-posts?slug=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setRelated(data.posts || []);
        }
      } catch (error) {
        console.error('Failed to load related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to prioritize main content
    const timer = setTimeout(loadRelated, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t-2 border-gray-200">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
            More from Report Focus News
          </h2>
          <div className="w-20 h-1 bg-red-700"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[16/9] rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!related.length) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t-2 border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
          More from Report Focus News
        </h2>
        <div className="w-20 h-1 bg-red-700"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.slice(0, 4).map((relatedPost: WPPost) => (
          <ArticleCard
            key={relatedPost.id}
            article={relatedPost}
            variant="default"
            showImage={true}
            showExcerpt={true}
            showAuthor={false}
            showCategory={true}
          />
        ))}
      </div>
    </section>
  );
}