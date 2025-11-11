import Gallery from '@/components/pages/Gallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse through our photo gallery showcasing campus life and events at The Scholars\' Home.',
};

export default function GalleryPage() {
  return <Gallery />;
}

