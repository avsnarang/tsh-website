// Breadcrumb structured data for SEO
// Helps search engines understand site hierarchy and navigation

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = 'https://tsh.edu.in';

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

// Predefined breadcrumb configurations for common pages
export const breadcrumbConfigs: Record<string, BreadcrumbItem[]> = {
  // About section
  'about': [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ],
  'about/vision': [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Vision & Mission', url: '/about/vision' }
  ],
  'about/messages': [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Messages', url: '/about/messages' }
  ],

  // Academics section
  'academics': [
    { name: 'Home', url: '/' },
    { name: 'Academics', url: '/academics' }
  ],
  'academics/pre-primary': [
    { name: 'Home', url: '/' },
    { name: 'Academics', url: '/academics' },
    { name: 'Pre-Primary', url: '/academics/pre-primary' }
  ],
  'academics/primary': [
    { name: 'Home', url: '/' },
    { name: 'Academics', url: '/academics' },
    { name: 'Primary', url: '/academics/primary' }
  ],
  'academics/middle': [
    { name: 'Home', url: '/' },
    { name: 'Academics', url: '/academics' },
    { name: 'Middle School', url: '/academics/middle' }
  ],
  'academics/secondary': [
    { name: 'Home', url: '/' },
    { name: 'Academics', url: '/academics' },
    { name: 'Secondary', url: '/academics/secondary' }
  ],
  'academics/senior-secondary': [
    { name: 'Home', url: '/' },
    { name: 'Academics', url: '/academics' },
    { name: 'Senior Secondary', url: '/academics/senior-secondary' }
  ],

  // Campus section
  'campuses': [
    { name: 'Home', url: '/' },
    { name: 'Our Campuses', url: '/campuses' }
  ],
  'campus/paonta-sahib': [
    { name: 'Home', url: '/' },
    { name: 'Our Campuses', url: '/campuses' },
    { name: 'Paonta Sahib', url: '/campus/paonta-sahib' }
  ],
  'campus/juniors': [
    { name: 'Home', url: '/' },
    { name: 'Our Campuses', url: '/campuses' },
    { name: 'Juniors', url: '/campus/juniors' }
  ],
  'campus/majra': [
    { name: 'Home', url: '/' },
    { name: 'Our Campuses', url: '/campuses' },
    { name: 'Majra', url: '/campus/majra' }
  ],

  // Co-curricular section
  'co-curricular': [
    { name: 'Home', url: '/' },
    { name: 'Co-Curricular', url: '/co-curricular' }
  ],
  'co-curricular/performing-arts': [
    { name: 'Home', url: '/' },
    { name: 'Co-Curricular', url: '/co-curricular' },
    { name: 'Performing Arts', url: '/co-curricular/performing-arts' }
  ],
  'co-curricular/sports-athletics': [
    { name: 'Home', url: '/' },
    { name: 'Co-Curricular', url: '/co-curricular' },
    { name: 'Sports & Athletics', url: '/co-curricular/sports-athletics' }
  ],
  'co-curricular/visual-arts': [
    { name: 'Home', url: '/' },
    { name: 'Co-Curricular', url: '/co-curricular' },
    { name: 'Visual Arts', url: '/co-curricular/visual-arts' }
  ],
  'co-curricular/clubs-societies': [
    { name: 'Home', url: '/' },
    { name: 'Co-Curricular', url: '/co-curricular' },
    { name: 'Clubs & Societies', url: '/co-curricular/clubs-societies' }
  ],

  // Alumni section
  'alumni': [
    { name: 'Home', url: '/' },
    { name: 'Alumni', url: '/alumni' }
  ],
  'alumni/register': [
    { name: 'Home', url: '/' },
    { name: 'Alumni', url: '/alumni' },
    { name: 'Register', url: '/alumni/register' }
  ],
  'alumni/success': [
    { name: 'Home', url: '/' },
    { name: 'Alumni', url: '/alumni' },
    { name: 'Success Stories', url: '/alumni/success' }
  ],

  // Gallery section
  'gallery': [
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' }
  ],
  'video-gallery': [
    { name: 'Home', url: '/' },
    { name: 'Video Gallery', url: '/video-gallery' }
  ],

  // Other pages
  'admissions': [
    { name: 'Home', url: '/' },
    { name: 'Admissions', url: '/admissions' }
  ],
  'contact': [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ],
  'faculty': [
    { name: 'Home', url: '/' },
    { name: 'Faculty', url: '/faculty' }
  ],
  'scholarship': [
    { name: 'Home', url: '/' },
    { name: 'Scholarship', url: '/scholarship' }
  ],
  'calendar': [
    { name: 'Home', url: '/' },
    { name: 'Calendar', url: '/calendar' }
  ]
};

// Helper to get breadcrumb schema for a given path
export function getBreadcrumbSchemaForPath(path: string) {
  // Remove leading slash for lookup
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const config = breadcrumbConfigs[cleanPath];

  if (config) {
    return generateBreadcrumbSchema(config);
  }

  return null;
}

// Helper to generate dynamic breadcrumbs for gallery events
export function generateGalleryEventBreadcrumb(eventName: string, eventId: string) {
  return generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
    { name: eventName, url: `/gallery/event/${eventId}` }
  ]);
}

// Helper to generate dynamic breadcrumbs for sports pages
export function generateSportsBreadcrumb(sportName: string, sportId: string) {
  return generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Co-Curricular', url: '/co-curricular' },
    { name: 'Sports & Athletics', url: '/co-curricular/sports-athletics' },
    { name: sportName, url: `/co-curricular/sports-athletics/${sportId}` }
  ]);
}
