import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.reportfocusnews.com',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // PPR only available in canary builds - uncomment when using next@canary
    // ppr: true,
    // Enable optimized CSS loading
    optimizeCss: true,
  },
  // Optimize bundle
  swcMinify: true,
  // Add compression
  compress: true,
  // Optimize server components
  serverComponentsExternalPackages: ['@apollo/client'],
};

export default nextConfig;
