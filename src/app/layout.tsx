import { Metadata } from "next";
import { Montserrat, Lilita_One } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita-one",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tsh.edu.in"),
  title: {
    default: "The Scholars' Home | Excellence in Education Since 2003",
    template: "%s | The Scholars' Home",
  },
  description:
    "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school with three campuses offering pre-primary to senior secondary education.",
  keywords: [
    "The Scholars' Home",
    "CBSE school",
    "Paonta Sahib",
    "education",
    "primary school",
    "secondary school",
    "senior secondary",
  ],
  authors: [{ name: "The Scholars' Home" }],
  creator: "The Scholars' Home",
  publisher: "The Scholars' Home",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://tsh.edu.in",
    siteName: "The Scholars' Home",
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education.",
    images: [
      {
        url: "https://tsh.edu.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Scholars' Home Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education.",
    images: ["https://tsh.edu.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lilitaOne.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
