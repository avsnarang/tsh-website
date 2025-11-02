'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Paths where footer should be hidden
  const hideFooterPaths = ['/gallery', '/invites'];
  const shouldHideFooter = pathname ? hideFooterPaths.includes(pathname) : false;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

