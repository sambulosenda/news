'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Performance optimizer for news website
 * Implements immediate critical optimizations and better Core Web Vitals monitoring
 */
export default function NewsPerformanceOptimizer() {
  const pathname = usePathname();

  // Core Web Vitals reporting function
  const reportWebVital = useCallback(({ name, value, id }: { name: string; value: number; id: string }) => {
    // News sites should aim for: LCP < 2.5s, FID < 100ms, CLS < 0.1
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${value}ms (${id})`);
    }
    
    // Send to analytics (you can implement your analytics here)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
      });
    }
  }, []);

  // Immediate critical optimizations
  useEffect(() => {
    // 1. Optimize critical images immediately (LCP candidates)
    const optimizeCriticalImages = () => {
      // Find featured images and hero images that could be LCP candidates
      const criticalImages = document.querySelectorAll('img[data-critical], .featured-image img, .hero-image img, article img:first-of-type');
      
      criticalImages.forEach((img: Element) => {
        const imageEl = img as HTMLImageElement;
        if (imageEl.loading === 'lazy') {
          imageEl.loading = 'eager';
          imageEl.fetchPriority = 'high';
        }
        // Add decode hint for better rendering
        if ('decode' in imageEl) {
          imageEl.decode().catch(() => {}); // Preload decode
        }
      });
    };

    // 2. Add critical resource hints immediately
    const addCriticalResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: 'https://backend.reportfocusnews.com' },
        { rel: 'preconnect', href: 'https://backend.reportfocusnews.com', crossOrigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      ];

      hints.forEach(hint => {
        const selector = `link[rel="${hint.rel}"][href="${hint.href}"]`;
        if (!document.querySelector(selector)) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin) {
            link.crossOrigin = hint.crossOrigin;
          }
          document.head.appendChild(link);
        }
      });
    };

    // 3. Preload critical CSS for next paint
    const preloadCriticalResources = () => {
      // Check if we're on an article page
      if (pathname.match(/\/20\d{2}\/\d{2}\/\d{2}\/.+/)) {
        // Preload related articles API
        const relatedLink = document.createElement('link');
        relatedLink.rel = 'prefetch';
        relatedLink.href = '/api/related-posts';
        document.head.appendChild(relatedLink);
        
        // Preload comment system resources if available
        const commentScript = document.createElement('link');
        commentScript.rel = 'prefetch';
        commentScript.href = '/comments.js';
        document.head.appendChild(commentScript);
      }
    };

    // Execute immediate optimizations
    optimizeCriticalImages();
    addCriticalResourceHints();
    preloadCriticalResources();

    // Delayed optimizations for non-critical features
    const timer = setTimeout(() => {
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

      // Optimize remaining images with intersection observer
      const optimizeRemainingImages = () => {
        if ('IntersectionObserver' in window) {
          const lazyImages = document.querySelectorAll('img[loading="lazy"]:not([data-optimized])');
          
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                img.setAttribute('data-optimized', 'true');
                
                // Optimize for faster loading
                if (img.loading === 'lazy') {
                  img.loading = 'eager';
                }
                
                imageObserver.unobserve(img);
              }
            });
          }, {
            rootMargin: '100px', // Load images 100px before they come into view
            threshold: 0.01,
          });

          lazyImages.forEach(img => imageObserver.observe(img));
        }
      };

      prefetchLinks();
      optimizeRemainingImages();
    }, 100); // Much shorter delay for better performance

    return () => clearTimeout(timer);
  }, [pathname]);

  // Enhanced Core Web Vitals monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import web-vitals dynamically for better performance
    const loadWebVitals = async () => {
      try {
        const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
        
        // Monitor all Core Web Vitals
        onCLS(reportWebVital);
        onFID(reportWebVital);
        onFCP(reportWebVital);
        onLCP(reportWebVital);
        onTTFB(reportWebVital);
      } catch (error) {
        // Fallback performance monitoring if web-vitals fails
        if ('PerformanceObserver' in window) {
          try {
            // Monitor LCP manually
            const lcpObserver = new PerformanceObserver((list) => {
              list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                  reportWebVital({ 
                    name: 'LCP', 
                    value: entry.startTime,
                    id: 'fallback-' + Date.now()
                  });
                }
              });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor CLS manually
            const clsObserver = new PerformanceObserver((list) => {
              let clsValue = 0;
              list.getEntries().forEach((entry: any) => {
                if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              });
              if (clsValue > 0) {
                reportWebVital({ 
                  name: 'CLS', 
                  value: clsValue,
                  id: 'fallback-' + Date.now()
                });
              }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch (observerError) {
            console.warn('Performance monitoring unavailable:', observerError);
          }
        }
      }
    };

    // Load web vitals on idle or after a short delay
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadWebVitals);
    } else {
      setTimeout(loadWebVitals, 1000);
    }
  }, [reportWebVital]);

  return null; // This component doesn't render anything
}