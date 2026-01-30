import About from '@/components/about/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Scholars\' Home - a premier CBSE school in Paonta Sahib since 2003. Our mission is holistic education combining academics, sports, and character building.',
  keywords: ['about TSH', 'The Scholars Home history', 'CBSE school mission', 'education excellence', ],
  alternates: {
    canonical: 'https://tsh.edu.in/about',
  },
  openGraph: {
    title: 'About Us - The Scholars\' Home',
    description: 'Learn about The Scholars\' Home - a premier CBSE school in Paonta Sahib since 2003. Our mission is holistic education combining academics, sports, and character building.',
    url: 'https://tsh.edu.in/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - The Scholars\' Home',
    description: 'Learn about The Scholars\' Home - a premier CBSE school in Paonta Sahib since 2003. Our mission is holistic education combining academics, sports, and character building.',
    images: ['https://tsh.edu.in/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function AboutPage() {
  return <About />;
}

