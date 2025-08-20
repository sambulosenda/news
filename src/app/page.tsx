import { Metadata } from 'next';
import { fetchGraphQLDirect } from '@/lib/fetch-direct';
import { GET_HOMEPAGE_DATA_SIMPLE } from '@/lib/queries/homepage-simple';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import BreakingNewsBanner from '@/components/BreakingNewsBanner';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ArticleCard from '@/components/ArticleCard';
import OrganizationSchema from '@/components/OrganizationSchema';
import { WPPost, WPCategory } from '@/types/wordpress';

// Aggressive revalidation for news homepage - 30 seconds
export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Report Focus News - South Africa & Zimbabwe Breaking News | Politics, Business, Sports',
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
    ? filteredFeaturedPosts.slice(0, 4) 
    : filteredRecentPosts.slice(0, 4);
  
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

        {/* Main Content Area */}
        <div className="container-wide py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-10">
              {/* Latest News Section */}
              <section>
                <div className="border-b-2 border-gray-900 pb-2 mb-6">
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold">Latest News</h2>
                </div>
                <div className="space-y-6">
                  {mainFeedPosts.map((post: WPPost) => (
                    <div key={post.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <ArticleCard
                        article={post}
                        variant="horizontal"
                        showImage={true}
                        showExcerpt={true}
                        showAuthor={true}
                        showCategory={true}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Category Sections */}
              {categorySections.map(({ category, posts }) => (
                posts.length > 0 && (
                  <div key={category.id} className="pt-8 border-t border-gray-300">
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
              {/* Most Popular Section */}
              {popularPosts.length > 0 && (
                <section className="p-6 bg-gray-50 border border-gray-200">
                  <h2 className="font-serif text-xl lg:text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-900">Most Popular</h2>
                  <div className="space-y-4 pt-4">
                    {popularPosts.slice(0, 5).map((post: WPPost, index: number) => (
                      <div key={post.id} className="flex items-start gap-3">
                        <span className="font-serif text-2xl font-bold text-red-600 min-w-[1.5rem]">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-serif text-base font-bold leading-snug">
                            <a href={`/${new Date(post.date).getFullYear()}/${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.date).getDate()).padStart(2, '0')}/${post.slug}/`} className="hover:underline">
                              {post.title}
                            </a>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Opinion Section */}
              {recentPosts.length > 0 && (
                <section className="p-6 border border-gray-300">
                  <h2 className="font-serif text-xl lg:text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-900">Opinion</h2>
                  <div className="space-y-4 pt-4">
                    {recentPosts.slice(0, 4).map((post: WPPost) => (
                      <article key={post.id} className="pb-4 border-b border-gray-200 last:border-b-0">
                        <h3 className="font-serif text-base font-bold mb-2 leading-snug">
                          <a href={`/${new Date(post.date).getFullYear()}/${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.date).getDate()).padStart(2, '0')}/${post.slug}/`} className="hover:underline">
                            {post.title}
                          </a>
                        </h3>
                        {post.author?.node && (
                          <p className="text-sm text-gray-600">
                            By {post.author.node.name}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Newsletter Signup */}
              <section className="p-6 bg-gray-900 text-white">
                <h3 className="font-serif text-xl font-bold mb-3">
                  Morning Briefing
                </h3>
                <p className="text-sm mb-4 leading-relaxed">
                  Get what you need to know to start your day.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 text-gray-900 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transition-colors"
                  >
                    Sign Up
                  </button>
                </form>
              </section>
            </aside>
          </div>
        </div>

        {/* Today's Paper Section */}
        <section className="bg-gray-50 border-t-2 border-gray-900">
          <div className="container-wide py-12 lg:py-16">
            <div className="mb-8">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Today&apos;s Paper</h2>
              <p className="text-base text-gray-600">The front page of today&apos;s Report Focus News</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPosts.slice(0, 8).map((post: WPPost) => (
              <ArticleCard
                key={post.id}
                article={post}
                variant="default"
                showImage={true}
                showExcerpt={false}
                showAuthor={false}
                showCategory={true}
              />
            ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Revalidate the page every 60 seconds
