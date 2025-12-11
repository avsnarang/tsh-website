import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tsh.edu.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-portal/',
          '/api/',
          '/alumni/profile/',
          '/alumni/directory/',
          '/_next/',
          '/private/',
          '/*.json$',
          '/*?*', // Prevent crawling URLs with query parameters
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-portal/',
          '/api/',
          '/alumni/profile/',
          '/alumni/directory/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/gallery/', '/images/', '/*.jpg', '/*.jpeg', '/*.png', '/*.webp'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-portal/',
          '/api/',
          '/alumni/profile/',
          '/alumni/directory/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

