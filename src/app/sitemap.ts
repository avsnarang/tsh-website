type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

type Sitemap = SitemapEntry[];

export default function sitemap(): Sitemap {
  return [
    {
      url: 'https://tsh.edu.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://tsh.edu.in/admissions',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://tsh.edu.in/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://tsh.edu.in/campuses',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://tsh.edu.in/academics',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://tsh.edu.in/co-curricular',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://tsh.edu.in/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly', 
      priority: 0.8
    },
    {
      url: 'https://tsh.edu.in/scholarship',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://tsh.edu.in/campus/paonta-sahib',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/campus/juniors',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/campus/majra',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/about/vision',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/about/messages',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/academics/pre-primary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/academics/primary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/academics/middle',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/academics/secondary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/academics/senior-secondary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/co-curricular/performing-arts',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/co-curricular/sports-athletics',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/co-curricular/visual-arts',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/co-curricular/clubs-societies',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/alumni',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/alumni/success',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://tsh.edu.in/gallery',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ];
}
