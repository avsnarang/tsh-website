'use client';

import { motion } from 'framer-motion';

export default function TrueHandwritingHero() {
  return (
    <section className="relative w-full py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-neutral-dark mb-6">
            <span className="text-green">The Scholars' Home</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-dark/70 max-w-2xl mx-auto">
            Excellence in Education Since 2003
          </p>
        </motion.div>
      </div>
    </section>
  );
}
