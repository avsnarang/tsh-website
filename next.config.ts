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
};

export default nextConfig;
