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
  },
  experimental: {
    // Enable if needed for production
    // ppr: true,
  },
};

export default nextConfig;
