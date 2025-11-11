import { createServerSupabaseClient } from '@/lib/supabase-server';
import HomeClient from './home-client';
import { LeadershipMessage } from '@/types/leadership';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Scholars' Home | Excellence in Education Since 2003",
  description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education from pre-primary to senior secondary levels.",
};

async function getHomePageData() {
  const supabase = await createServerSupabaseClient();

  try {
    const [messagesResponse, testimonialsResponse] = await Promise.all([
      supabase
        .from('leadership_messages')
        .select('*')
        .order('order', { ascending: true }),
      supabase
        .from('featured_testimonials')
        .select(`
          alumni_profiles (
            id, full_name, occupation, company, profile_picture_url, testimonial
          )
        `)
        .eq('is_visible', true)
        .limit(6)
    ]);

    const transformedMessages: LeadershipMessage[] = (messagesResponse.data || []).map(message => ({
      id: message.id,
      name: message.name,
      role: message.role,
      photo_url: message.photo_url,
      preview: message.preview,
      fullMessage: message.full_message,
      display_locations: message.display_locations
    }));

    return {
      messages: transformedMessages,
      testimonials: testimonialsResponse.data || []
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      messages: [],
      testimonials: []
    };
  }
}

export default async function HomePage() {
  const data = await getHomePageData();

  return <HomeClient messages={data.messages} />;
}

