import type { Metadata, Viewport } from 'next';
import { Montserrat, Lilita_One, Homemade_Apple, Caveat_Brush } from 'next/font/google';
import '../styles/index.css';
import '../styles/calendar.css';
import { Providers } from './providers';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import MetaPixel from '@/components/analytics/MetaPixel';

// Preload critical fonts with optimal settings
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita',
  display: 'swap',
  preload: true,
  fallback: ['cursive'],
});

// These fonts are less critical - can load after
const homemadeApple = Homemade_Apple({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-homemade-apple',
  display: 'optional', // Falls back immediately if not loaded
  preload: false,
  fallback: ['cursive'],
});

const caveatBrush = Caveat_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-caveat-brush',
  display: 'optional', // Falls back immediately if not loaded
  preload: false,
  fallback: ['cursive'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tsh.edu.in'),
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
    url: 'https://www.tsh.edu.in',
    siteName: "The Scholars' Home",
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development.",
    images: [
      {
        url: 'https://www.tsh.edu.in/og-image.jpg',
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
    images: ['https://www.tsh.edu.in/og-image.jpg'],
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
    <html lang="en" className={`${montserrat.variable} ${lilitaOne.variable} ${homemadeApple.variable} ${caveatBrush.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical domains for faster resource loading */}
        <link rel="preconnect" href="https://images.tsh.edu.in" />
        <link rel="dns-prefetch" href="https://images.tsh.edu.in" />
        {/* Preload hero image for instant display */}
        <link 
          rel="preload" 
          href="https://images.tsh.edu.in/homepage/hero.jpeg" 
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="font-body">
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        )}
      </body>
    </html>
  );
}