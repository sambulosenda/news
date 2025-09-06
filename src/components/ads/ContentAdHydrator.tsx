'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// InArticleAd is rendered by LazyAdUnit
import LazyAdUnit from './LazyAdUnit';

/**
 * Client component that finds and hydrates ad placeholders in article content
 * This runs after the page loads and converts static placeholders into interactive ad components
 */
export default function ContentAdHydrator() {
  useEffect(() => {
    // Find all in-content ad slots
    const adSlots = document.querySelectorAll('.in-content-ad-slot');
    
    adSlots.forEach((slot, index) => {
      // Get ad configuration from data attributes
      const adClient = slot.getAttribute('data-ad-client');
      const adSlot = slot.getAttribute('data-ad-slot');
      
      if (!adClient || !adSlot) return;
      
      // Create a root for this ad slot
      const root = createRoot(slot as HTMLElement);
      
      // Render lazy-loaded ad based on position
      // First ad loads earlier (100px before viewport)
      // Later ads load with more margin (300px)
      const rootMargin = index === 0 ? '100px' : '300px';
      
      root.render(
        <LazyAdUnit
          adType="InArticleAd"
          dataAdClient={adClient}
          dataAdSlot={adSlot}
          rootMargin={rootMargin}
          fallback={
            <div className="h-32 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-sm">Advertisement</span>
            </div>
          }
        />
      );
    });
    
    // Track ad performance in development
    if (process.env.NODE_ENV === 'development') {
      // Hydrated ad slots successfully
    }
    
    // Cleanup function
    return () => {
      // React 18 automatically handles cleanup of roots
    };
  }, []);
  
  return null; // This component doesn't render anything visible
}

/**
 * Hook to monitor Core Web Vitals impact of ads
 */
export function useAdPerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Monitor Cumulative Layout Shift (CLS) from ads
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).sources) {
          const sources = (entry as any).sources;
          const adRelated = sources.some((source: any) => 
            source.node?.classList?.contains('adsbygoogle') ||
            source.node?.classList?.contains('ad-wrapper')
          );
          
          if (adRelated && process.env.NODE_ENV === 'development') {
            console.warn('Ad caused layout shift:', {
              value: (entry as any).value,
              sources: sources.map((s: any) => s.node?.className)
            });
          }
        }
      }
    });
    
    try {
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Layout shift observer not supported
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
}