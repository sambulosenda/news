'use client';

import { useEffect } from 'react';

/**
 * Web Vitals monitoring for Core Web Vitals optimization
 * Tracks and reports performance metrics to improve Google ranking
 */
export default function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      // Log metrics in development, send to analytics in production
      const logMetric = (metric: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta
          });
          
          // Show warnings for poor metrics
          if (metric.rating === 'poor') {
            console.warn(`⚠️ Poor ${metric.name} score: ${metric.value}ms`);
          }
        }
        
        // Send to analytics in production
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }
      };
      
      // Core Web Vitals
      onCLS(logMetric);  // Cumulative Layout Shift
      onFCP(logMetric);  // First Contentful Paint
      onLCP(logMetric);  // Largest Contentful Paint
      onTTFB(logMetric); // Time to First Byte
      onINP(logMetric);  // Interaction to Next Paint (replaces FID)
    }).catch(err => {
      console.error('Failed to load web-vitals:', err);
    });
  }, []);
  
  return null;
}

// Helper to get Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 }  // INP replaces FID in Core Web Vitals
};

// Prefetch critical resources
export function prefetchCriticalResources() {
  if (typeof window !== 'undefined') {
    // Prefetch fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
    ];
    
    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
    
    // Preconnect to critical domains
    const domains = [
      'https://backend.reportfocusnews.com',
      'https://newsreportfocus.b-cdn.net',
      'https://www.googletagmanager.com'
    ];
    
    domains.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
    });
  }
}