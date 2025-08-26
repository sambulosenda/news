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

// Aggressive revalidation for news homepage - 30 seconds
export const revalidate = 30;

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
  
  // Debug log (commented out for production)
  // console.log('Homepage data fetched:', {
  //   hasData: !!homepageData,
  //   heroPost: !!homepageData?.heroPost?.edges?.[0],
  //   featuredCount: homepageData?.featuredPosts?.edges?.length || 0,
  //   recentCount: homepageData?.recentPosts?.edges?.length || 0,
  // });

  // Extract data from the optimized query
  const heroPost = homepageData?.heroPost?.edges?.[0]?.node;
  const featuredPosts = homepageData?.featuredPosts?.edges?.map((e: PostEdge) => e.node) || [];
  const recentPosts = homepageData?.recentPosts?.edges?.map((e: PostEdge) => e.node) || [];
  const breakingNews = homepageData?.breakingNews?.edges?.map((e: PostEdge) => e.node) || [];
  const categories = homepageData?.categories?.edges?.map((e: CategoryEdge) => e.node) || [];
  const popularPosts = homepageData?.popularPosts?.edges?.map((e: PostEdge) => e.node) || [];
  
  // Category sections
  const categorySections = [
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
export const dynamic = 'force-static';
export const fetchCache = 'default-cache';

export default async function HomePage() {
  const { 
    heroPost,
    featuredPosts,
    recentPosts,
    breakingNews,
    categorySections,
    popularPosts 
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
            <aside className="space-y-6">
              {/* Sidebar Ad - Top */}
              {shouldShowAds() && (
                <SidebarAd 
                  dataAdClient={ADSENSE_CONFIG.publisherId}
                  dataAdSlot={ADSENSE_CONFIG.adSlots.homepageSidebar}
                />
              )}
              
              {/* Most Popular Section */}
              {popularPosts.length > 0 && (
                <section>
                  <h3 className="text-base font-bold text-gray-900 pb-2 mb-3 border-b border-gray-900">
                    Most Popular
                  </h3>
                  <ol className="space-y-3">
                    {popularPosts.slice(0, 5).map((post: WPPost, index: number) => (
                      <li key={post.id} className="flex items-start">
                        <span className="text-gray-400 font-light text-xl mr-3 mt-0.5">
                          {index + 1}.
                        </span>
                        <a 
                          href={`/${new Date(post.date).getFullYear()}/${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.date).getDate()).padStart(2, '0')}/${post.slug}/`}
                          className="text-sm leading-snug hover:text-gray-600 transition-colors font-medium"
                        >
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Opinion Section */}
              {recentPosts.length > 0 && (
                <section>
                  <h3 className="text-base font-bold text-gray-900 pb-2 mb-3 border-b border-gray-900">
                    Opinion & Analysis
                  </h3>
                  <div className="space-y-3">
                    {recentPosts.slice(0, 4).map((post: WPPost) => (
                      <article key={post.id}>
                        <h4 className="text-sm font-semibold mb-1 leading-snug">
                          <a 
                            href={`/${new Date(post.date).getFullYear()}/${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.date).getDate()).padStart(2, '0')}/${post.slug}/`}
                            className="hover:text-gray-600 transition-colors"
                          >
                            {post.title}
                          </a>
                        </h4>
                        {post.author?.node && (
                          <p className="text-xs text-gray-500">
                            {post.author.node.name}
                          </p>
                        )}
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
