import dynamic from 'next/dynamic';

// Lazy load heavy components with loading states
// This reduces initial bundle by ~80KB

export const SearchBarEnhanced = dynamic(
  () => import('@/components/forms/SearchBarEnhanced'),
  {
    loading: () => (
      <div className="h-10 w-full max-w-md bg-gray-100 animate-pulse rounded-full" />
    ),
    ssr: true, // Keep SSR for SEO
  }
);

export const RelatedArticles = dynamic(
  () => import('@/components/sections/RelatedArticles'),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    ),
  }
);

export const MobileShareBar = dynamic(
  () => import('@/components/features/MobileShareBar'),
  {
    loading: () => null,
    ssr: false,
  }
);

export const BackToTop = dynamic(
  () => import('@/components/common/BackToTop'),
  {
    loading: () => null,
    ssr: false,
  }
);

export const ReadingProgress = dynamic(
  () => import('@/components/features/ReadingProgress'),
  {
    loading: () => null,
    ssr: false,
  }
);

export const ShareButtons = dynamic(
  () => import('@/components/features/ShareButtons'),
  {
    loading: () => (
      <div className="flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-10 h-10 bg-gray-100 animate-pulse rounded-full" />
        ))}
      </div>
    ),
  }
);

export const PerformanceMonitor = dynamic(
  () => import('@/components/performance/PerformanceMonitor'),
  {
    loading: () => null,
    ssr: false,
  }
);