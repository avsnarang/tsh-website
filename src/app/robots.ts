interface RobotsConfig {
  rules: {
    userAgent: string;
    allow: string;
    disallow: string[];
  };
  sitemap: string;
}

export default function robots(): RobotsConfig {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/alumni/profile/'],
    },
    sitemap: 'https://tsh.edu.in/sitemap.xml',
  };
}
