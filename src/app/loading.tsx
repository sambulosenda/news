import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Loading() {
  return (
    <>
      <Header />
      <main className="container-wide py-8">
        {/* Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="skeleton h-96 mb-4"></div>
            <div className="skeleton h-8 w-32 mb-2"></div>
            <div className="skeleton h-12 w-full mb-2"></div>
            <div className="skeleton h-6 w-3/4"></div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="skeleton h-48 mb-3"></div>
              <div className="skeleton h-6 w-full mb-2"></div>
              <div className="skeleton h-4 w-3/4"></div>
            </div>
            <div>
              <div className="skeleton h-48 mb-3"></div>
              <div className="skeleton h-6 w-full mb-2"></div>
              <div className="skeleton h-4 w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 pb-6 border-b border-gray-200">
                <div className="skeleton w-32 h-32 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="skeleton h-6 w-full mb-2"></div>
                  <div className="skeleton h-4 w-3/4 mb-2"></div>
                  <div className="skeleton h-3 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <aside className="space-y-8">
            <div className="p-6 bg-gray-50">
              <div className="skeleton h-8 w-32 mb-4"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 mb-4">
                  <div className="skeleton h-8 w-8"></div>
                  <div className="skeleton h-4 flex-1"></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}