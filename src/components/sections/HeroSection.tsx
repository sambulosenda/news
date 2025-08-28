import Link from 'next/link';
import ProxyImage from '@/components/common/ProxyImage';
import { format } from 'date-fns';
import { WPPost } from '@/types/wordpress';

interface HeroSectionProps {
  mainArticle: WPPost;
  sideArticles?: WPPost[];
}

export default function HeroSection({ mainArticle, sideArticles = [] }: HeroSectionProps) {
  if (!mainArticle) return null;

  const postDate = new Date(mainArticle.date);
  const mainPostUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${mainArticle.slug}/`;

  return (
    <section className="bg-white border-b-2 border-gray-200">
      <div className="container-wide py-6">
        {/* Main Hero Section */}
        <div className="mb-8">
          {/* Main Headline - Full Width at Top */}
          <h1 className="mb-6">
            <Link href={mainPostUrl} className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black hover:text-gray-700 transition-colors block">
              {mainArticle.title}
            </Link>
          </h1>

          {/* Image and Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Main Image */}
            <div className="lg:col-span-1">
              {mainArticle.featuredImage?.node && (
                <Link href={mainPostUrl} className="block relative group">
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <ProxyImage
                      src={mainArticle.featuredImage.node.sourceUrl}
                      alt={mainArticle.featuredImage.node.altText || mainArticle.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Play button overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-blue-600 text-white px-3 py-1.5 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span className="text-xs font-bold">
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Right: Excerpt and Related Stories */}
            <div className="lg:col-span-1">
              {/* Main Article Excerpt */}
              <div className="mb-6">
                {mainArticle.excerpt && (
                  <div
                    className="text-lg text-gray-700 leading-relaxed mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: mainArticle.excerpt }}
                  />
                )}
                
              </div>

              {/* Secondary Headline */}
              {sideArticles[0] && (() => {
                const secondaryArticle = sideArticles[0];
                const secondaryDate = new Date(secondaryArticle.date);
                const secondaryUrl = `/${format(secondaryDate, 'yyyy')}/${format(secondaryDate, 'MM')}/${format(secondaryDate, 'dd')}/${secondaryArticle.slug}/`;
                
                return (
                  <div className="mb-6">
                    <h2 className="font-sans text-xl font-bold leading-tight text-gray-900">
                      <Link href={secondaryUrl} className="hover:text-blue-600 transition-colors">
                        {secondaryArticle.title}
                      </Link>
                    </h2>
                  </div>
                );
              })()}

              {/* Related Stories */}
              <div className="space-y-4">
                {sideArticles.slice(1, 4).map((article) => {
                  const sidePostDate = new Date(article.date);
                  const sidePostUrl = `/${format(sidePostDate, 'yyyy')}/${format(sidePostDate, 'MM')}/${format(sidePostDate, 'dd')}/${article.slug}/`;

                  return (
                    <article key={article.id} className="group">
                      <h3 className="font-sans text-lg font-bold leading-snug text-gray-900 mb-2">
                        <Link 
                          href={sidePostUrl} 
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}