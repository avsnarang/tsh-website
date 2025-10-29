import SportDetails from '@/pages/co-curricular/SportDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sport Details',
  description: 'Learn more about our sports programs and register your interest.',
};

export default function SportDetailsPage({ params }: { params: { id: string } }) {
  return <SportDetails />;
}

