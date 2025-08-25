import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { WPPost } from '@/types/wordpress';

interface RelatedArticlesProps {
  articles: WPPost[];
  currentArticleId?: string;
  title?: string;
}

export default function RelatedArticles({ 
  articles, 
  currentArticleId,
  title = "Related Articles" 
}: RelatedArticlesProps) {
  // Filter out current article and limit to 6
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 6);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="my-12 py-8 border-t-2 border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => {
          const postDate = new Date(article.date);
          const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${article.slug}/`;
          
          return (
            <article key={article.id} className="group">
              {article.featuredImage?.node && (
                <Link href={postUrl}>
                  <div className="relative aspect-[16/10] mb-3 overflow-hidden">
                    <Image
                      src={article.featuredImage.node.sourceUrl}
                      alt={article.featuredImage.node.altText || article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </Link>
              )}
              
              <div>
                <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2">
                  <Link 
                    href={postUrl} 
                    className="hover:underline group-hover:text-red-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                {article.excerpt && (
                  <div
                    className="text-sm text-gray-600 mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerpt }}
                  />
                )}
                
                <p className="text-xs text-gray-500">
                  {format(postDate, 'MMM d, yyyy')}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* SEO-friendly internal linking section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-sm mb-2">Explore More Topics</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/news/politics/" className="text-sm text-blue-600 hover:underline">Politics</Link>
          <span className="text-gray-400">•</span>
          <Link href="/news/business/" className="text-sm text-blue-600 hover:underline">Business</Link>
          <span className="text-gray-400">•</span>
          <Link href="/news/crime/" className="text-sm text-blue-600 hover:underline">Crime</Link>
          <span className="text-gray-400">•</span>
          <Link href="/news/sports/" className="text-sm text-blue-600 hover:underline">Sports</Link>
          <span className="text-gray-400">•</span>
          <Link href="/faq/load-shedding" className="text-sm text-blue-600 hover:underline">Load Shedding</Link>
          <span className="text-gray-400">•</span>
          <Link href="/faq/elections" className="text-sm text-blue-600 hover:underline">Elections</Link>
        </div>
      </div>
    </section>
  );
}