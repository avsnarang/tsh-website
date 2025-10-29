import Primary from '@/pages/academics/Primary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Primary School',
  description: 'Primary education program at The Scholars\' Home. Building strong foundations through comprehensive curriculum and personalized attention.',
};

export default function PrimaryPage() {
  return <Primary />;
}

