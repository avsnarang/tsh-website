'use client';

import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import MissionVision from '@/components/home/MissionVision';
import LeaderMessages from '@/components/home/LeaderMessages';
import Achievements from '@/components/home/Achievements';
import CampusLife from '@/components/home/CampusLife';
import Testimonials from '@/components/testimonials/Testimonials';
import { LeadershipMessage } from '@/types/leadership';

interface AlumniProfile {
  id: string;
  full_name: string;
  occupation: string;
  company: string;
  profile_picture_url?: string;
  testimonial: string;
}

interface TestimonialData {
  alumni_profiles: AlumniProfile | AlumniProfile[];
}

interface HomeClientProps {
  messages: LeadershipMessage[];
  testimonials: TestimonialData[];
}

export default function HomeClient({ messages, testimonials }: HomeClientProps) {
  // Transform testimonials data from nested structure
  const transformedTestimonials = testimonials
    .flatMap(item => {
      const profiles = item.alumni_profiles;
      return Array.isArray(profiles) ? profiles : [profiles];
    })
    .filter((profile): profile is AlumniProfile => profile !== null && profile !== undefined);

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <LeaderMessages
        messages={messages}
        isLoading={false}
      />
      <MissionVision />
      <Achievements />
      <CampusLife />
      <Testimonials testimonials={transformedTestimonials} />
    </div>
  );
}

