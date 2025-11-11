import SeniorSecondary from '@/components/pages/academics/SeniorSecondary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Senior Secondary School',
  description: 'Senior secondary education at The Scholars\' Home. Specialized streams in Science, Commerce, and Humanities with expert faculty guidance.',
};

export default function SeniorSecondaryPage() {
  return <SeniorSecondary />;
}

