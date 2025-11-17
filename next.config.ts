import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

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
  webpack: (config: Configuration, { isServer }) => {
    return config;
  },

  // Rewrites required to proxy PostHog ingestion only
  // Static assets are loaded directly from PostHog CDN to avoid SSL proxy issues
  async rewrites() {
    return [
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      // Also proxy the decide endpoint if needed (though we disable it)
      {
        source: '/decide/:path*',
        destination: 'https://us.i.posthog.com/decide/:path*',
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
