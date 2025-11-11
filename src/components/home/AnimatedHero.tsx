'use client';

import { motion } from 'framer-motion';

export default function AnimatedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-light overflow-hidden">
      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        {/* Main SVG Animation Container */}
        <motion.svg
          viewBox="0 0 800 240"
          className="w-full max-w-4xl mx-auto"
          style={{ height: 'auto' }}
          initial="hidden"
          animate="visible"
        >
          {/* Base line: "We don't just teach." - fades to 25% */}
          <motion.text
            x="50%"
            y="80"
            fontSize="52"
            fontFamily="var(--font-homemade-apple), cursive"
            fill="#444444"
            textAnchor="middle"
            dominantBaseline="middle"
            className="select-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.1, duration: 0.4, ease: "easeOut" }}
          >
            We don't just teach.
          </motion.text>

          {/* Scratch line - crosses through the text */}
          <motion.path
            d="M60 75 Q200 55 400 82 Q600 95 740 78"
            fill="none"
            stroke="#a65a20"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: {
                pathLength: 0,
                opacity: 0
              },
              visible: {
                pathLength: 1,
                opacity: 0.9,
                transition: {
                  pathLength: { duration: 0.7, delay: 1, ease: "easeOut" },
                  opacity: { duration: 0.1, delay: 1 }
                }
              }
            }}
            style={{
              filter: 'drop-shadow(0px 1px 1px rgba(166, 90, 32, 0.3))'
            }}
          />

          {/* Handwritten: "We inspire." - draws in like writing */}
          <motion.text
            x="50%"
            y="170"
            fontSize="64"
            fontFamily="var(--font-homemade-apple), cursive"
            fill="none"
            stroke="#00501b"
            strokeWidth="2.2"
            textAnchor="middle"
            dominantBaseline="middle"
            className="select-none"
            variants={{
              hidden: {
                strokeDasharray: 1200,
                strokeDashoffset: 1200,
                opacity: 0
              },
              visible: {
                strokeDashoffset: 0,
                opacity: 1,
                transition: {
                  strokeDashoffset: { duration: 2.2, delay: 1.9, ease: "easeInOut" },
                  opacity: { duration: 0.1, delay: 1.9 }
                }
              }
            }}
            style={{
              paintOrder: 'stroke fill',
              filter: 'drop-shadow(0px 1px 2px rgba(0, 80, 27, 0.2))'
            }}
          >
            We inspire.
          </motion.text>
        </motion.svg>

        {/* Supporting text */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-neutral-dark/70 mt-8 sm:mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.8 }}
        >
          At The Scholars' Home, we go beyond traditional education to ignite curiosity,
          foster creativity, and build character that lasts a lifetime.
        </motion.p>
      </div>

      {/* Floating background cards - subtle animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Card 1 - top left */}
        <motion.div
          className="absolute w-32 h-24 sm:w-40 sm:h-28 bg-white/70 rounded-2xl shadow-lg left-4 sm:left-10 top-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0],
            x: [0, 5, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />

        {/* Card 2 - top right */}
        <motion.div
          className="absolute w-28 h-28 sm:w-36 sm:h-36 bg-green-light/30 rounded-2xl shadow-md right-4 sm:right-16 top-32"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />

        {/* Card 3 - bottom left */}
        <motion.div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-orange-light/40 rounded-full left-8 sm:left-20 bottom-24 sm:bottom-32 blur-xl"
          animate={{
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />

        {/* Card 4 - bottom right */}
        <motion.div
          className="absolute w-20 h-32 sm:w-28 sm:h-40 bg-white/60 rounded-2xl shadow-lg right-8 sm:right-24 bottom-16"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 4, 0],
            x: [0, -8, 0]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />

        {/* Card 5 - center left */}
        <motion.div
          className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-green/20 rounded-full left-12 sm:left-32 top-1/2 blur-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />

        {/* Card 6 - center right */}
        <motion.div
          className="absolute w-24 h-20 sm:w-32 sm:h-28 bg-orange/20 rounded-2xl right-6 sm:right-20 top-1/3 blur-md"
          animate={{
            y: [0, -12, 0],
            rotate: [0, -3, 0],
            opacity: [0.35, 0.55, 0.35]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      </div>
    </section>
  );
}
