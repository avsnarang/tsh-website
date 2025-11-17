import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.tsh.edu.in',
      },
    ],
  },
  transpilePackages: ['react-icons'],

  // Force webpack usage instead of Turbopack
  webpack: (config, { isServer }) => {
    return config;
  },

  // Add empty turbopack config to silence the error when using webpack
  turbopack: {},

  // PostHog reverse proxy - using non-obvious path to avoid blocking
  // Using a unique path instead of generic /ingest, /analytics, etc.
  async rewrites() {
    return [
      {
        source: '/tsh-2024-data/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/tsh-2024-data/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
