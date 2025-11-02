import SportDetails from '@/pages/co-curricular/SportDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sport Details',
  description: 'Learn more about our sports programs and register your interest.',
};

export default async function SportDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SportDetails />;
}

