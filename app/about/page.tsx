import About from '@/components/about/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Scholars\' Home - our history, mission, and commitment to excellence in education since 2003.',
};

export default function AboutPage() {
  return <About />;
}

