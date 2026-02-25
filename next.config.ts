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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Aggressive image optimization
    minimumCacheTTL: 31536000, // 1 year cache
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  transpilePackages: ['react-icons', 'posthog-js'],

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@tanstack/react-query',
      '@supabase/supabase-js',
      'posthog-js',
      '@fullcalendar/react',
      '@fullcalendar/daygrid',
      '@fullcalendar/list',
      '@fullcalendar/interaction',
    ],
  },

  // Prevent server-only packages from being bundled on client
  serverExternalPackages: ['googleapis', '@google-cloud/storage', 'sharp', 'prisma', '@prisma/client'],

  // HTTP Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

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
