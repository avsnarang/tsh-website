import type { Metadata, Viewport } from 'next';
import { Montserrat, Lilita_One, Homemade_Apple, Caveat_Brush } from 'next/font/google';
import '../styles/index.css';
import '../styles/calendar.css';
import { Providers } from './providers';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import MetaPixel from '@/components/analytics/MetaPixel';
import { homePageSchemaGraph } from '@/lib/schemas/organizationSchema';
import { geoOptimizedHomeSchema } from '@/lib/schemas/geoSchemas';

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
    default: "The Scholars' Home | Best CBSE School in Paonta Sahib, Himachal Pradesh",
    template: "%s | The Scholars' Home"
  },
  description: "The Scholars' Home is a premier CBSE-affiliated school in Paonta Sahib, Himachal Pradesh. Offering excellence in education from pre-primary to senior secondary since 2003. Admissions open for 2024-25.",
  keywords: [
    'CBSE school Paonta Sahib',
    'best school in Himachal Pradesh',
    'The Scholars Home',
    'TSH school',
    'CBSE affiliated school',
    'pre-primary school Paonta Sahib',
    'primary school Himachal Pradesh',
    'secondary school CBSE',
    'senior secondary school',
    'holistic education India',
    'school admissions 2024',
    'quality education Himachal',
    'co-curricular activities school',
    'sports school India'
  ],
  authors: [{ name: "The Scholars' Home", url: 'https://tsh.edu.in' }],
  creator: "The Scholars' Home",
  publisher: "The Scholars' Home",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'Education',
  classification: 'Educational Institution',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://tsh.edu.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tsh.edu.in',
    siteName: "The Scholars' Home",
    title: "The Scholars' Home | Best CBSE School in Paonta Sahib",
    description: "Premier CBSE-affiliated school in Himachal Pradesh offering quality education from pre-primary to senior secondary. Admissions open!",
    images: [
      {
        url: 'https://tsh.edu.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "The Scholars' Home - Excellence in Education Since 2003",
        type: 'image/jpeg',
      },
    ],
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Scholars' Home | Best CBSE School in Paonta Sahib",
    description: "Premier CBSE school in Himachal Pradesh. Excellence in education from pre-primary to senior secondary since 2003.",
    images: ['https://tsh.edu.in/og-image.jpg'],
    creator: '@thescholarsHome',
    site: '@thescholarsHome',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  // Note: Add NEXT_PUBLIC_FB_APP_ID to your environment variables
  // Get your App ID from: https://developers.facebook.com/apps/
  ...(process.env.NEXT_PUBLIC_FB_APP_ID && {
    facebook: {
      appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    },
  }),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Paonta Sahib',
    'geo.position': '30.4358;77.6183',
    'ICBM': '30.4358, 77.6183',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload hero image for instant display */}
        <link
          rel="preload"
          href="https://images.tsh.edu.in/homepage/hero.jpeg"
          as="image"
          type="image/jpeg"
        />

        {/* Organization and Website structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homePageSchemaGraph),
          }}
        />
        {/* GEO-optimized schemas for AI search engines (FAQ, Courses, etc.) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(geoOptimizedHomeSchema),
          }}
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