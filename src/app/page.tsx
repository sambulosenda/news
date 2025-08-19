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

// Enable ISR - regenerate frequently for news freshness
export const revalidate = 60; // 1 minute for breaking news

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
  const mainHeroPost = heroPost || recentPosts[0];
  const sideHeroPosts = featuredPosts.length > 0 ? featuredPosts : recentPosts.slice(1, 5);

  // Get remaining recent posts for main feed
  const mainFeedPosts = recentPosts.slice(5, 15);

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
      
      <main>
        {/* Hero Section */}
        {mainHeroPost && (
          <HeroSection 
            mainArticle={mainHeroPost} 
            sideArticles={sideHeroPosts}
          />
        )}

        {/* Main Content Area */}
        <div className="container-wide py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-12">
              {/* Latest News Section */}
              <section>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-8">Latest News</h2>
                <div className="space-y-8">
                  {mainFeedPosts.map((post: WPPost) => (
                    <div key={post.id} className="pb-8 border-b border-gray-200 last:border-b-0">
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
                  <div key={category.id} className="pt-12 border-t-2 border-gray-900">
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
            <aside className="space-y-12">
              {/* Most Popular Section */}
              {popularPosts.length > 0 && (
                <section className="p-8 bg-gray-50 rounded-lg">
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-6">Most Popular</h2>
                  <div className="space-y-6">
                    {popularPosts.slice(0, 5).map((post: WPPost, index: number) => (
                      <div key={post.id} className="flex items-start gap-4">
                        <span className="font-serif text-3xl font-bold text-gray-400 mt-1 min-w-[2rem]">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-bold leading-tight">
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
                <section className="p-8 border-2 border-gray-900">
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-6">Opinion</h2>
                  <div className="space-y-4">
                    {recentPosts.slice(0, 4).map((post: WPPost) => (
                      <article key={post.id} className="pb-5 border-b border-gray-200 last:border-b-0">
                        <h3 className="font-serif text-lg font-bold mb-2 leading-tight">
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
              <section className="p-8 bg-gray-900 text-white rounded-lg">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Morning Briefing
                </h3>
                <p className="text-base mb-6 leading-relaxed">
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
        <section className="container-wide py-16 border-t-2 border-gray-900">
          <div className="mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">Today&apos;s Paper</h2>
            <p className="text-lg text-gray-600">The front page of today&apos;s Report Focus News</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </section>
      </main>

      <Footer />
    </>
  );
}

// Revalidate the page every 60 seconds
