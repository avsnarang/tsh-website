import Academics from '@/pages/Academics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore our comprehensive academic programs from pre-primary to senior secondary. CBSE curriculum with focus on holistic development and excellence.',
};

export default function AcademicsPage() {
  return <Academics />;
}

