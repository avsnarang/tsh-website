import AlumniSuccess from '@/pages/alumni/AlumniSuccess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni Success Stories',
  description: 'Discover inspiring success stories from The Scholars\' Home alumni community.',
};

export default function AlumniSuccessPage() {
  return <AlumniSuccess />;
}

