import { Metadata } from 'next'
import { bunnyStream } from '@/lib/api/bunny-stream'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import NewsVideoSection from '@/components/video/NewsVideoSection'
import { BannerAd, SidebarAd } from '@/components/ads/GoogleAdsense'
import { ADSENSE_CONFIG, shouldShowAds } from '@/config/adsense'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Video News - Latest Breaking News Videos | Report Focus News',
  description: 'Watch breaking news videos from South Africa & Zimbabwe. Latest video reports, interviews, and live coverage from Report Focus News.',
  keywords: 'video news, breaking news videos, SA news videos, Zimbabwe news videos, live news, video reports, news interviews',
  openGraph: {
    title: 'Video News - Latest Breaking News Videos | Report Focus News',
    description: 'Watch breaking news videos from South Africa & Zimbabwe. Latest video reports and live coverage.',
    type: 'website',
    url: 'https://reportfocusnews.com/videos',
    siteName: 'Report Focus News',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Report Focus News - Video News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@reportfocusnews',
    title: 'Video News - Latest Breaking News Videos',
    description: 'Watch breaking news videos from South Africa & Zimbabwe',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function VideosPage() {
  // Fetch different video categories
  const [featuredVideos, latestVideos, trendingVideos] = await Promise.all([
    bunnyStream.getVideos(1, 8, 'date').catch(() => ({ items: [], totalItems: 0 })),
    bunnyStream.getVideos(1, 12, 'date').catch(() => ({ items: [], totalItems: 0 })),
    bunnyStream.getVideos(1, 6, 'views').catch(() => ({ items: [], totalItems: 0 }))
  ])

  return (
    <>
      <HeaderWrapper />
      <main className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container-wide py-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Video News</h1>
              <p className="text-xl text-red-100 leading-relaxed">
                Stay informed with our latest video reports, breaking news coverage, 
                and in-depth analysis from South Africa and Zimbabwe.
              </p>
            </div>
          </div>
        </div>

        {/* Banner Ad */}
        {shouldShowAds() && (
          <BannerAd 
            dataAdClient={ADSENSE_CONFIG.publisherId}
            dataAdSlot={ADSENSE_CONFIG.adSlots.categoryBanner}
          />
        )}

        {/* Main Content */}
        <div className="container-wide py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Featured Videos Section */}
              {featuredVideos.items.length > 0 && (
                <NewsVideoSection
                  videos={featuredVideos.items.map(video => ({
                    guid: video.guid,
                    title: video.title,
                    description: video.description ?? '',
                    thumbnail: video.thumbnail ?? '',
                    duration: video.duration ?? 0,
                    dateUploaded: video.dateUploaded ?? new Date().toISOString(),
                    views: video.views ?? 0,
                    category: 'Breaking News'
                  }))}
                  title="Top Stories"
                  variant="featured"
                  showViewAll={false}
                />
              )}

              {/* Category Navigation */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/videos?category=all"
                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    All Videos
                  </Link>
                  <Link
                    href="/videos?category=breaking"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Breaking News
                  </Link>
                  <Link
                    href="/videos?category=politics"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Politics
                  </Link>
                  <Link
                    href="/videos?category=business"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Business
                  </Link>
                  <Link
                    href="/videos?category=sports"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Sports
                  </Link>
                  <Link
                    href="/videos?category=world"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    World News
                  </Link>
                </div>
              </div>

              {/* Latest Videos Section */}
              {latestVideos.items.length > 0 && (
                <NewsVideoSection
                  videos={latestVideos.items.map(video => ({
                    guid: video.guid,
                    title: video.title,
                    description: video.description ?? '',
                    thumbnail: video.thumbnail ?? '',
                    duration: video.duration ?? 0,
                    dateUploaded: video.dateUploaded ?? new Date().toISOString(),
                    views: video.views ?? 0,
                    category: 'Latest'
                  }))}
                  title="Latest Videos"
                  variant="category"
                  showViewAll={false}
                />
              )}

              {/* Load More Button */}
              <div className="text-center pt-8">
                <Link
                  href="/videos/all"
                  className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Load More Videos
                </Link>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <aside className="space-y-8">
              {/* Sidebar Ad */}
              {shouldShowAds() && (
                <SidebarAd 
                  dataAdClient={ADSENSE_CONFIG.publisherId}
                  dataAdSlot={ADSENSE_CONFIG.adSlots.categorySidebar}
                />
              )}

              {/* Trending Videos */}
              {trendingVideos.items.length > 0 && (
                <NewsVideoSection
                  videos={trendingVideos.items.map(video => ({
                    guid: video.guid,
                    title: video.title,
                    description: video.description ?? '',
                    thumbnail: video.thumbnail ?? '',
                    duration: video.duration ?? 0,
                    dateUploaded: video.dateUploaded ?? new Date().toISOString(),
                    views: video.views ?? 0,
                    category: 'Trending'
                  }))}
                  title="Trending Videos"
                  variant="trending"
                  showViewAll={false}
                />
              )}

              {/* Video Categories Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Browse by Category
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/videos?category=breaking"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Breaking News
                  </Link>
                  <Link
                    href="/videos?category=politics"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Politics & Government
                  </Link>
                  <Link
                    href="/videos?category=business"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Business & Economy
                  </Link>
                  <Link
                    href="/videos?category=sports"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Sports
                  </Link>
                  <Link
                    href="/videos?category=world"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    World News
                  </Link>
                  <Link
                    href="/videos?category=entertainment"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Entertainment
                  </Link>
                  <Link
                    href="/videos?category=technology"
                    className="block text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Technology
                  </Link>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Stay Updated
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified when we publish new video content.
                </p>
                <Link
                  href="/newsletter"
                  className="inline-block w-full text-center px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors text-sm"
                >
                  Subscribe to Updates
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}