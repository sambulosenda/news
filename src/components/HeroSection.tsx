import Link from 'next/link';
import Image from 'next/image';
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
  const mainCategory = mainArticle.categories?.edges?.[0]?.node;

  return (
    <section className="bg-white border-b border-gray-300">
      <div className="container-wide py-4 lg:py-6">
        
        {/* Clean Professional Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Story - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <article>
              {/* Main Image */}
              {mainArticle.featuredImage?.node && (
                <Link href={mainPostUrl} className="block mb-4 group">
                  <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                    <Image
                      src={mainArticle.featuredImage.node.sourceUrl}
                      alt={mainArticle.featuredImage.node.altText || mainArticle.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    />
                  </div>
                </Link>
              )}
              
              {/* Content */}
              <div>
                {/* Category */}
                {mainCategory && (
                  <Link
                    href={`/news/${mainCategory.slug}/`}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 uppercase tracking-wide"
                  >
                    {mainCategory.name}
                  </Link>
                )}
                
                {/* Headline */}
                <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mt-2 mb-3">
                  <Link href={mainPostUrl} className="hover:text-gray-700">
                    {mainArticle.title}
                  </Link>
                </h1>
                
                {/* Excerpt */}
                {mainArticle.excerpt && (
                  <div
                    className="text-lg text-gray-600 leading-relaxed mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: mainArticle.excerpt }}
                  />
                )}
                
                {/* Byline */}
                <div className="text-sm text-gray-500">
                  {mainArticle.author?.node && (
                    <span className="font-medium text-gray-700">
                      By {mainArticle.author.node.name}
                    </span>
                  )}
                  {mainArticle.author?.node && <span className="mx-2">•</span>}
                  <time dateTime={mainArticle.date}>
                    {format(postDate, 'MMMM d, yyyy')}
                  </time>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Stories */}
          <div className="lg:col-span-1">
            <div className="lg:border-l lg:pl-8 border-gray-300">
              {/* Top Stories Header */}
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-2 border-b border-gray-300">
                Top Stories
              </h2>
              
              {/* Side Articles List */}
              <div className="space-y-4">
                {sideArticles.slice(0, 5).map((article, index) => {
                  const sidePostDate = new Date(article.date);
                  const sidePostUrl = `/${format(sidePostDate, 'yyyy')}/${format(sidePostDate, 'MM')}/${format(sidePostDate, 'dd')}/${article.slug}/`;
                  const sideCategory = article.categories?.edges?.[0]?.node;

                  return (
                    <article 
                      key={article.id} 
                      className={`${index > 0 ? 'pt-4 border-t border-gray-200' : ''}`}
                    >
                      {/* Show image only for first item */}
                      {index === 0 && article.featuredImage?.node && (
                        <Link href={sidePostUrl} className="block mb-3">
                          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                            <Image
                              src={article.featuredImage.node.sourceUrl}
                              alt={article.featuredImage.node.altText || article.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                        </Link>
                      )}
                      
                      {/* Category */}
                      {sideCategory && (
                        <Link
                          href={`/news/${sideCategory.slug}/`}
                          className="text-xs font-semibold text-red-600 hover:text-red-700 uppercase tracking-wide"
                        >
                          {sideCategory.name}
                        </Link>
                      )}
                      
                      {/* Title */}
                      <h3 className={`font-serif font-bold leading-tight mt-1 ${index === 0 ? 'text-xl' : 'text-base'}`}>
                        <Link href={sidePostUrl} className="hover:text-gray-700">
                          {article.title}
                        </Link>
                      </h3>
                      
                      {/* Show date for smaller items */}
                      {index > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {format(sidePostDate, 'MMM d, yyyy')}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* More News Link */}
              {sideArticles.length > 5 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link 
                    href="/news" 
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    More News →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}