import ClubsSocieties from '@/components/pages/co-curricular/ClubsSocieties';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clubs & Societies',
  description: 'Explore our diverse clubs and societies. Fostering interests and building communities through extra-curricular activities.',
};

export default function ClubsSocietiesPage() {
  return <ClubsSocieties />;
}

