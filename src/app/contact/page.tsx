import Contact from '@/components/pages/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact The Scholars\' Home in Paonta Sahib, Himachal Pradesh. Reach our admissions team at +91-8628800056 or email info@tsh.edu.in. Visit our campuses for inquiries.',
  keywords: ['contact TSH', 'The Scholars Home contact', 'school admissions Paonta Sahib', 'CBSE school contact'],
};

export default function ContactPage() {
  return <Contact />;
}

