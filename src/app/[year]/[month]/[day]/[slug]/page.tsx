import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ServerProxyImage from '@/components/common/ServerProxyImage';
import Link from 'next/link';
import { format } from 'date-fns';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/common/BackToTop';
import NewsArticleSchema from '@/components/seo/NewsArticleSchema';
import dynamic from 'next/dynamic';
import { InArticleAd, ResponsiveAd } from '@/components/ads/GoogleAdsense';
import { ADSENSE_CONFIG, shouldShowAds } from '@/config/adsense';
import { getImageUrl } from '@/lib/utils/image-url-helper';

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

// Dynamic rendering with aggressive caching for news
export const revalidate = 60; // 1 minute revalidation for breaking news
export const dynamicParams = true; // Allow dynamic params for new articles
// Removed edge runtime - causing client-side errors

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

// Optimized data fetching with edge caching
async function getArticleData(slug: string) {
  try {
    // Use standard query - AIOSEO fields are causing errors
    const articleData = await fetchGraphQLCached(
      GET_POST_BY_SLUG, 
      { slug }, 
      { ttl: 60 } // 1 minute cache for breaking news
    );
    
    const article = articleData?.postBy || null;
    return { article };
  } catch (error) {
    console.error('Error fetching article data:', error);
    return { article: null };
  }
}


