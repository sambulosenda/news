import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { WPPost } from '@/types/wordpress';

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: WPPost[];
  variant?: 'default' | 'opinion' | 'compact';
}

export default function CategorySection({
  title,
  slug,
  articles,
  variant = 'default',
}: CategorySectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  if (variant === 'opinion') {
    return (
      <section className="py-8 lg:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold">{title}</h2>
          <Link
            href={`/category/${slug}`}
            className="text-sm font-medium hover:underline"
          >
            See All →
          </Link>
        </div>
        <div className="space-y-4">
          {articles.slice(0, 4).map((article) => (
            <article key={article.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="font-serif text-lg font-bold mb-2">
                <Link href={`/post/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
              {article.author?.node && (
                <p className="text-sm text-gray-600">By {article.author.node.name}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'compact') {
    return (
      <section className="py-6 lg:py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl lg:text-2xl font-bold">{title}</h2>
          <Link
            href={`/category/${slug}`}
            className="text-sm font-medium hover:underline"
          >
            More →
          </Link>
        </div>
        <div className="space-y-0">
          {articles.slice(0, 5).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="compact"
              showImage={false}
              showExcerpt={false}
              showAuthor={false}
              showCategory={false}
            />
          ))}
        </div>
      </section>
    );
  }

  // Default variant - Clean balanced grid
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <Link
          href={`/news/${slug}/`}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          More →
        </Link>
      </div>
      
      {/* Simple 3-column grid with consistent layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <div key={article.id}>
            <ArticleCard
              article={article}
              variant="default"
              showImage={true}
              showExcerpt={false}
              showAuthor={false}
              showCategory={false}
            />
          </div>
        ))}
      </div>
      
      {/* Additional text-only articles below */}
      {articles.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 mt-6 pt-6 border-t border-gray-200">
          {articles.slice(3, 6).map((article) => {
            const date = new Date(article.date);
            const url = `/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${article.slug}/`;
            
            return (
              <div key={article.id}>
                <h3 className="text-sm font-medium leading-tight">
                  <Link href={url} className="hover:text-gray-600">
                    {article.title}
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}