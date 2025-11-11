import AlumniNetwork from '@/components/pages/alumni/AlumniNetwork';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni Network',
  description: 'Join our alumni network to connect with fellow graduates and share your success stories.',
};

export default function AlumniPage() {
  return <AlumniNetwork />;
}

