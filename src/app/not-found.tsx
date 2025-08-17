import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-wide py-16 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-6xl font-bold mb-4">404</h1>
          <h2 className="font-serif text-3xl mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/search"
              className="px-6 py-3 border border-gray-300 font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Search Articles
            </Link>
          </div>
        </div>

        {/* Suggested Categories */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold mb-6 text-center">
            Browse Our Sections
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Politics', 'Business', 'Technology', 'World', 'Sports', 'Opinion', 'Arts', 'Science'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="p-4 text-center border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}