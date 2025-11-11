import Contact from '@/components/pages/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Scholars\' Home. Contact information for all our campuses and admission inquiries.',
};

export default function ContactPage() {
  return <Contact />;
}

