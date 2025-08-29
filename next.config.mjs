import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  output: 'standalone', // For Docker deployment
  
  // Aggressive caching for news site performance
  staticPageGenerationTimeout: 180, // 3 minutes for complex pages
  
  // Enable partial prerendering for breaking news
  experimental: {
    webpackBuildWorker: true, // Faster builds
  },
  eslint: {
    // Run ESLint during builds to catch errors early
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.reportfocusnews.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'backend.reportfocusnews.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'reportfocusnews.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.reportfocusnews.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newsreportfocus.b-cdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/img/**',
      },
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
        pathname: '/img/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for immutable images
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googletagmanager.com https://*.google-analytics.com https://*.doubleclick.net https://pagead2.googlesyndication.com https://adservice.google.com https://*.googleadservices.com https://tpc.googlesyndication.com https://*.sentry.io https://*.sentry-cdn.com",
              "style-src 'self' 'unsafe-inline' https://*.googleapis.com https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data: https://*.gstatic.com https://fonts.gstatic.com",
              "connect-src 'self' https://*.google.com https://*.googleapis.com https://*.google-analytics.com https://*.googletagmanager.com https://*.doubleclick.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.sentry.io https://backend.reportfocusnews.com https://newsreportfocus.b-cdn.net https://api.openweathermap.org https://*.algolia.net https://*.algolianet.com https://www.alphavantage.co https://api.exchangerate-api.com wss://*.sentry.io",
              "frame-src 'self' https://*.google.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com",
              "media-src 'self' blob: data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ') + ';'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          {
            key: 'Expect-CT',
            value: 'enforce, max-age=86400'
          },
          {
            key: 'X-Download-Options',
            value: 'noopen'
          },
        ],
      },
      // Cache control for static assets
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      // Security headers for API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      // Optimize client bundle
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.reportfocusnews.com',
          },
        ],
        destination: 'https://reportfocusnews.com/:path*',
        permanent: true,
      },
    ];
  },

};

// Sentry configuration wrapper
const sentryWebpackPluginOptions = {
  // Organization and project from your Sentry account
  org: process.env.SENTRY_ORG || "report-focus-news",
  project: process.env.SENTRY_PROJECT || "news-website",

  // Auth token for uploading source maps
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Suppresses source map uploading logs during build
  silent: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically release tracking
  release: {
    create: true,
    finalize: true,
    deploy: {
      env: process.env.NODE_ENV || 'development',
    },
  },

  // Disables Sentry CLI logs
  disableLogger: true,
};

// Export with Sentry wrapper
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);