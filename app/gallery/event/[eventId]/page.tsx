import EventGallery from '@/pages/EventGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Gallery',
  description: 'View photos from this event.',
};

export default async function EventGalleryPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return <EventGallery />;
}

