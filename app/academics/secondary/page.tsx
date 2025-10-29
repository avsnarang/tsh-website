import Secondary from '@/pages/academics/Secondary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secondary School',
  description: 'Secondary education program at The Scholars\' Home. Preparing students for CBSE board examinations with comprehensive subject coverage.',
};

export default function SecondaryPage() {
  return <Secondary />;
}

