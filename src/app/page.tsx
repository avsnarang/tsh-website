import { createServerSupabaseClient } from '@/lib/supabase-server';
import HomeClient from './home-client';
import { LeadershipMessage } from '@/types/leadership';
import type { Metadata } from 'next';

// Cache the page data for faster subsequent loads
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "The Scholars' Home | Best CBSE School in Paonta Sahib, Himachal Pradesh",
  description: "The Scholars' Home is the best school in Paonta Sahib offering CBSE education from Nursery to Class 12. Award-winning academics, 28-acre campus, smart classrooms, and 20+ years of excellence.",
  keywords: [
    'best school in Paonta Sahib',
    'best CBSE school Himachal Pradesh',
    'top school in Paonta Sahib',
    'The Scholars Home',
    'TSH Paonta Sahib',
    'CBSE school Paonta Sahib',
    'best English medium school Paonta Sahib',
    'schools near me',
  ],
  alternates: {
    canonical: 'https://tsh.edu.in',
  },
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

  return <HomeClient messages={data.messages} testimonials={data.testimonials} />;
}

