import React from 'react';
import { Metadata } from 'next';
import { fetchGraphQLDirect } from '@/lib/api/fetch-direct';
import { GET_HOMEPAGE_DATA_SIMPLE } from '@/lib/queries/homepage-simple';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/features/BreakingNewsBanner';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import ArticleCard from '@/components/cards/ArticleCard';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import { WPPost, WPCategory } from '@/types/wordpress';
import { BannerAd, SidebarAd, AdUnit } from '@/components/ads/GoogleAdsense';
import { ADSENSE_CONFIG, shouldShowAds } from '@/config/adsense';
import ServerProxyImage from '@/components/common/ServerProxyImage';
import { formatDistanceToNow } from 'date-fns';

// Aggressive revalidation for news homepage - 10 seconds for breaking news
export const revalidate = 10;

export const metadata: Metadata = {
  title: {
    absolute: 'Report Focus News - South Africa & Zimbabwe Breaking News'
  },
  description: 'Breaking news from South Africa and Zimbabwe. Latest updates on politics, business, economy, sports, and entertainment. Your trusted source for Southern African news coverage.',
  keywords: 'South Africa news, Zimbabwe news, breaking news, SA politics, Zimbabwe politics, JSE news, business news Africa, Johannesburg news, Harare news, Southern Africa, SADC news, ANC, ZANU-PF, Springboks, Proteas, Report Focus News',
  alternates: {
    canonical: 'https://reportfocusnews.com',
  },
  openGraph: {
    title: 'Report Focus News - Breaking News from South Africa & Zimbabwe',
    description: 'Your trusted source for South African and Zimbabwe news. Politics, business, sports, entertainment, and more.',
    type: 'website',
    url: 'https://reportfocusnews.com',
    siteName: 'Report Focus News',
    locale: 'en_ZA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Report Focus News - South Africa & Zimbabwe News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@reportfocusnews',
    title: 'Report Focus News - SA & Zimbabwe Breaking News',
    description: 'Latest news from South Africa and Zimbabwe. Politics, business, sports, and more.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'geo.region': 'ZA-GP;ZW-HA',
    'geo.country': 'ZA;ZW',
    'geo.placename': 'Johannesburg;Harare',
    'content:type': 'news',
    'content:region': 'Southern Africa',
    'language': 'en-ZA',
    'audience': 'general',
    'distribution': 'global',
    'news_keywords': 'South Africa, Zimbabwe, breaking news, politics, business, economy',
  },
};

interface CategoryEdge {
  node: WPCategory;
}

interface PostEdge {
  node: WPPost;
}

