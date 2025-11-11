interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

type Sitemap = SitemapEntry[];

export default function sitemap(): Sitemap {
  const baseUrl = 'https://tsh.edu.in';

  const routes = [
    '',
    '/about',
    '/about/vision',
    '/about/messages',
    '/campuses',
    '/campus/paonta-sahib',
    '/campus/juniors',
    '/campus/majra',
    '/academics',
    '/academics/pre-primary',
    '/academics/primary',
    '/academics/middle',
    '/academics/secondary',
    '/academics/senior-secondary',
    '/co-curricular',
    '/co-curricular/performing-arts',
    '/co-curricular/sports-athletics',
    '/co-curricular/visual-arts',
    '/co-curricular/clubs-societies',
    '/alumni',
    '/alumni/success',
    '/gallery',
    '/contact',
    '/admissions',
    '/scholarship'
  ];

  const sitemap: Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return sitemap;
}
