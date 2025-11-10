'use client';

import { motion } from 'framer-motion';

export default function RealisticHandwritingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-light overflow-hidden">
      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        {/* Main SVG Animation Container */}
        <motion.svg
          viewBox="0 0 900 280"
          className="w-full max-w-5xl mx-auto"
          style={{ height: 'auto' }}
          initial="hidden"
          animate="visible"
        >
          {/* SVG Filters for realistic ink texture */}
          <defs>
            {/* Rough paper texture */}
            <filter id="paperTexture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#f7f7fb" surfaceScale="2">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
            </filter>

            {/* Ink bleeding effect */}
            <filter id="inkBleed" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>

            {/* Rough marker edges */}
            <filter id="roughEdges" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="3" numOctaves="4" seed="2" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Marker stroke with variable width */}
            <filter id="markerStroke" x="-50%" y="-50%" width="200%" height="200%">
              <feMorphology operator="dilate" radius="0.5" />
              <feGaussianBlur stdDeviation="0.3" />
              <feComposite operator="atop" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* Base line: "We don't just teach." in Homemade Apple */}
          <motion.text
            x="50%"
            y="90"
            fontSize="56"
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

          {/* Realistic scratch line - triple layered for depth */}
          <g>
            {/* Shadow layer */}
            <motion.path
              d="M70 84 Q220 64 450 92 Q680 108 830 88"
              fill="none"
              stroke="#a65a20"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.15"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.15,
                  transition: { pathLength: { duration: 0.7, delay: 1.02, ease: "easeOut" }, opacity: { duration: 0.1, delay: 1.02 } }
                }
              }}
              style={{ filter: 'blur(2px)' }}
            />

            {/* Main scratch with texture */}
            <motion.path
              d="M70 82 Q220 62 450 90 Q680 106 830 86"
              fill="none"
              stroke="#a65a20"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.85,
                  transition: { pathLength: { duration: 0.7, delay: 1, ease: "easeOut" }, opacity: { duration: 0.1, delay: 1 } }
                }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />

            {/* Highlight layer for realism */}
            <motion.path
              d="M72 80 Q222 61 452 88 Q682 104 832 84"
              fill="none"
              stroke="#d4945f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.5,
                  transition: { pathLength: { duration: 0.7, delay: 1.05, ease: "easeOut" }, opacity: { duration: 0.1, delay: 1.05 } }
                }
              }}
            />
          </g>

          {/* "We inspire." with realistic marker effect - multi-layered */}
          <g>
            {/* Base shadow for depth */}
            <motion.text
              x="50%"
              y="192"
              fontSize="74"
              fontFamily="var(--font-homemade-apple), cursive"
              fill="#003d15"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none"
              variants={{
                hidden: { strokeDasharray: 1500, strokeDashoffset: 1500, opacity: 0 },
                visible: {
                  strokeDashoffset: 0,
                  opacity: 0.15,
                  transition: { strokeDashoffset: { duration: 2.2, delay: 1.92, ease: "easeInOut" }, opacity: { duration: 0.1, delay: 1.92 } }
                }
              }}
              style={{ filter: 'blur(3px)' }}
            >
              We inspire.
            </motion.text>

            {/* Main ink layer with bleeding effect */}
            <motion.text
              x="50%"
              y="190"
              fontSize="74"
              fontFamily="var(--font-homemade-apple), cursive"
              fill="#00501b"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none"
              variants={{
                hidden: { strokeDasharray: 1500, strokeDashoffset: 1500, opacity: 0 },
                visible: {
                  strokeDashoffset: 0,
                  opacity: 0.95,
                  transition: { strokeDashoffset: { duration: 2.2, delay: 1.9, ease: "easeInOut" }, opacity: { duration: 0.1, delay: 1.9 } }
                }
              }}
              style={{ filter: 'url(#inkBleed)' }}
            >
              We inspire.
            </motion.text>

            {/* Stroke outline for definition */}
            <motion.text
              x="50%"
              y="190"
              fontSize="74"
              fontFamily="var(--font-homemade-apple), cursive"
              fill="none"
              stroke="#00501b"
              strokeWidth="3"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none"
              variants={{
                hidden: { strokeDasharray: 1500, strokeDashoffset: 1500, opacity: 0 },
                visible: {
                  strokeDashoffset: 0,
                  opacity: 1,
                  transition: { strokeDashoffset: { duration: 2.2, delay: 1.9, ease: "easeInOut" }, opacity: { duration: 0.1, delay: 1.9 } }
                }
              }}
              style={{ filter: 'url(#roughEdges)', paintOrder: 'stroke fill' }}
            >
              We inspire.
            </motion.text>

            {/* Highlight shine effect */}
            <motion.text
              x="50.2%"
              y="188"
              fontSize="74"
              fontFamily="var(--font-homemade-apple), cursive"
              fill="none"
              stroke="#4a9960"
              strokeWidth="1.5"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none"
              variants={{
                hidden: { strokeDasharray: 1500, strokeDashoffset: 1500, opacity: 0 },
                visible: {
                  strokeDashoffset: 0,
                  opacity: 0.4,
                  transition: { strokeDashoffset: { duration: 2.2, delay: 1.95, ease: "easeInOut" }, opacity: { duration: 0.1, delay: 1.95 } }
                }
              }}
            >
              We inspire.
            </motion.text>
          </g>
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
        {/* Card 1 - top left - looks like a notebook/paper */}
        <motion.div
          className="absolute w-32 h-24 sm:w-44 sm:h-32 bg-white/80 rounded-2xl shadow-xl left-4 sm:left-10 top-20 border-l-4 border-green/20"
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
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(0, 80, 27, 0.05) 24px, rgba(0, 80, 27, 0.05) 25px)'
          }}
        />

        {/* Card 2 - top right - book/card */}
        <motion.div
          className="absolute w-28 h-28 sm:w-40 sm:h-40 bg-green-light/35 rounded-2xl shadow-lg right-4 sm:right-16 top-32 border-2 border-white/50"
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

        {/* Card 3 - bottom left - glowing orb */}
        <motion.div
          className="absolute w-24 h-24 sm:w-36 sm:h-36 bg-orange-light/50 rounded-full left-8 sm:left-20 bottom-24 sm:bottom-32 blur-2xl"
          animate={{
            y: [0, 25, 0],
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />

        {/* Card 4 - bottom right - paper sheet */}
        <motion.div
          className="absolute w-20 h-32 sm:w-32 sm:h-44 bg-white/70 rounded-2xl shadow-xl right-8 sm:right-24 bottom-16"
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

        {/* Card 5 - center left - subtle glow */}
        <motion.div
          className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-green/25 rounded-full left-12 sm:left-32 top-1/2 blur-xl"
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

        {/* Card 6 - center right - desk item */}
        <motion.div
          className="absolute w-24 h-20 sm:w-36 sm:h-28 bg-orange/25 rounded-2xl right-6 sm:right-20 top-1/3 blur-lg border border-orange/30"
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

        {/* Additional small accent - pencil/pen like */}
        <motion.div
          className="absolute w-2 h-20 sm:w-3 sm:h-32 bg-orange rounded-full left-1/4 bottom-1/4 opacity-20"
          animate={{
            rotate: [0, 5, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      </div>
    </section>
  );
}
