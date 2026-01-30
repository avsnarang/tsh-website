import Blog from '@/components/blog/Blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Education Insights & Resources',
  description: 'Read expert articles on education, parenting tips, CBSE exam preparation, career guidance, and school news from The Scholars\' Home.',
  keywords: [
    'education blog',
    'parenting tips',
    'CBSE exam preparation',
    'school admission guide',
    'career guidance students',
    'The Scholars Home blog',
    'education insights Himachal Pradesh',
  ],
  alternates: {
    canonical: 'https://tsh.edu.in/blog',
    types: {
      'application/rss+xml': 'https://tsh.edu.in/blog/feed.xml',
    },
  },
  openGraph: {
    title: 'Blog - Education Insights & Resources | The Scholars\' Home',
    description: 'Expert articles on education, parenting, exam preparation, and school news.',
    url: 'https://tsh.edu.in/blog',
    type: 'website',
    images: [
      {
        url: 'https://tsh.edu.in/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'The Scholars\' Home Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Education Insights | The Scholars\' Home',
    description: 'Expert articles on education, parenting, and exam preparation.',
  },
};

export default function BlogPage() {
  return <Blog />;
}
