import CampusHome from '@/pages/campus/CampusHome';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campus Details',
  description: 'Explore our campus facilities, features, and achievements.',
};

export default async function CampusPage({ params }: { params: Promise<{ campus: string }> }) {
  const { campus } = await params;
  return <CampusHome />;
}

