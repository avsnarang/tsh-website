import Admissions from '@/components/pages/Admissions';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Explore admission opportunities at The Scholars\' Home. Information on application process, eligibility, and admission requirements.',
};

export default function AdmissionsPage() {
  return (
    <Suspense fallback={null}>
      <Admissions />
    </Suspense>
  );
}

