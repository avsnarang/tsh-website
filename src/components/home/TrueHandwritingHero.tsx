'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TrueHandwritingHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const text = "The Scholars' Home";
  const words = text.split(' ');

  return (
    <section className="relative flex min-h-[400px] items-center justify-center py-16 px-4">
      <div className="relative z-10 text-center">
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-dark mb-4"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-3">
              {word.split('').map((char, charIndex) => {
                const totalIndex = words.slice(0, wordIndex).join('').length + charIndex;
                return (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      mounted
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: totalIndex * 0.05,
                      ease: 'easeOut',
                    }}
                    style={{
                      fontFamily: 'var(--font-display), cursive',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h1>
        
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-neutral-DEFAULT/70 mt-6 font-body"
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Where Excellence Meets Character
        </motion.p>
      </div>
    </section>
  );
}

