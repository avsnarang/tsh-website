'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import { LeadershipMessage } from '@/types/leadership';

// Dynamically import below-the-fold components with NO loading state for instant feel
const Features = dynamic(() => import('@/components/home/Features'), { 
  ssr: true,
  loading: () => null 
});
const MissionVision = dynamic(() => import('@/components/home/MissionVision'), { 
  ssr: true,
  loading: () => null 
});
const LeaderMessages = dynamic(() => import('@/components/home/LeaderMessages'), { 
  ssr: true,
  loading: () => null 
});
const Achievements = dynamic(() => import('@/components/home/Achievements'), { 
  ssr: true,
  loading: () => null 
});
const CampusLife = dynamic(() => import('@/components/home/CampusLife'), { 
  ssr: true,
  loading: () => null 
});
const Testimonials = dynamic(() => import('@/components/testimonials/Testimonials'), { 
  ssr: true,
  loading: () => null 
});

interface HomeClientProps {
  messages: LeadershipMessage[];
}

export default function HomeClient({ messages }: HomeClientProps) {
  return (
    <>
      {/* Hero renders immediately - no animation delay */}
      <Hero />
      {/* Below-fold content loads progressively but renders instantly when ready */}
      <Features />
      <LeaderMessages 
        messages={messages} 
        isLoading={false} 
      />
      <MissionVision />
      <Achievements />
      <CampusLife />
      <Testimonials />
    </>
  );
}

