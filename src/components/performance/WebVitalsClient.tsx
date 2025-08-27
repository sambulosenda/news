'use client';

import { useEffect } from 'react';

/**
 * Client-side Web Vitals monitoring
 * Safe dynamic import to avoid SSR and HMR issues
 */
function WebVitalsReporter() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only load in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS === 'true') {
      import('web-vitals').then((vitals) => {
        const logMetric = (metric: any) => {
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            const value = metric.name === 'CLS' ? metric.value.toFixed(3) : Math.round(metric.value);
            console.log(`📊 ${metric.name}: ${value} (${metric.rating})`);
          }
          
          // Send to analytics if available
          if ((window as any).gtag) {
            (window as any).gtag('event', metric.name, {
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
              metric_rating: metric.rating
            });
          }
        };

        // Register metrics safely
        if (vitals.onCLS) vitals.onCLS(logMetric);
        if (vitals.onLCP) vitals.onLCP(logMetric);
        if (vitals.onFCP) vitals.onFCP(logMetric);
        if (vitals.onTTFB) vitals.onTTFB(logMetric);
        if (vitals.onINP) vitals.onINP(logMetric);
      }).catch(() => {
        // Silent fail - not critical
      });
    }
  }, []);

  return null;
}

// Export as default
export default WebVitalsReporter;