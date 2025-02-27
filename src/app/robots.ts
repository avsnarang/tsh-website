import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-portal/', '/alumni/profile/'],
    },
    sitemap: 'https://tsh.edu.in/sitemap.xml',
  };
}