import Vision from '@/pages/about/Vision';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Vision & Mission',
  description: 'Discover The Scholars\' Home\'s vision for educational excellence and our mission to nurture future leaders.',
};

export default function VisionPage() {
  return <Vision />;
}

