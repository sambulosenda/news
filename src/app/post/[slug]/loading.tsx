import HeaderClient from '@/components/HeaderClient';
import Footer from '@/components/Footer';

export default function ArticleLoading() {
  return (
    <>
      <HeaderClient />
      <main className="container-content py-8">
        {/* Article Header Skeleton */}
        <header className="mb-8">
          <div className="skeleton h-6 w-24 mb-4"></div>
          <div className="skeleton h-12 w-full mb-2"></div>
          <div className="skeleton h-12 w-3/4 mb-4"></div>
          <div className="skeleton h-6 w-full mb-2"></div>
          <div className="skeleton h-6 w-2/3 mb-6"></div>
          
          <div className="flex gap-4 pb-6 border-b border-gray-200">
            <div className="skeleton h-10 w-10 rounded-full"></div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-3 w-24"></div>
            </div>
          </div>
        </header>

        {/* Featured Image Skeleton */}
        <div className="skeleton aspect-[16/9] mb-8"></div>

        {/* Article Content Skeleton */}
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Related Articles Skeleton */}
        <div className="mt-16 pt-8 border-t-2 border-gray-900">
          <div className="skeleton h-8 w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="skeleton aspect-[16/10] mb-3"></div>
                <div className="skeleton h-6 w-full mb-2"></div>
                <div className="skeleton h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}