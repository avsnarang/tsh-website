import Faculty from '@/components/pages/Faculty';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Faculty',
  description: 'Meet our experienced and dedicated teachers who shape the future of our students at The Scholars\' Home.',
};

export default function FacultyPage() {
  return <Faculty />;
}

