import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Lazy load heavy components that are not critical for initial render
export const LazyReadingProgress = dynamic(
  () => import('@/components/features/OptimizedReadingProgress'),
  { 
    ssr: false,
    loading: () => null // No loading state needed for reading progress
  }
);

export const LazyShareButtons = dynamic(
  () => import('@/components/features/ShareButtons'),
  {
    ssr: false, // Not critical for SEO
    loading: () => (
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }
);

export const LazyMobileShareBar = dynamic(
  () => import('@/components/features/MobileShareBar'),
  { 
    ssr: false,
    loading: () => null
  }
);

export const LazyBackToTop = dynamic(
  () => import('@/components/common/BackToTop'),
  { 
    ssr: false,
    loading: () => null
  }
);

// Intersection Observer based lazy loading for performance-critical components
export const LazyAdsenseAd = dynamic(
  () => import('@/components/ads/GoogleAdsense').then(mod => ({ default: mod.InArticleAd })),
  {
    ssr: false, // Ads don't need SSR
    loading: () => (
      <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Advertisement</span>
      </div>
    )
  }
);

// Note: Location detector is a utility function, not a component
// Import it directly where needed instead of lazy loading

// Higher-order component for intersection observer based loading
export function withIntersectionLoading<P extends object>(
  Component: ComponentType<P>,
  _options: Record<string, unknown> = {}
): ComponentType<P & { threshold?: number }> {
  return function IntersectionWrapper(props: P & { threshold?: number }) {
    const LazyComponent = dynamic(
      () => Promise.resolve({ default: Component }),
      {
        loading: () => (
          <div className="w-full h-48 bg-gray-50 animate-pulse" />
        )
      }
    );

    return <LazyComponent {...props} />;
  };
}

// Preload critical components on hover/focus
export function preloadCriticalComponents() {
  if (typeof window === 'undefined') return;

  // Preload components likely to be needed
  const preloadableComponents = [
    () => import('@/components/features/ShareButtons'),
    () => import('@/components/features/MobileShareBar'),
    () => import('@/components/common/BackToTop'),
  ];

  // Preload on idle or interaction
  const preload = () => {
    preloadableComponents.forEach(component => {
      component().catch(() => {}); // Silent fail
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload);
  } else {
    setTimeout(preload, 2000);
  }
}