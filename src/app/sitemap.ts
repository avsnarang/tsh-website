import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// Priority and change frequency configuration for different route types
const routeConfig: Record<string, { priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }> = {
  // Homepage - highest priority
  '': { priority: 1.0, changeFrequency: 'daily' },

  // Core landing pages - high priority
  '/about': { priority: 0.9, changeFrequency: 'monthly' },
  '/admissions': { priority: 0.95, changeFrequency: 'weekly' },
  '/contact': { priority: 0.9, changeFrequency: 'monthly' },
  '/campuses': { priority: 0.9, changeFrequency: 'monthly' },
  '/academics': { priority: 0.9, changeFrequency: 'monthly' },
  '/scholarship': { priority: 0.9, changeFrequency: 'monthly' },

  // Campus pages - high priority (important for local SEO)
  '/campus/paonta-sahib': { priority: 0.9, changeFrequency: 'monthly' },
  '/campus/juniors': { priority: 0.9, changeFrequency: 'monthly' },
  '/campus/majra': { priority: 0.9, changeFrequency: 'monthly' },

  // About sub-pages
  '/about/vision': { priority: 0.8, changeFrequency: 'monthly' },
  '/about/messages': { priority: 0.8, changeFrequency: 'monthly' },

  // Academics pages
  '/academics/pre-primary': { priority: 0.85, changeFrequency: 'monthly' },
  '/academics/primary': { priority: 0.85, changeFrequency: 'monthly' },
  '/academics/middle': { priority: 0.85, changeFrequency: 'monthly' },
  '/academics/secondary': { priority: 0.85, changeFrequency: 'monthly' },
  '/academics/senior-secondary': { priority: 0.85, changeFrequency: 'monthly' },

  // Co-curricular pages
  '/co-curricular': { priority: 0.8, changeFrequency: 'monthly' },
  '/co-curricular/performing-arts': { priority: 0.75, changeFrequency: 'monthly' },
  '/co-curricular/sports-athletics': { priority: 0.75, changeFrequency: 'monthly' },
  '/co-curricular/visual-arts': { priority: 0.75, changeFrequency: 'monthly' },
  '/co-curricular/clubs-societies': { priority: 0.75, changeFrequency: 'monthly' },

  // Alumni and community pages
  '/alumni': { priority: 0.7, changeFrequency: 'monthly' },
  '/alumni/register': { priority: 0.7, changeFrequency: 'monthly' },
  '/alumni/success': { priority: 0.7, changeFrequency: 'weekly' },

  // Gallery and media
  '/gallery': { priority: 0.75, changeFrequency: 'weekly' },
  '/video-gallery': { priority: 0.7, changeFrequency: 'weekly' },

  // Other pages
  '/faculty': { priority: 0.8, changeFrequency: 'monthly' },
  '/calendar': { priority: 0.7, changeFrequency: 'weekly' },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tsh.edu.in';
  const currentDate = new Date();

  // Static routes with proper configuration
  const staticRoutes = Object.entries(routeConfig).map(([route, config]) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: config.changeFrequency,
    priority: config.priority,
  }));

  // Fetch dynamic routes (gallery events, sports, etc.)
  // Use a simple client without cookies for static generation
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Missing Supabase environment variables, returning static routes only');
      return staticRoutes;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
    
    const [eventsRes, sportsRes] = await Promise.all([
      supabase.from('gallery_events').select('id, updated_at').eq('is_visible', true),
      supabase.from('sports').select('id, updated_at')
    ]);

    const eventRoutes = (eventsRes.data || []).map(event => ({
      url: `${baseUrl}/gallery/event/${event.id}`,
      lastModified: new Date(event.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const sportRoutes = (sportsRes.data || []).map(sport => ({
      url: `${baseUrl}/co-curricular/sports-athletics/${sport.id}`,
      lastModified: new Date(sport.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...eventRoutes, ...sportRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}

