import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import ProxyImage from '@/components/common/ProxyImage';
import Link from 'next/link';
import { format } from 'date-fns';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import { GET_POST_WITH_SEO } from '@/lib/queries/posts-with-seo';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/common/BackToTop';
import NewsArticleSchema from '@/components/seo/NewsArticleSchema';
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const RelatedPostsSection = dynamic(() => import('@/components/sections/RelatedPostsSection'), {
  loading: () => (
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
  ),
});

// Optimized caching for news articles
export const revalidate = 300; // 5 minutes - balance between freshness and performance
export const dynamicParams = true;
export const fetchCache = 'default-cache';

// Import components directly for server components
import ShareButtons from '@/components/features/ShareButtons';
import ReadingProgress from '@/components/features/ReadingProgress';
import MobileShareBar from '@/components/features/MobileShareBar';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

// Optimized data fetching - article only first, related posts lazy loaded
async function getArticleData(slug: string) {
  try {
    // Try to fetch with SEO data first
    let articleData;
    try {
      articleData = await fetchGraphQLCached(
        GET_POST_WITH_SEO, 
        { slug }, 
        { ttl: 300 } // 5 minute cache for articles
      );
    } catch (seoError) {
      // Fallback to regular query if SEO fields not available
      console.log('SEO fields not available, using standard query');
      articleData = await fetchGraphQLCached(
        GET_POST_BY_SLUG, 
        { slug }, 
        { ttl: 300 }
      );
    }
    
    const article = articleData?.postBy || null;
    return { article };
  } catch (error) {
    console.error('Error fetching article data:', error);
    return { article: null };
  }
}


// Enhanced content renderer with professional typography
function FastContentRenderer({ content }: { content: string }) {
  // Add drop cap to first paragraph
  const processedContent = content.replace(
    /<p>([A-Z])/,
    '<p class="first-paragraph"><span class="drop-cap">$1</span>'
  );
  
  return (
    <div 
      className="max-w-[680px] mx-auto font-serif text-lg md:text-[1.125rem] lg:text-xl leading-[1.8] text-gray-800 prose prose-headings:font-sans prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-p:text-gray-800 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:my-8 prose-a:text-red-600 prose-a:underline hover:prose-a:text-red-700 prose-img:rounded-lg prose-img:my-8 prose-li:mb-2 prose-strong:font-bold prose-strong:text-gray-900"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, year, month, day } = await params;
  const { article } = await getArticleData(slug);
  
  if (!article) return { title: 'Article Not Found' };

  // Use AIOSEO meta description if available, otherwise fall back to excerpt
  const description = 
    article.seo?.metaDesc || 
    article.seo?.opengraphDescription ||
    article.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || 
    '';
  
  // Use AIOSEO title if available
  const seoTitle = article.seo?.title || article.title;
  
  // Use AIOSEO OG image if available
  const ogImage = 
    article.seo?.opengraphImage?.sourceUrl ||
    article.featuredImage?.node?.sourceUrl || 
    'https://reportfocusnews.com/og-image.jpg';
  
  // Use AIOSEO canonical if available
  const canonicalUrl = 
    article.seo?.canonical || 
    `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;

  return {
    title: seoTitle.includes('Report Focus') ? seoTitle : `${seoTitle} | Report Focus News`,
    description,
    keywords: article.seo?.metaKeywords || article.tags?.edges?.map((tag: any) => tag.node.name).join(', ') || '',
    openGraph: {
      title: article.seo?.opengraphTitle || seoTitle,
      description: article.seo?.opengraphDescription || description,
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: article.featuredImage?.node?.mediaDetails?.width || 1200,
          height: article.featuredImage?.node?.mediaDetails?.height || 630,
          alt: article.featuredImage?.node?.altText || article.title,
        }
      ],
      publishedTime: article.date,
      modifiedTime: article.modified || article.date,
      authors: article.author?.node?.name ? [article.author.node.name] : ['Report Focus News'],
      section: article.categories?.edges?.[0]?.node?.name || 'News',
      tags: article.tags?.edges?.map((tag: any) => tag.node.name) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo?.twitterTitle || article.seo?.opengraphTitle || seoTitle,
      description: article.seo?.twitterDescription || article.seo?.opengraphDescription || description,
      images: [article.seo?.twitterImage?.sourceUrl || ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: article.tags?.edges?.map((tag: any) => tag.node.name).join(', ') || '',
  };
}

export default async function FastArticlePage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const { article: post } = await getArticleData(slug);

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
      
      <HeaderWrapper />
      <ReadingProgress />
      
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Category Badge - NYTimes Style */}
          {post.categories?.edges?.[0]?.node && (
            <div className="mb-4">
              <Link 
                href={`/news/${post.categories.edges[0].node.slug}/`}
                className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors border-b-2 border-red-600 pb-0.5"
              >
                {post.categories.edges[0].node.name}
              </Link>
            </div>
          )}

          {/* Title - Professional Typography */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta Information Bar */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <time dateTime={post.date} className="font-medium">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </span>
            {post.modified && post.modified !== post.date && (
              <>
                <span className="text-gray-300">•</span>
                <span className="italic">
                  Updated {format(new Date(post.modified), 'MMM d, yyyy')}
                </span>
              </>
            )}
          </div>

          {/* Author section - Professional Style */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6">
            {post.author?.node && (
              <div className="flex items-center gap-4">
                {post.author.node.avatar?.url && (
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name}
                    width={48}
                    height={48}
                    className="rounded-full border border-gray-200"
                    loading="lazy"
                  />
                )}
                <div>
                  <div className="text-sm text-gray-500 mb-1">By</div>
                  <Link 
                    href={`/author/${post.author.node.slug}`}
                    className="font-bold text-gray-900 hover:text-red-600 transition-colors"
                  >
                    {post.author.node.name}
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">
                    Staff Reporter
                  </div>
                </div>
              </div>
            )}
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>

          {/* Featured Image - Always show with fallback */}
          <figure className="mb-8">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <ProxyImage
                src={post.featuredImage?.node?.sourceUrl || ''}
                alt={post.featuredImage?.node?.altText || post.title}
                fill
                className="object-cover"
              />
              </div>
              {post.featuredImage?.node?.caption && (
                <figcaption 
                  className="mt-2 text-sm text-gray-600 text-center"
                  dangerouslySetInnerHTML={{ 
                    __html: post.featuredImage.node.caption.replace(/<\/?p>/g, '') 
                  }}
                />
              )}
            </figure>

          {/* Article Content - The actual LCP element */}
          <FastContentRenderer content={post.content || ''} />

          {/* Tags - Non-critical, can load later */}
          {post.tags?.edges && post.tags.edges.length > 0 && (
            <Suspense fallback={null}>
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.edges.map((tag: { node: { id: string; name: string; slug: string } }) => (
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

        {/* Lazy-loaded Related Posts */}
        <RelatedPostsSection slug={slug} />
      </main>
      
      <Suspense fallback={<div className="h-96 bg-gray-50" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
      <MobileShareBar url={canonicalUrl} title={post.title} />

    </>
  );
}