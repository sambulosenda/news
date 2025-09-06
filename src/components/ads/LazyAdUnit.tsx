'use client';

import React, { useEffect, useRef, useState } from 'react';
import { InArticleAd, ResponsiveAd, AdUnit } from './GoogleAdsense';

interface LazyAdUnitProps {
  adType: 'InArticleAd' | 'ResponsiveAd' | 'AdUnit';
  dataAdClient: string;
  dataAdSlot: string;
  dataAdFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  rootMargin?: string; // When to start loading (e.g., "200px" = 200px before visible)
  fallback?: React.ReactNode;
}

/**
 * Lazy-loading wrapper for AdSense units
 * Only loads ads when they're about to enter the viewport
 */
export default function LazyAdUnit({
  adType,
  dataAdClient,
  dataAdSlot,
  dataAdFormat,
  className,
  style,
  rootMargin = '200px', // Start loading 200px before entering viewport
  fallback = null
}: LazyAdUnitProps) {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsInView(true);
            setHasLoaded(true); // Only load once
            observer.disconnect(); // Stop observing after loading
          }
        });
      },
      {
        rootMargin,
        threshold: 0
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, hasLoaded]);

  // Render the appropriate ad component
  const renderAd = () => {
    const props = {
      dataAdClient,
      dataAdSlot
    };

    switch (adType) {
      case 'InArticleAd':
        return <InArticleAd {...props} />;
      case 'ResponsiveAd':
        return <ResponsiveAd {...props} />;
      case 'AdUnit':
        return (
          <AdUnit
            {...props}
            dataAdFormat={dataAdFormat}
            className={className}
            style={style}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`lazy-ad-container ${className || ''}`}
      style={{
        minHeight: isInView ? 'auto' : '100px', // Reserve space
        ...style
      }}
    >
      {isInView ? renderAd() : fallback}
    </div>
  );
}

/**
 * Hook for tracking ad visibility and performance
 */
export function useAdVisibility(adIdentifier: string) {
  const [metrics, setMetrics] = useState({
    timeInView: 0,
    firstViewTime: null as number | null,
    viewCount: 0
  });
  const ref = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTimeRef.current = Date.now();
            
            setMetrics(prev => ({
              ...prev,
              firstViewTime: prev.firstViewTime || Date.now(),
              viewCount: prev.viewCount + 1
            }));
          } else if (startTimeRef.current) {
            const duration = Date.now() - startTimeRef.current;
            
            setMetrics(prev => ({
              ...prev,
              timeInView: prev.timeInView + duration
            }));
            
            startTimeRef.current = null;
          }
        });
      },
      {
        threshold: 0.5 // Ad must be 50% visible
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      
      // Log final metrics if needed
      // Metrics logged in development
    };
  }, [adIdentifier, metrics]);

  return { ref, metrics };
}