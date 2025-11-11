import YouTubeGallery from '@/components/pages/YouTubeGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Gallery',
  description: 'Watch videos showcasing campus life and events at The Scholars\' Home.',
};

export default function VideoGalleryPage() {
  return <YouTubeGallery />;
}

