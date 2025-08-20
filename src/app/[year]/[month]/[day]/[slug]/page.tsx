import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fetchGraphQLCached } from '@/lib/graphql-cache';
import { GET_POST_BY_SLUG, GET_RECENT_POSTS } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import { WPPost } from '@/types/wordpress';
import BackToTop from '@/components/BackToTop';
import ArticleCard from '@/components/ArticleCard';
import NewsArticleSchema from '@/components/NewsArticleSchema';

// Static revalidation for news - aggressive caching
export const revalidate = 60;
export const dynamicParams = true;

// Import components directly for server components
import ShareButtons from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';
import MobileShareBar from '@/components/MobileShareBar';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

// Fetch article with related posts
async function getArticleData(slug: string) {
  try {
    // Fetch article and recent posts in parallel
    const [articleData, recentData] = await Promise.all([
      fetchGraphQLCached(GET_POST_BY_SLUG, { slug }, { ttl: 60 }),
      fetchGraphQLCached(GET_RECENT_POSTS, { first: 7 }, { ttl: 300 })
    ]);
    
    const article = articleData?.postBy || null;
    
    // Filter out current article from recent posts to use as related
    const related = recentData?.posts?.nodes?.filter((post: any) => post.slug !== slug).slice(0, 6) || [];
    
    return { article, related };
  } catch (error) {
    console.error('Error fetching article data:', error);
    return { article: null, related: [] };
  }
}


// Enhanced content renderer with better typography
function FastContentRenderer({ content }: { content: string }) {
  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-red-600 prose-blockquote:text-gray-600 prose-a:text-red-600 hover:prose-a:text-red-700 prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticleData(slug);
  
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Report Focus News`,
    description: article.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
  };
}

export default async function FastArticlePage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const { article: post, related } = await getArticleData(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;
  
  // Pre-calculate reading time
  const wordCount = post.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <NewsArticleSchema article={post} url={canonicalUrl} />
      <ReadingProgress />
      
      <HeaderWrapper />
      
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
            {post.categories?.edges?.[0]?.node && (
              <>
                <Link 
                  href={`/news/${post.categories.edges[0].node.slug}/`}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  {post.categories.edges[0].node.name}
                </Link>
                <span className="text-gray-400">•</span>
              </>
            )}
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author section */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-200">
            {post.author?.node && (
              <div className="flex items-center gap-3">
                {post.author.node.avatar?.url && (
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {post.author.node.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Staff Reporter
                  </div>
                </div>
              </div>
            )}
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <figure className="mb-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  quality={95}
                />
              </div>
              {post.featuredImage.node.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 text-center">
                  {post.featuredImage.node.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Content - The actual LCP element */}
          <FastContentRenderer content={post.content || ''} />

          {/* Tags - Non-critical, can load later */}
          {post.tags?.edges && post.tags.edges.length > 0 && (
            <Suspense fallback={null}>
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.edges.map((tag: any) => (
                    <Link
                      key={tag.node.id}
                      href={`/tag/${tag.node.slug}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                    >
                      {tag.node.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Suspense>
          )}
        </article>

        {/* Related Posts Section */}
        {related && related.length > 0 && (
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
        )}
      </main>
      
      <Footer />
      <BackToTop />
      <MobileShareBar url={canonicalUrl} title={post.title} />
    </>
  );
}