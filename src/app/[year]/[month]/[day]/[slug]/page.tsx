import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ServerProxyImage from '@/components/common/ServerProxyImage';
import Link from 'next/link';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/common/BackToTop';
import NewsArticleSchema from '@/components/seo/NewsArticleSchema';
import RevisionHistorySchema from '@/components/seo/RevisionHistorySchema';
import AuthorByline from '@/components/author/AuthorByline';
import AuthorSchema from '@/components/seo/AuthorSchema';
import UpdateTracker from '@/components/article/UpdateTracker';
import DevelopingStoryBanner from '@/components/article/DevelopingStoryBanner';
import CorrectionNotice from '@/components/article/CorrectionNotice';
import ArticleDates from '@/components/article/ArticleDates';
import BreakingNewsSchema from '@/components/seo/BreakingNewsSchema';
import GoogleNewsPublisherSchema from '@/components/seo/GoogleNewsPublisherSchema';
import { isBreakingNews } from '@/lib/utils/time-utils';
// Ads are now injected dynamically via ContentAdHydrator
import LazyAdUnit from '@/components/ads/LazyAdUnit';
import { ADSENSE_CONFIG, shouldShowAds } from '@/config/adsense';
import { getImageUrl } from '@/lib/utils/image-url-helper';

// Import server-side smart related articles
import ServerSmartRelated from '@/components/sections/ServerSmartRelated';

// Import print components
import PrintButton from '@/components/article/PrintButton';
import PrintableArticle from '@/components/article/PrintableArticle';

// Optimized caching for article pages
export const revalidate = 300; // 5 minutes for article pages (they don't change often)
export const dynamicParams = true; // Allow dynamic params for new articles
export const fetchCache = 'default-cache'; // Use default caching

// Import components directly for server components
import ShareButtons from '@/components/features/ShareButtons';
import ReadingProgress from '@/components/features/ReadingProgress';
import MobileShareBar from '@/components/features/MobileShareBar';
import ArticleContentWithAds from '@/components/article/ArticleContentWithAds';

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
      { ttl: 300 } // 5 minutes cache for articles
    );
    
    const article = articleData?.postBy || null;
    return { article };
  } catch (error) {
    console.error('Error fetching article data:', error);
    return { article: null };
  }
}


