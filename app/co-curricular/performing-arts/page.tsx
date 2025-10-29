import PerformingArts from '@/pages/co-curricular/PerformingArts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performing Arts',
  description: 'Discover our performing arts program including music, dance, and theater. Nurturing artistic talents and creative expression.',
};

export default function PerformingArtsPage() {
  return <PerformingArts />;
}

