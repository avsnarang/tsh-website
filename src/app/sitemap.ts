import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tsh.edu.in';
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/about/vision',
    '/about/messages',
    '/academics',
    '/academics/pre-primary',
    '/academics/primary',
    '/academics/middle',
    '/academics/secondary',
    '/academics/senior-secondary',
    '/admissions',
    '/campuses',
    '/contact',
    '/faculty',
    '/scholarship',
    '/calendar',
    '/co-curricular',
    '/co-curricular/performing-arts',
    '/co-curricular/sports-athletics',
    '/co-curricular/visual-arts',
    '/co-curricular/clubs-societies',
    '/alumni',
    '/alumni/register',
    '/gallery',
    '/video-gallery',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic routes (gallery events, sports, etc.)
  try {
    const supabase = await createServerSupabaseClient();
    
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

