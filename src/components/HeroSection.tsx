import ArticleCard from './ArticleCard';
import { WPPost } from '@/types/wordpress';

interface HeroSectionProps {
  mainArticle: WPPost;
  sideArticles?: WPPost[];
}

export default function HeroSection({ mainArticle, sideArticles = [] }: HeroSectionProps) {
  return (
    <section className="border-b-2 border-gray-900">
      <div className="container-wide py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Hero Article - Takes up 2/3 on desktop */}
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

          {/* Side Articles - Takes up 1/3 on desktop */}
          {sideArticles.length > 0 && (
            <div className="border-t-4 lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-6">
                {sideArticles.slice(0, 3).map((article, index) => (
                  <article key={article.id} className={index > 0 ? 'pt-6 border-t border-gray-200' : ''}>
                    <ArticleCard
                      article={article}
                      variant="compact"
                      showImage={false}
                      showExcerpt={false}
                      showAuthor={false}
                      showCategory={true}
                    />
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional featured stories below hero - More subtle */}
        {sideArticles.length > 3 && (
          <div className="mt-8 pt-8 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sideArticles.slice(3, 7).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="compact"
                  showImage={false}
                  showExcerpt={false}
                  showAuthor={false}
                  showCategory={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}