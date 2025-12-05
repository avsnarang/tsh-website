'use client';

import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import MissionVision from '@/components/home/MissionVision';
import LeaderMessages from '@/components/home/LeaderMessages';
import Achievements from '@/components/home/Achievements';
import CampusLife from '@/components/home/CampusLife';
import Testimonials from '@/components/testimonials/Testimonials';
import { LeadershipMessage } from '@/types/leadership';

interface HomeClientProps {
  messages: LeadershipMessage[];
}

export default function HomeClient({ messages }: HomeClientProps) {
  return (
    <>
      <Hero />
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

