'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showBackground, setShowBackground] = useState(true);

  // Paths where footer should be hidden
  const hideFooterPaths = ['/gallery', '/invites'];
  const shouldHideFooter = pathname ? hideFooterPaths.includes(pathname) : false;

  // Show hero-style background on homepage
  const isHomePage = pathname === '/';

  // Hide background after content has loaded
  useEffect(() => {
    if (isHomePage) {
      setShowBackground(true);
      const timer = setTimeout(() => {
        setShowBackground(false);
      }, 1200); // Hide after animations complete
      return () => clearTimeout(timer);
    } else {
      setShowBackground(false);
    }
  }, [isHomePage, pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-light relative">
      {/* Animated background pattern - fades in then out */}
      <AnimatePresence>
        {isHomePage && showBackground && (
          <motion.div
            className="fixed inset-0 overflow-hidden pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Top right decorative circle */}
            <motion.div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            />
            {/* Bottom left decorative circle */}
            <motion.div
              className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            />
            {/* Subtle pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <main className={`grow relative z-10 ${isHomePage ? 'min-h-svh' : ''}`}>
        {/* Spacer to account for fixed navbar + notification banner + breadcrumbs */}
        {/* Uses CSS custom property --page-top-spacing defined in index.css */}
        {!isHomePage && (
          <div
            className="pt-(--page-top-spacing)"
            aria-hidden="true"
          />
        )}
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
