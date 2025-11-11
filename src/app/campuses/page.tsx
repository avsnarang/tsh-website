import Campuses from '@/components/pages/Campuses';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Campuses',
  description: 'Explore The Scholars\' Home campuses with world-class facilities and infrastructure.',
};

export default function CampusesPage() {
  return <Campuses />;
}

