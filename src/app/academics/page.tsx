import Academics from '@/components/pages/Academics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore The Scholars\' Home academic programs from pre-primary to Class 12. CBSE curriculum, smart classrooms, experienced faculty, and focus on holistic development.',
  keywords: ['CBSE curriculum', 'academic programs TSH', 'school education Paonta Sahib', 'pre-primary to senior secondary'],
};

export default function AcademicsPage() {
  return <Academics />;
}