// Enhanced content renderer with performance optimizations
function FastContentRenderer({ content }: { content: string }) {
  // Use CSS classes instead of styled-jsx for server components
  const processedContent = content
    // Add CSS classes instead of inline styles
    .replace(/<p>/g, '<p class="article-paragraph">')
    .replace(/<li>/g, '<li class="article-list-item">')
    .replace(/<h2>/g, '<h2 class="article-h2">')
    .replace(/<h3>/g, '<h3 class="article-h3">')
    .replace(/<h4>/g, '<h4 class="article-h4">')
    // Add drop cap to first paragraph with CSS class
    .replace(
      /<p class="article-paragraph">([A-Z])/,
      '<p class="article-paragraph first-paragraph"><span class="drop-cap">$1</span>'
    )
    // Optimize images for lazy loading (except the first one which should be priority)
    .replace(/<img/g, '<img loading="lazy" decoding="async"')
    // Make first image priority
    .replace(/(<img[^>]*?)loading="lazy"([^>]*?>)/, '$1loading="eager" fetchpriority="high"$2');
  
  return (
    <div 
      className="article-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, year, month, day } = await params;
  const { article } = await getArticleData(slug);
  
  if (!article) return { title: 'Article Not Found' };

  // Import location detection
  const { detectLocationFromContent } = await import('@/lib/utils/location-detector');

  // Use Yoast meta description if available, otherwise fall back to excerpt
  const description = 
    article.seo?.metaDesc ||
    article.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || 
    '';
  
  // Use Yoast SEO title if available, otherwise use article title
  // Remove any existing site name from Yoast title to prevent duplication with template
  const rawSeoTitle = article.seo?.title || article.title;
  const seoTitle = rawSeoTitle
    .replace(/ [\|\-–—] Report Focus News$/i, '')  // Remove common separators with site name at end
    .replace(/^Report Focus News [\|\-–—] /i, ''); // Remove site name at beginning
  
  // Use Yoast OpenGraph image if available, otherwise featured image
  const ogImageUrl = article.seo?.opengraphImage?.sourceUrl || article.featuredImage?.node?.sourceUrl;
  const ogImage = getImageUrl(ogImageUrl, { context: 'seo' });
  
  // Build canonical URL - use Yoast canonical if available
  const canonicalUrl = 
    article.seo?.canonical || 
    `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;

  // Detect location for enhanced regional SEO
  const category = article.categories?.edges?.[0]?.node?.name || '';
  const tags = article.tags?.edges?.map((tag: { node: { name: string } }) => tag.node.name) || [];
  const location = detectLocationFromContent(
    article.title || '',
    article.content || article.excerpt || '',
    category,
    tags
  );

  // Enhanced keywords with location
  const locationKeywords = location ? [
    location.country,
    ...(location.city ? [location.city] : []),
    'Southern Africa',
    `${location.country} news`,
    `${location.country} ${category.toLowerCase()}`
  ] : ['South Africa', 'Zimbabwe', 'Southern Africa'];

  // Include Yoast focus keywords in the keyword list  
  const focusKeyword = article.seo?.focuskw || '';
  const metaKeywords = article.seo?.metaKeywords ? article.seo.metaKeywords.split(',').map((k: string) => k.trim()) : [];
  const yoastKeywords = [focusKeyword, ...metaKeywords].filter(Boolean);
  
  const keywords = [
    ...yoastKeywords,
    ...tags.slice(0, 5),
    ...locationKeywords
  ].filter(Boolean).join(', ');
  
  return {
    title: seoTitle, // The template in layout.tsx will add " | Report Focus News"
    description,
    keywords,
    openGraph: {
      title: article.seo?.opengraphTitle?.replace(/ [\|\-–—] Report Focus News$/i, '').replace(/^Report Focus News [\|\-–—] /i, '') || seoTitle,
      description: article.seo?.opengraphDescription || description,
      type: (article.seo?.opengraphType as 'article' | 'website' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other' | 'book' | 'profile') || 'article',
      url: article.seo?.opengraphUrl || canonicalUrl,
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
      tags: article.tags?.edges?.map((tag: { node: { name: string } }) => tag.node.name) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo?.twitterTitle?.replace(/ [\|\-–—] Report Focus News$/i, '').replace(/^Report Focus News [\|\-–—] /i, '') || seoTitle,
      description: article.seo?.twitterDescription || description,
      images: [article.seo?.twitterImage?.sourceUrl ? getImageUrl(article.seo.twitterImage.sourceUrl, { context: 'seo' }) : ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      // Add geo-targeting meta tags for regional SEO
      ...(location ? {
        'geo.region': location.country === 'Zimbabwe' ? 'ZW' : 'ZA',
        'geo.placename': location.city || (location.country === 'Zimbabwe' ? 'Harare' : 'Johannesburg'),
        'geo.position': location.country === 'Zimbabwe' ? '-17.8292;31.0522' : '-26.2041;28.0473',
        'ICBM': location.country === 'Zimbabwe' ? '-17.8292, 31.0522' : '-26.2041, 28.0473',
      } : {
        'geo.region': 'ZA',
        'geo.placename': 'South Africa',
      }),
      'target_audience': location?.country || 'South Africa, Zimbabwe',
      'content_location': location ? `${location.city || location.country}` : 'Southern Africa',
    },
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

          {/* Author section - Simplified */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6">
            {post.author?.node && (
              <div>
                <span className="text-sm text-gray-500">By </span>
                <Link 
                  href={`/author/${post.author.node.slug}`}
                  className="font-bold text-gray-900 hover:text-red-600 transition-colors"
                >
                  {post.author.node.name}
                </Link>
              </div>
            )}
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>

          {/* Featured Image - Optimized for LCP */}
          <figure className="mb-8">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <ServerProxyImage
                src={post.featuredImage?.node?.sourceUrl || ''}
                alt={post.featuredImage?.node?.altText || post.title}
                fill
                className="object-cover"
                priority // Critical for LCP
                fetchPriority="high" // Browser hint for LCP
                data-critical="true" // Mark as critical for our optimizer
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
            
          {/* Ad after featured image */}
          {shouldShowAds() && (
            <div className="mb-8">
              <InArticleAd 
                dataAdClient={ADSENSE_CONFIG.publisherId}
                dataAdSlot={ADSENSE_CONFIG.adSlots.articleInContent}
              />
            </div>
          )}

          {/* Article Content - The actual LCP element */}
          <FastContentRenderer content={post.content || ''} />
        </article>
        
        {/* Bottom Article Ad */}
        {shouldShowAds() && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
            <ResponsiveAd 
              dataAdClient={ADSENSE_CONFIG.publisherId}
              dataAdSlot={ADSENSE_CONFIG.adSlots.articleBottom}
            />
          </div>
        )}

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