import type { Metadata } from 'next';
import { Montserrat, Lilita_One } from 'next/font/google';
import '../src/styles/globals.css';
import { Providers } from './providers';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tsh.edu.in'),
  title: {
    default: "The Scholars' Home | Excellence in Education Since 2003",
    template: "%s | The Scholars' Home"
  },
  description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education from pre-primary to senior secondary levels.",
  keywords: ['CBSE school', 'education', 'scholars home', 'school in India', 'holistic education', 'pre-primary', 'secondary education'],
  authors: [{ name: "The Scholars' Home" }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tsh.edu.in',
    siteName: "The Scholars' Home",
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "The Scholars' Home",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lilitaOne.variable}`} suppressHydrationWarning>
      <body className="font-body">
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

