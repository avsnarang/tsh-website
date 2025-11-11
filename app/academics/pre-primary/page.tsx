import PrePrimary from '@/components/pages/academics/PrePrimary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pre-Primary Education',
  description: 'Early childhood education program at The Scholars\' Home. Nurturing young minds through play-based learning and holistic development.',
};

export default function PrePrimaryPage() {
  return <PrePrimary />;
}

