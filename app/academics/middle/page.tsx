import Middle from '@/pages/academics/Middle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Middle School',
  description: 'Middle school education at The Scholars\' Home. Comprehensive curriculum preparing students for secondary education.',
};

export default function MiddlePage() {
  return <Middle />;
}

