import AlumniRegister from '@/pages/alumni/AlumniRegister';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni Registration',
  description: 'Register to join The Scholars\' Home alumni network.',
};

export default function AlumniRegisterPage() {
  return <AlumniRegister />;
}

