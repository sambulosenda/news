'use client';

import { useEffect, useState } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
}

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  inp?: number; // INP replaced FID
  cls?: number;
  ttfb?: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [showDevDisplay, setShowDevDisplay] = useState(false);

  useEffect(() => {
    const reportWebVitals = (metric: WebVitalsMetric) => {
      // Update local state for dev display
      if (process.env.NODE_ENV === 'development') {
        setMetrics(prev => ({
          ...prev,
          [metric.name.toLowerCase()]: metric.value
        }));
        setShowDevDisplay(true);
        console.log('Web Vitals:', metric);
      }

      // Send to analytics service in production
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && window.gtag) {
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
    }).catch(() => {
      // Fallback if web-vitals fails to load
      console.warn('Web vitals library not available');
    });
  }, []);

  // Development mode performance display
  if (process.env.NODE_ENV === 'development' && showDevDisplay) {
    const getScoreColor = (metric: string, value?: number) => {
      if (!value) return 'text-gray-400';
      
      const thresholds = {
        fcp: { good: 1800, poor: 3000 },
        lcp: { good: 2500, poor: 4000 },
        inp: { good: 200, poor: 500 }, // INP thresholds
        cls: { good: 0.1, poor: 0.25 },
        ttfb: { good: 800, poor: 1800 }
      };

      const threshold = thresholds[metric as keyof typeof thresholds];
      if (!threshold) return 'text-gray-400';

      if (value <= threshold.good) return 'text-green-600';
      if (value <= threshold.poor) return 'text-yellow-600';
      return 'text-red-600';
    };

    const formatValue = (metric: string, value?: number) => {
      if (!value) return '-';
      if (metric === 'cls') return value.toFixed(3);
      return Math.round(value) + 'ms';
    };

    const getScoreEmoji = (metric: string, value?: number) => {
      if (!value) return '⭕';
      
      const thresholds = {
        fcp: { good: 1800, poor: 3000 },
        lcp: { good: 2500, poor: 4000 },
        inp: { good: 200, poor: 500 },
        cls: { good: 0.1, poor: 0.25 },
        ttfb: { good: 800, poor: 1800 }
      };

      const threshold = thresholds[metric as keyof typeof thresholds];
      if (!threshold) return '⭕';

      if (value <= threshold.good) return '🟢';
      if (value <= threshold.poor) return '🟡';
      return '🔴';
    };

    return (
      <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-xs z-50 max-w-xs">
        <div className="font-bold mb-2 text-gray-800 flex items-center gap-2">
          ⚡ Performance Metrics
          <button 
            onClick={() => setShowDevDisplay(false)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {[
            { key: 'fcp', label: 'FCP', target: '< 1.8s', description: 'First Contentful Paint' },
            { key: 'lcp', label: 'LCP', target: '< 2.5s', description: 'Largest Contentful Paint' },
            { key: 'inp', label: 'INP', target: '< 200ms', description: 'Interaction to Next Paint' },
            { key: 'cls', label: 'CLS', target: '< 0.1', description: 'Cumulative Layout Shift' },
            { key: 'ttfb', label: 'TTFB', target: '< 800ms', description: 'Time to First Byte' }
          ].map(({ key, label, target, description }) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{label}:</span>
                <div className="flex items-center gap-1">
                  <span className={`font-mono ${getScoreColor(key, metrics[key as keyof PerformanceMetrics])}`}>
                    {formatValue(key, metrics[key as keyof PerformanceMetrics])}
                  </span>
                  <span className="text-sm">
                    {getScoreEmoji(key, metrics[key as keyof PerformanceMetrics])}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-xs">
                {description} • Target: {target}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200 text-gray-500 text-xs">
          🟢 Good | 🟡 Needs Improvement | 🔴 Poor
        </div>
      </div>
    );
  }

  return null; // This component doesn't render anything in production
}

// Add types for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}