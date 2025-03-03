import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Hero2 from '../components/home/Hero-2';
import type { LeaderMessage, Testimonial } from '../types/components';
import { Suspense, lazy } from 'react';

// Import components after creating them
const Features = lazy(() => import('../components/home/Features'));
const MissionVision = lazy(() => import('../components/home/MissionVision'));
const LeaderMessages = lazy(() => import('../components/home/LeaderMessages'));
const Achievements = lazy(() => import('../components/home/Achievements'));
const CampusLife = lazy(() => import('../components/campus/CampusLife'));
const Testimonials = lazy(() => import('../components/testimonials/Testimonials'));

interface AlumniProfile {
  id: string;
  full_name: string;
  occupation: string;
  company: string | null;
  profile_picture_url: string | null;
  testimonial: string;
}

interface TestimonialResponse {
  alumni_profiles: AlumniProfile;
}

export default function Home() {
  const [messages, setMessages] = useState<LeaderMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Prefetch data when component mounts
  useEffect(() => {
    const prefetchData = async () => {
      const promises = [
        supabase.from('leadership_messages').select('*').order('order', { ascending: true }),
        supabase.from('featured_testimonials').select(`
          alumni_profiles (
            id, full_name, occupation, company, profile_picture_url, testimonial
          )
        `).eq('is_visible', true).limit(6)
      ];

      try {
        const [messagesResponse, testimonialsResponse] = await Promise.all(promises);
        
        if (messagesResponse.error) throw messagesResponse.error;
        if (testimonialsResponse.error) throw testimonialsResponse.error;

        setMessages(messagesResponse.data || []);
        
        const responseData = testimonialsResponse.data as unknown as TestimonialResponse[];
        const transformedTestimonials = responseData
          .map(item => ({
            id: item.alumni_profiles.id,
            name: item.alumni_profiles.full_name,
            role: `${item.alumni_profiles.occupation}${item.alumni_profiles.company ? ` at ${item.alumni_profiles.company}` : ''}`,
            content: item.alumni_profiles.testimonial,
            photo_url: item.alumni_profiles.profile_picture_url || undefined
          }))
          .filter(item => item.id && item.name && item.content);

        setTestimonials(transformedTestimonials);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    prefetchData();
  }, []);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    }>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero2 />
        <Features />
        <MissionVision />
        <LeaderMessages />
        <Achievements />
        <CampusLife messages={messages} loading={isLoading} />
        <Testimonials />
      </motion.div>
    </Suspense>
  );
}
