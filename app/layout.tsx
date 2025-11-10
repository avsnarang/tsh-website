import type { Metadata, Viewport } from 'next';
import { Montserrat, Lilita_One, Homemade_Apple, Caveat_Brush } from 'next/font/google';
import '../src/styles/index.css';
import '../src/styles/globals.css';
import '../src/styles/calendar.css';
import { Providers } from './providers';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import MetaPixel from '@/components/analytics/MetaPixel';
import UTMTracker from '@/components/analytics/UTMTracker';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';

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

const homemadeApple = Homemade_Apple({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-homemade-apple',
  display: 'swap',
});

const caveatBrush = Caveat_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-caveat-brush',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

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
    <html lang="en" className={`${montserrat.variable} ${lilitaOne.variable} ${homemadeApple.variable} ${caveatBrush.variable}`} suppressHydrationWarning>
      <body className="font-body">
        <PostHogProvider>
          <Providers>
            {children}
          </Providers>
        </PostHogProvider>
        <SpeedInsights />
        <Analytics />
        <UTMTracker />
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        )}
      </body>
    </html>
  );
}