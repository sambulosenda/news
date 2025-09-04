import { Metadata } from 'next';
import Link from 'next/link';
import { navigationConfig } from '@/config/navigation';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'News Categories | All Sections',
  description: 'Browse all news categories and sections on Report Focus News. Find the latest news in Politics, Business, Sports, Africa, World, Entertainment, and more.',
  keywords: 'news categories, news sections, South Africa news, Zimbabwe news, Africa news, politics, business, sports, entertainment, world news, breaking news',
  openGraph: {
    title: 'News Categories - Report Focus News',
    description: 'Browse all news categories and sections. Your comprehensive source for Southern Africa and world news.',
    type: 'website',
    url: 'https://reportfocusnews.com/news/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News Categories - Report Focus News',
    description: 'Browse all news categories and sections. Your comprehensive source for Southern Africa and world news.',
  },
  alternates: {
    canonical: 'https://reportfocusnews.com/news/',
  },
};

export default function NewsCategoriesPage() {
  // Separate featured and secondary categories
  const featuredCategories = navigationConfig
    .filter(cat => cat.featured)
    .sort((a, b) => a.priority - b.priority);
  
  const secondaryCategories = navigationConfig
    .filter(cat => !cat.featured)
    .sort((a, b) => a.priority - b.priority);

  return (
    <>
      <HeaderWrapper />
      
      {/* Comprehensive Navigation Schema for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'News Categories',
            description: 'Complete directory of all news categories on Report Focus News',
            url: 'https://reportfocusnews.com/news/',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://reportfocusnews.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'News Categories',
                  item: 'https://reportfocusnews.com/news/'
                }
              ]
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: navigationConfig.map((category, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://reportfocusnews.com/news/${category.slug}/`,
                name: category.name
              }))
            }
          })
        }}
      />

      <main className="bg-white">
        <div className="container-wide py-8">
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
              News Categories
            </h1>
            <p className="text-lg text-gray-600">
              Browse all news sections and topics
            </p>
          </header>

          {/* Main Categories Grid */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-300">
              Main Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredCategories.map((category) => (
                <div key={category.slug} className="group">
                  <Link
                    href={`/news/${category.slug}/`}
                    className="block p-4 bg-white border border-gray-200 rounded hover:border-red-600 hover:shadow-md transition-all duration-200"
                  >
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-600">
                      {category.name}
                    </h3>
                    {category.children && category.children.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {category.children.length} subcategories
                      </p>
                    )}
                  </Link>
                  
                  {/* Subcategories */}
                  {category.children && category.children.length > 0 && (
                    <div className="mt-3 pl-4">
                      <div className="space-y-1">
                        {category.children.slice(0, 3).map((child) => (
                          <Link
                            key={child.slug}
                            href={`/news/${child.slug}/`}
                            className="block text-sm text-gray-600 hover:text-red-600 py-1"
                          >
                            → {child.name}
                          </Link>
                        ))}
                        {category.children.length > 3 && (
                          <Link
                            href={`/news/${category.slug}/`}
                            className="block text-sm text-gray-500 hover:text-red-600 py-1 italic"
                          >
                            + {category.children.length - 3} more...
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Secondary Categories */}
          {secondaryCategories.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-gray-300">
                More Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {secondaryCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/news/${category.slug}/`}
                    className="block p-4 text-center bg-white border border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <span className="font-medium text-gray-900 hover:text-red-600">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Regional Focus Section */}
          <section className="mb-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Regional Coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Southern Africa</h3>
                <div className="space-y-2">
                  {['south-africa', 'zimbabwe', 'zambia', 'mozambique', 'malawi', 'angola'].map((country) => (
                    <Link
                      key={country}
                      href={`/news/${country}/`}
                      className="block text-gray-600 hover:text-red-600"
                    >
                      {country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Continental</h3>
                <div className="space-y-2">
                  <Link href="/news/africa/" className="block text-gray-600 hover:text-red-600">
                    All Africa News
                  </Link>
                  <Link href="/news/east-africa/" className="block text-gray-600 hover:text-red-600">
                    East Africa
                  </Link>
                  <Link href="/news/west-africa/" className="block text-gray-600 hover:text-red-600">
                    West Africa
                  </Link>
                  <Link href="/news/southern-africa/" className="block text-gray-600 hover:text-red-600">
                    Southern Africa Region
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">International</h3>
                <div className="space-y-2">
                  <Link href="/news/world/" className="block text-gray-600 hover:text-red-600">
                    World News
                  </Link>
                  <Link href="/news/united-states-canada/" className="block text-gray-600 hover:text-red-600">
                    US & Canada
                  </Link>
                  <Link href="/news/uk-general-election/" className="block text-gray-600 hover:text-red-600">
                    UK Politics
                  </Link>
                  <Link href="/news/europe/" className="block text-gray-600 hover:text-red-600">
                    Europe
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="text-center py-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/news/breaking-news/"
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                🔴 Breaking News
              </Link>
              <Link
                href="/search"
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
              >
                🔍 Search News
              </Link>
              <Link
                href="/weather"
                className="px-6 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
              >
                ☀️ Weather
              </Link>
              <Link
                href="/"
                className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
              >
                🏠 Homepage
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}