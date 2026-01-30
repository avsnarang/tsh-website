import Admissions from '@/components/pages/Admissions';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { admissionFAQSchema, admissionHowToSchema } from '@/lib/schemas/geoSchemas';

export const metadata: Metadata = {
  title: 'Admissions 2026-27 | Apply Now',
  description: 'Apply for admission at The Scholars\' Home, Paonta Sahib. CBSE school admissions open for 2026-27 academic year. Learn about eligibility, required documents, fee structure, and admission process for Nursery to Class 12.',
  keywords: [
    'school admission 2024',
    'school admission 2025',
    'school admission 2026',
    'CBSE admission Paonta Sahib',
    'nursery admission Himachal',
    'school admission process',
    'TSH admissions',
    'best school admission',
    'paonta sahib school admission',
    'schools in paonta sahib',
    'schools in himachal pradesh',
    'schools near me',
    'schools in india',
    'best school in paonta sahib',
    'best school in himachal pradesh',
    'best school near me',
    'best school in india',
  ],
  alternates: {
    canonical: 'https://tsh.edu.in/admissions',
  },
  openGraph: {
    title: 'Admissions Open 2026-27 | The Scholars\' Home',
    description: 'Apply now for admission at The Scholars\' Home. CBSE affiliated school in Paonta Sahib offering quality education from Nursery to Class 12.',
    url: 'https://tsh.edu.in/admissions',
    type: 'website',
  },
};

export default function AdmissionsPage() {
  return (
    <>
      {/* GEO-optimized schemas for AI search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [admissionFAQSchema, admissionHowToSchema]
          }),
        }}
      />
      <Suspense fallback={null}>
        <Admissions />
      </Suspense>
    </>
  );
}

