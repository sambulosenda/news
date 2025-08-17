import ArticleCard from './ArticleCard';
import { WPPost } from '@/types/wordpress';

interface HeroSectionProps {
  mainArticle: WPPost;
  sideArticles?: WPPost[];
}

export default function HeroSection({ mainArticle, sideArticles = [] }: HeroSectionProps) {
  return (
    <section className="container-wide section-spacing">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Hero Article */}
        <div className="lg:col-span-2">
          <ArticleCard
            article={mainArticle}
            variant="hero"
            showImage={true}
            showExcerpt={true}
            showAuthor={true}
            showCategory={true}
          />
        </div>

        {/* Side Articles */}
        {sideArticles.length > 0 && (
          <div className="space-y-8">
            {sideArticles.slice(0, 2).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="featured"
                showImage={true}
                showExcerpt={false}
                showAuthor={false}
                showCategory={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Additional featured stories below hero */}
      {sideArticles.length > 2 && (
        <div className="mt-12 pt-12 border-t-2 border-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sideArticles.slice(2, 5).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
                showImage={false}
                showExcerpt={true}
                showAuthor={false}
                showCategory={true}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}