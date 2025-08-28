'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { WebVitalMetric } from '@/types/global';

/**
 * Performance optimizer for news website
 * Implements prefetching and resource hints for better UX
 */
export default function NewsPerformanceOptimizer() {
  const pathname = usePathname();

  useEffect(() => {
    // Prefetch trending articles on hover (news-specific behavior)
    const prefetchLinks = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      
      links.forEach(link => {
        // Only prefetch article links, not navigation
        if (link.getAttribute('href')?.match(/\/(news|category|post|20\d{2})\//)) {
          link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !link.getAttribute('data-prefetched')) {
              // Use Next.js router prefetch
              const linkElement = document.createElement('link');
              linkElement.rel = 'prefetch';
              linkElement.href = href;
              document.head.appendChild(linkElement);
              link.setAttribute('data-prefetched', 'true');
            }
          }, { passive: true });
        }
      });
    };

    // Add resource hints for critical domains
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: 'https://backend.reportfocusnews.com' },
        { rel: 'preconnect', href: 'https://backend.reportfocusnews.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      ];

      hints.forEach(hint => {
        if (!document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.rel === 'preconnect') {
            link.crossOrigin = 'anonymous';
          }
          document.head.appendChild(link);
        }
      });
    };

    // Optimize images in viewport
    const optimizeImages = () => {
      if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.loading = 'eager';
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px',
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Implement all optimizations
    const timer = setTimeout(() => {
      prefetchLinks();
      addResourceHints();
      optimizeImages();
    }, 1000); // Delay to not interfere with initial load

    return () => clearTimeout(timer);
  }, [pathname]);

  // Report Core Web Vitals for news site monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      try {
        // Log performance metrics (you can send these to analytics)
        const reportWebVital = (_metric: WebVitalMetric) => {
          // News sites should aim for:
          // LCP < 2.5s, FID < 100ms, CLS < 0.1
          // Performance metrics can be logged in development
          // ${name}: ${value}
        };

        // Monitor performance
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                reportWebVital({ name: 'LCP', value: entry.startTime });
              }
            });
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
      } catch {
        // Silently fail if performance APIs not available
      }
    }
  }, []);

  return null; // This component doesn't render anything
}