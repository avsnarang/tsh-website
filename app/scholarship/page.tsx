import Scholarship from '@/pages/Scholarship';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scholarships',
  description: 'Explore scholarship opportunities at The Scholars\' Home. Merit-based and need-based financial aid programs for deserving students.',
};

export default function ScholarshipPage() {
  return <Scholarship />;
}

