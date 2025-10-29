import VisualArts from '@/pages/co-curricular/VisualArts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visual Arts',
  description: 'Visual arts program at The Scholars\' Home. Nurturing creativity through various art forms and modern techniques.',
};

export default function VisualArtsPage() {
  return <VisualArts />;
}

