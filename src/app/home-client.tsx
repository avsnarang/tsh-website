'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import { Suspense, lazy } from 'react';
import { LeadershipMessage } from '@/types/leadership';

const Features = lazy(() => import('@/components/home/Features'));
const MissionVision = lazy(() => import('@/components/home/MissionVision'));
const LeaderMessages = lazy(() => import('@/components/home/LeaderMessages'));
const Achievements = lazy(() => import('@/components/home/Achievements'));
const CampusLife = lazy(() => import('@/components/home/CampusLife'));
const Testimonials = lazy(() => import('@/components/testimonials/Testimonials'));

interface HomeClientProps {
  messages: LeadershipMessage[];
}

export default function HomeClient({ messages }: HomeClientProps) {
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
          messages={messages} 
          isLoading={false} 
        />
        <MissionVision />
        <Achievements />
        <CampusLife />
        <Testimonials />
      </motion.div>
    </Suspense>
  );
}

