'use client';

import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if Web Vitals API is available
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    const reportWebVitals = (metric: WebVitalsMetric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vitals:', metric);
      }

      // Send to analytics service in production
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Send to other analytics services
      // Example: Send to custom analytics endpoint
      // fetch('/api/analytics/web-vitals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metric),
      // });
    };

    // Dynamic import of web-vitals to avoid bundle bloat
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(reportWebVitals);
      onFCP(reportWebVitals);
      onINP(reportWebVitals); // INP replaced FID in web-vitals v3+
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    });
  }, []);

  return null; // This component doesn't render anything
}

// Add types for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}