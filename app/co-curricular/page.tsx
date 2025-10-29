import CoCurricular from '@/pages/CoCurricular';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Co-Curricular Activities',
  description: 'Explore our diverse co-curricular programs including performing arts, sports, visual arts, and clubs. Nurturing talents beyond academics.',
};

export default function CoCurricularPage() {
  return <CoCurricular />;
}