// Enhanced content renderer with professional typography
function FastContentRenderer({ content }: { content: string }) {
  // Add styles directly to HTML elements for larger font
  const processedContent = content
    // Add font size to all paragraphs
    .replace(/<p>/g, '<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1.5rem; color: #374151;">')
    // Add font size to lists
    .replace(/<li>/g, '<li style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 0.75rem;">')
    // Style headings
    .replace(/<h2>/g, '<h2 style="font-size: 1.875rem; font-weight: bold; margin-top: 3rem; margin-bottom: 1.5rem;">')
    .replace(/<h3>/g, '<h3 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem;">')
    // Add drop cap to first paragraph
    .replace(
      /<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1.5rem; color: #374151;">([A-Z])/,
      '<p class="first-paragraph" style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1.5rem; color: #374151;"><span class="drop-cap">$1</span>'
    );
  
  return processedContent;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, year, month, day } = await params;
  const { article } = await getArticleData(slug);
  
  if (!article) return { title: 'Article Not Found' };

  // Import location detection and meta description generator
  const { detectLocationFromContent } = await import('@/lib/utils/location-detector');
  const { generateMetaDescription, optimizeMetaDescription } = await import('@/lib/utils/meta-description');

  // Use Yoast meta description if available, otherwise generate from content
  const yoastDescription = optimizeMetaDescription(article.seo?.metaDesc);
  const description = 
    yoastDescription ||
    generateMetaDescription(
      article.content,
      article.title,
      article.excerpt
    );
  
  // Use Yoast SEO title if available, otherwise use article title
  // Remove any existing site name from Yoast title to prevent duplication with template
  const rawSeoTitle = article.seo?.title || article.title;
  const seoTitle = rawSeoTitle
    .replace(/ [\|\-–—] Report Focus News$/i, '')  // Remove common separators with site name at end
    .replace(/^Report Focus News [\|\-–—] /i, ''); // Remove site name at beginning
  
  // Use Yoast OpenGraph image if available, otherwise featured image
  // Ensure image is at least 1200px wide for Google Discover
  const ogImageUrl = article.seo?.opengraphImage?.sourceUrl || article.featuredImage?.node?.sourceUrl;
  const ogImage = getImageUrl(ogImageUrl, { 
    context: 'seo'
  });
  
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
      images: [article.seo?.twitterImage?.sourceUrl ? getImageUrl(article.seo.twitterImage.sourceUrl, { context: 'twitter' }) : getImageUrl(ogImageUrl, { context: 'twitter' })],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': canonicalUrl,
        'en-ZA': canonicalUrl,
        'en-ZW': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large', // Critical for Google Discover
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
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
      // Google News specific meta tags
      'news_keywords': [focusKeyword, ...metaKeywords, ...tags.slice(0, 3)].filter(Boolean).join(', '),
      'article:author': article.author?.node?.name || 'Report Focus News',
      'article:published_time': article.date,
      'article:modified_time': article.modified || article.date,
      'article:section': article.categories?.edges?.[0]?.node?.name || 'News',
      'article:tag': article.tags?.edges?.map((tag: { node: { name: string } }) => tag.node.name).slice(0, 5).join(', '),
      'syndication-source': 'https://reportfocusnews.com',
      'original-source': canonicalUrl,
      // AMP page reference (implement when AMP is available)
      // 'amphtml': `${canonicalUrl}amp/`,
      ...(isBreakingNews(article.date) && { 'standout': 'https://reportfocusnews.com' }),
      'publication_date': article.date,
      'op:markup_version': 'v1.0', // Facebook Instant Articles
      'twitter:label1': 'Reading time',
      'twitter:data1': `${Math.ceil((article.content?.split(' ').length || 0) / 200)} min read`,
      'twitter:label2': 'Category',
      'twitter:data2': article.categories?.edges?.[0]?.node?.name || 'News',
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

  // Prepare article data for PrintableArticle
  const articleData = {
    title: post.title,
    content: post.content || '',
    author: post.author?.node ? { name: post.author.node.name } : undefined,
    publishedDate: post.date,
    lastModified: post.modified,
    categories: post.categories?.edges?.map((edge: any) => edge.node.name) || []
  };

  return (
    <>
      <GoogleNewsPublisherSchema />
      <NewsArticleSchema article={post} url={canonicalUrl} />
      <BreakingNewsSchema 
        article={{
          title: post.title,
          date: post.date,
          modified: post.modified,
          url: canonicalUrl,
          excerpt: post.excerpt,
          author: post.author
        }} 
      />
      {post.author?.node && (
        <AuthorSchema 
          authorName={post.author.node.name} 
          authorSlug={post.author.node.slug}
          authorDescription={post.author.node.description}
          authorAvatar={post.author.node.avatar?.url}
        />
      )}
      <RevisionHistorySchema 
        articleUrl={canonicalUrl}
        headline={post.title}
        publishDate={post.date}
        modifiedDate={post.modified}
        revisions={[]} // This would come from custom fields in WordPress
      />
      
      <div className="no-print">
        <HeaderWrapper />
        <ReadingProgress />
      </div>
      
      <main className="min-h-screen bg-white">
        <PrintableArticle article={articleData}>
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

          {/* Enhanced Date Display with Responsive Layout */}
          <div className="pb-4 md:pb-6 border-b border-gray-200">
            {/* Responsive metadata container */}
            <div className="flex flex-col gap-3">
              {/* Date, reading time and author row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <ArticleDates 
                    publishDate={post.date} 
                    modifiedDate={post.modified}
                    variant="compact"
                    showRelativeTime={true}
                  />
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
                
                {/* Author byline - aligned naturally on desktop */}
                {post.author?.node && (
                  <AuthorByline 
                    authorName={post.author.node.name}
                    authorSlug={post.author.node.slug}
                    authorDescription={post.author.node.description}
                    authorAvatar={post.author.node.avatar?.url}
                    variant="compact"
                    showAvatar={false}
                    className="text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Share buttons section - optimized for mobile */}
          <div className="py-4 border-b border-gray-200 no-print">
            <div className="flex items-center justify-between gap-2">
              <ShareButtons url={canonicalUrl} title={post.title} />
              <PrintButton articleTitle={post.title} className="ml-auto" />
            </div>
          </div>

          {/* Breaking News / Developing Story Banner */}
          <div className="no-print">
            <DevelopingStoryBanner 
              isBreaking={isBreakingNews(post.date)}
              lastUpdate={post.modified || post.date}
              updateCount={post.modified && post.modified !== post.date ? 1 : 0}
            />
            
            {/* Article Update Tracker */}
            <UpdateTracker 
              publishDate={post.date}
              modifiedDate={post.modified}
              updates={[]} // You can populate this from custom fields if available
            />
            
            {/* Corrections Notice */}
            <CorrectionNotice 
              corrections={[]} // You can populate this from custom fields if available
            />
          </div>

          {/* Featured Image - Server-rendered with srcset for Google indexing */}
          <figure className="mb-8">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <ServerProxyImage
                src={post.featuredImage?.node?.sourceUrl || ''}
                alt={post.featuredImage?.node?.altText || post.title}
                fill
                className="object-cover"
                priority // Featured image should load with priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 1200px"
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
            
          {/* Article Content with intelligent ad placement */}
          {shouldShowAds() ? (
            <ArticleContentWithAds 
              content={FastContentRenderer({ content: post.content || '' })}
              publisherId={ADSENSE_CONFIG.publisherId}
              adSlot={ADSENSE_CONFIG.adSlots.articleInContent}
            />
          ) : (
            <div 
              className="article-content max-w-[720px] mx-auto font-serif text-gray-800"
              dangerouslySetInnerHTML={{ __html: FastContentRenderer({ content: post.content || '' }) }}
            />
          )}
          
          {/* Article Tags */}
          {post.tags?.edges?.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 no-print">
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-600 mt-1">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.edges.map((edge: any) => (
                    <Link
                      key={edge.node.id}
                      href={`/tag/${edge.node.slug}/`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-red-600 rounded-full text-sm font-medium transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      {edge.node.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          </article>
        </PrintableArticle>
        
        {/* Bottom Article Ad - Lazy loaded */}
        {shouldShowAds() && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8 no-print">
            <LazyAdUnit
              adType="ResponsiveAd"
              dataAdClient={ADSENSE_CONFIG.publisherId}
              dataAdSlot={ADSENSE_CONFIG.adSlots.articleBottom}
              rootMargin="300px"
            />
          </div>
        )}

        
        {/* Smart Related Articles with improved algorithm */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
          <Suspense fallback={
            <div className="mt-12 pt-12 border-t-2 border-gray-200">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                  Related Articles
                </h2>
                <div className="w-20 h-1 bg-red-700"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[16/9] rounded-lg mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          }>
            <ServerSmartRelated currentPost={post} variant="mixed" />
          </Suspense>
        </section>
      </main>
      
      <div className="no-print">
        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>
        <MobileShareBar url={canonicalUrl} title={post.title} />
      </div>

    </>
  );
}