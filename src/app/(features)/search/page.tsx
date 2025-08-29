import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import SearchResults from '@/components/search/SearchResults';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Metadata } from 'next';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  const breadcrumbItems = [
    { name: 'Home', url: 'https://reportfocusnews.com' },
    { name: 'Search', url: 'https://reportfocusnews.com/search' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <HeaderWrapper />
      
      <main className="bg-gray-50 min-h-screen">
        <div className="container-wide py-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Search Report Focus News
          </h1>
          <p className="text-gray-600 mb-6">
            Find the latest news from South Africa, Zimbabwe, and around the world
          </p>
        </div>
        
        <SearchResults initialQuery={query} />
      </main>

      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Search',  // Template adds " | Report Focus News"
  description: 'Search for news articles and stories from South Africa and Zimbabwe on Report Focus News',
  openGraph: {
    title: 'Search | Report Focus News',  // OpenGraph keeps full title
    description: 'Search for news articles and stories from South Africa and Zimbabwe',
    type: 'website',
    url: 'https://reportfocusnews.com/search',
  },
  robots: {
    index: true,
    follow: true,
  },
};