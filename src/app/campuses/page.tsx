import Campuses from '@/components/pages/Campuses';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Campuses',
  description: 'Discover The Scholars\' Home campuses in Paonta Sahib, Juniors, and Majra. Modern facilities, smart classrooms, sports complexes, and science labs across Himachal Pradesh.',
  keywords: ['TSH campuses', 'school campuses Himachal Pradesh', 'Paonta Sahib school', 'best school facilities'],
};

export default function CampusesPage() {
  return <Campuses />;
}

