import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Scholars' Home",
    short_name: 'TSH',
    description: "The Scholars' Home - Excellence in Education Since 2003. Premier CBSE-affiliated school in Himachal Pradesh offering quality education from pre-primary to senior secondary.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['education', 'school'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
    shortcuts: [
      {
        name: 'Admissions',
        short_name: 'Admissions',
        description: 'Apply for admission',
        url: '/admissions',
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch with us',
        url: '/contact',
      },
      {
        name: 'Our Campuses',
        short_name: 'Campuses',
        description: 'View our campus locations',
        url: '/campuses',
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
