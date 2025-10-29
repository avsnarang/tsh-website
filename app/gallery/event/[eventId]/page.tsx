import EventGallery from '@/pages/EventGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Gallery',
  description: 'View photos from this event.',
};

export default function EventGalleryPage({ params }: { params: { eventId: string } }) {
  return <EventGallery />;
}

