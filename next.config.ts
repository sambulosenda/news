import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // For Docker deployment
  
  // Aggressive caching for news site performance
  staticPageGenerationTimeout: 180, // 3 minutes for complex pages
  
  // Enable partial prerendering for breaking news
  experimental: {
    ppr: false, // Will enable when stable
    optimizeCss: true,
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
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize client bundle
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module: any) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module: any) {
              const hash = require('crypto').createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module: any, chunks: any) {
              return require('crypto')
                .createHash('sha1')
                .update(chunks.reduce((acc: string, chunk: any) => acc + chunk.name, ''))
                .digest('hex')
                .substring(0, 8);
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
        maxAsyncRequests: 25,
        maxInitialRequests: 25,
      };
    }
    return config;
  },
  
  // Redirects for domain consolidation
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'backend.reportfocusnews.com',
          },
        ],
        destination: 'https://reportfocusnews.com/:path*',
        permanent: true,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      // Cache static assets
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      // Security headers for all routes
      // Aggressive CDN caching for news content
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=30, stale-while-revalidate=59',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=30',
          },
        ],
      },
      {
        source: '/news/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=119',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