async function getHomePageData() {
  // Use direct fetch to bypass Apollo issues
  const homepageData = await fetchGraphQLDirect(GET_HOMEPAGE_DATA_SIMPLE);
  
  // Check if we got data
  if (!homepageData) {
    console.error('Failed to fetch homepage data - API might be down or blocking requests');
    // Return empty data structure
    return {
      heroPost: null,
      featuredPosts: [],
      recentPosts: [],
      breakingNews: [],
      categories: [],
      categorySections: [],
      popularPosts: [],
      error: true
    };
  }

  // Extract data from the optimized query
  const heroPost = homepageData?.heroPost?.edges?.[0]?.node;
  const featuredPosts = homepageData?.featuredPosts?.edges?.map((e: PostEdge) => e.node) || [];
  const recentPosts = homepageData?.recentPosts?.edges?.map((e: PostEdge) => e.node) || [];
  const breakingNews = homepageData?.breakingNews?.edges?.map((e: PostEdge) => e.node) || [];
  const categories = homepageData?.categories?.edges?.map((e: CategoryEdge) => e.node) || [];
  const popularPosts = homepageData?.popularPosts?.edges?.map((e: PostEdge) => e.node) || [];
  
  // Category sections - expanded to include all main categories
  const categorySections = [
    {
      category: { name: 'World', slug: 'world', id: 'world' },
      posts: homepageData?.worldPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
    {
      category: { name: 'Africa', slug: 'africa', id: 'africa' },
      posts: homepageData?.africaPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
    {
      category: { name: 'Politics', slug: 'politics', id: 'politics' },
      posts: homepageData?.politicsPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
    {
      category: { name: 'Business', slug: 'business', id: 'business' },
      posts: homepageData?.businessPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
    {
      category: { name: 'Sports', slug: 'sports', id: 'sports' },
      posts: homepageData?.sportsPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
    {
      category: { name: 'Entertainment', slug: 'entertainment', id: 'entertainment' },
      posts: homepageData?.entertainmentPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
    {
      category: { name: 'Opinion', slug: 'opinion', id: 'opinion' },
      posts: homepageData?.opinionPosts?.edges?.map((e: PostEdge) => e.node) || [],
    },
  ];

  return {
    heroPost,
    featuredPosts,
    recentPosts,
    breakingNews,
    categories,
    categorySections,
    popularPosts,
  };
}


// Dynamic rendering for breaking news
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function HomePage() {
  const { 
    heroPost,
    featuredPosts,
    recentPosts,
    breakingNews,
    categorySections,
    popularPosts,
    error 
  } = await getHomePageData();

  // Use hero post or fall back to first recent post
  const mainHeroPost = heroPost || featuredPosts[0] || recentPosts[0];
  
  // Filter out the main hero post from all lists to avoid duplicates
  const filteredFeaturedPosts = featuredPosts.filter((post: WPPost) => post?.id !== mainHeroPost?.id);
  const filteredRecentPosts = recentPosts.filter((post: WPPost) => post?.id !== mainHeroPost?.id);
  
  // Use filtered featured posts for side heroes, or use filtered recent posts
  const sideHeroPosts = filteredFeaturedPosts.length > 0 
    ? filteredFeaturedPosts.slice(0, 7) 
    : filteredRecentPosts.slice(0, 7);
  
  // Get remaining posts for main feed, excluding hero and side posts
  const usedPostIds = new Set([
    mainHeroPost?.id,
    ...sideHeroPosts.map((p: WPPost) => p?.id)
  ].filter(Boolean));
  
  const mainFeedPosts = recentPosts
    .filter((post: WPPost) => !usedPostIds.has(post?.id))
    .slice(0, 10);

  // Format breaking news
  const formattedBreakingNews = breakingNews.map((post: WPPost) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
  }));

  return (
    <>
      <OrganizationSchema />
      <BreakingNewsBanner news={formattedBreakingNews} />
      <HeaderWrapper />
      
      <main className="bg-white">
        {/* Error Message */}
        {error && (
          <div className="container-wide py-12">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Unable to load news content. The news server might be temporarily unavailable. Please try refreshing the page in a few moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Hero Section */}
        {mainHeroPost && (
          <HeroSection 
            mainArticle={mainHeroPost} 
            sideArticles={sideHeroPosts}
          />
        )}
        
        {/* Top Banner Ad - Below Hero */}
        {shouldShowAds() && (
          <BannerAd 
            dataAdClient={ADSENSE_CONFIG.publisherId}
            dataAdSlot={ADSENSE_CONFIG.adSlots.homepageBanner}
          />
        )}

        {/* Main Content Area */}
        <div className="container-wide py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Column - 2/3 width */}
            <div className="lg:col-span-2">
              {/* Latest News Section */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 pb-2 mb-6 border-b border-gray-300">
                  Latest News
                </h2>
                <div className="space-y-4">
                  {mainFeedPosts.map((post: WPPost, index: number) => (
                    <React.Fragment key={post.id}>
                      <div className="pb-4 border-b border-gray-200 last:border-0">
                        <ArticleCard
                          article={post}
                          variant="horizontal"
                          showImage={true}
                          showExcerpt={true}
                          showAuthor={true}
                          showCategory={true}
                        />
                      </div>
                      {/* In-feed Ad after 3rd article */}
                      {index === 2 && shouldShowAds() && (
                        <div className="py-4 border-b border-gray-200">
                          <AdUnit 
                            dataAdClient={ADSENSE_CONFIG.publisherId}
                            dataAdSlot={ADSENSE_CONFIG.adSlots.homepageInFeed}
                            dataAdFormat="fluid"
                            dataAdLayoutKey="-f0-1i+7x-n5+pu"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </section>

              {/* Category Sections */}
              {categorySections.map(({ category, posts }) => (
                posts.length > 0 && (
                  <div key={category.id} className="mt-12 pt-8 border-t border-gray-300">
                    <CategorySection
                      title={category.name}
                      slug={category.slug}
                      articles={posts}
                      variant="default"
                    />
                  </div>
                )
              ))}
            </div>

            {/* Sidebar - 1/3 width */}
            <aside className="space-y-8">
              {/* Sidebar Ad - Top */}
              {shouldShowAds() && (
                <SidebarAd 
                  dataAdClient={ADSENSE_CONFIG.publisherId}
                  dataAdSlot={ADSENSE_CONFIG.adSlots.homepageSidebar}
                />
              )}
              
              {/* Popular Reads Section */}
              {popularPosts.length > 0 && (
                <section className="bg-white">
                  <h2 className="text-xl font-semibold text-gray-900 mb-5 pb-3 border-b-2 border-teal-600">
                    Popular Reads
                  </h2>
                  <div className="space-y-5">
                    {popularPosts.slice(0, 4).map((post: WPPost) => (
                        <article key={post.id} className="group">
                          <a 
                            href={`/${new Date(post.date).getFullYear()}/${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.date).getDate()).padStart(2, '0')}/${post.slug}/`}
                            className="flex gap-4 items-center"
                          >
                            {/* Thumbnail Image */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                              {post.featuredImage?.node?.sourceUrl ? (
                                <ServerProxyImage
                                  src={post.featuredImage.node.sourceUrl}
                                  alt={post.featuredImage.node.altText || post.title}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          
                          {/* Article Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <time className="text-xs text-gray-500 font-normal">
                              {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                            </time>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Latest Updates Section */}
              {recentPosts.length > 0 && (
                <section className="bg-white">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                    Latest Updates
                  </h2>
                  <div className="space-y-3">
                    {recentPosts.slice(4, 8).map((post: WPPost) => (
                      <article key={post.id} className="group pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <a 
                          href={`/${new Date(post.date).getFullYear()}/${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.date).getDate()).padStart(2, '0')}/${post.slug}/`}
                          className="block"
                        >
                          <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1 group-hover:text-gray-600 transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <time>
                              {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                            </time>
                            {post.author?.node && (
                              <>
                                <span>•</span>
                                <span>{post.author.node.name}</span>
                              </>
                            )}
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              )}

            </aside>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

// Revalidate the page every 60 seconds
