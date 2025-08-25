'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import HeaderClient from '@/components/layout/HeaderClient';
import Footer from '@/components/layout/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <HeaderClient />
      <main className="container-wide py-16 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We apologize for the inconvenience. An error occurred while loading this page.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Go to homepage
            </Link>
          </div>
          {error.digest && (
            <p className="mt-8 text-sm text-gray-500">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}