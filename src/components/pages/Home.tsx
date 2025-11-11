import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Hero from '@/components/home/Hero';
import { Suspense, lazy } from 'react';
import { LeadershipMessage } from '@/types/leadership';

// Import components after creating them
const Features = lazy(() => import('@/components/home/Features'));
const MissionVision = lazy(() => import('@/components/home/MissionVision'));
const LeaderMessages = lazy(() => import('@/components/home/LeaderMessages'));
const Achievements = lazy(() => import('@/components/home/Achievements'));
const CampusLife = lazy(() => import('@/components/home/CampusLife'));
const Testimonials = lazy(() => import('@/components/testimonials/Testimonials'));

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
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
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

        // Transform the messages data to match the expected format
        const transformedMessages: LeadershipMessage[] = (messagesResponse.data || []).map(message => ({
          id: message.id,
          name: message.name,
          role: message.role,
          photo_url: message.photo_url,
          preview: message.preview,
          fullMessage: message.full_message,
          display_locations: message.display_locations
        }));

        setMessages(transformedMessages);
        
        // Remove testimonial transformation since it's not being used
        const responseData = testimonialsResponse.data as unknown as TestimonialResponse[];
        console.log('Testimonials data loaded:', responseData.length);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    prefetchData();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Features />
        <LeaderMessages 
          messages={messages as unknown as LeadershipMessage[]} 
          isLoading={isLoading} 
        />
        <MissionVision />
        <Achievements />
        <CampusLife />
        <Testimonials />
      </motion.div>
    </Suspense>
  );
}
