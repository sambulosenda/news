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