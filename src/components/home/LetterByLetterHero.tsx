'use client';

import { motion } from 'framer-motion';

export default function LetterByLetterHero() {
  // Timing configuration for natural writing
  const scratchDelay = 1.0;
  const scratchDuration = 0.7;
  const writingStartDelay = 1.9;

  // Each letter gets progressively delayed to simulate left-to-right writing
  const letterTimings = [
    { letter: 'W', delay: writingStartDelay + 0.0, duration: 0.35 },
    { letter: 'e', delay: writingStartDelay + 0.3, duration: 0.25 },
    { letter: ' ', delay: writingStartDelay + 0.5, duration: 0.05 }, // space (invisible)
    { letter: 'i', delay: writingStartDelay + 0.55, duration: 0.2 },
    { letter: 'n', delay: writingStartDelay + 0.7, duration: 0.3 },
    { letter: 's', delay: writingStartDelay + 0.95, duration: 0.28 },
    { letter: 'p', delay: writingStartDelay + 1.18, duration: 0.32 },
    { letter: 'i', delay: writingStartDelay + 1.45, duration: 0.2 },
    { letter: 'r', delay: writingStartDelay + 1.6, duration: 0.25 },
    { letter: 'e', delay: writingStartDelay + 1.8, duration: 0.25 },
    { letter: '.', delay: writingStartDelay + 2.0, duration: 0.15 },
  ];

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
          {/* SVG Filters for realistic ink */}
          <defs>
            {/* Ink bleeding effect */}
            <filter id="inkBleed" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>

            {/* Rough marker edges */}
            <filter id="roughEdges" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="4" seed="2" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Base line: "We don't just teach." */}
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

          {/* Multiple realistic scratch lines crossing out the text */}
          <g>
            {/* Scratch 1 - slightly above center, left to right */}
            <motion.line
              x1="70"
              y1="78"
              x2="830"
              y2="84"
              stroke="#a65a20"
              strokeWidth="6"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.85,
                  transition: {
                    pathLength: { duration: 0.5, delay: scratchDelay, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: scratchDelay }
                  }
                }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />

            {/* Shadow for scratch 1 */}
            <motion.line
              x1="70"
              y1="79"
              x2="830"
              y2="85"
              stroke="#a65a20"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.15"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.15,
                  transition: {
                    pathLength: { duration: 0.5, delay: scratchDelay + 0.02, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: scratchDelay + 0.02 }
                  }
                }
              }}
              style={{ filter: 'blur(3px)' }}
            />

            {/* Scratch 2 - through center, slightly angled, left to right */}
            <motion.line
              x1="75"
              y1="86"
              x2="835"
              y2="90"
              stroke="#a65a20"
              strokeWidth="7"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.9,
                  transition: {
                    pathLength: { duration: 0.45, delay: scratchDelay + 0.25, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: scratchDelay + 0.25 }
                  }
                }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />

            {/* Shadow for scratch 2 */}
            <motion.line
              x1="75"
              y1="87"
              x2="835"
              y2="91"
              stroke="#a65a20"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.2"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.2,
                  transition: {
                    pathLength: { duration: 0.45, delay: scratchDelay + 0.27, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: scratchDelay + 0.27 }
                  }
                }
              }}
              style={{ filter: 'blur(3px)' }}
            />

            {/* Scratch 3 - slightly below center, left to right, faster (more aggressive) */}
            <motion.line
              x1="68"
              y1="92"
              x2="828"
              y2="88"
              stroke="#a65a20"
              strokeWidth="5.5"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.75,
                  transition: {
                    pathLength: { duration: 0.4, delay: scratchDelay + 0.5, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: scratchDelay + 0.5 }
                  }
                }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />

            {/* Shadow for scratch 3 */}
            <motion.line
              x1="68"
              y1="93"
              x2="828"
              y2="89"
              stroke="#a65a20"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.12"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.12,
                  transition: {
                    pathLength: { duration: 0.4, delay: scratchDelay + 0.52, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: scratchDelay + 0.52 }
                  }
                }
              }}
              style={{ filter: 'blur(2px)' }}
            />
          </g>

          {/* "We inspire." - Letter by letter animation */}
          <g>
            {/* Shadow layer for all letters */}
            <motion.text
              x="50%"
              y="192"
              fontSize="74"
              fontFamily="var(--font-homemade-apple), cursive"
              fill="#003d15"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: writingStartDelay, duration: 0.2 }}
              style={{ filter: 'blur(3px)' }}
            >
              We inspire.
            </motion.text>

            {/* Each letter animated individually with ink effect */}
            {letterTimings.map((item, index) => {
              // Calculate cumulative text for proper positioning
              const textBefore = letterTimings.slice(0, index).map(l => l.letter).join('');
              const currentLetter = item.letter;

              return (
                <g key={index}>
                  {/* Main ink layer */}
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
                      hidden: {
                        strokeDasharray: 500,
                        strokeDashoffset: 500,
                        opacity: 0
                      },
                      visible: {
                        strokeDashoffset: 0,
                        opacity: 0.95,
                        transition: {
                          strokeDashoffset: { duration: item.duration, delay: item.delay, ease: "easeInOut" },
                          opacity: { duration: 0.1, delay: item.delay }
                        }
                      }
                    }}
                    style={{ filter: 'url(#inkBleed)' }}
                  >
                    {/* Show all text but only this letter is visible via clip-path trick */}
                    <tspan opacity={0}>{textBefore}</tspan>
                    <tspan>{currentLetter}</tspan>
                    <tspan opacity={0}>{letterTimings.slice(index + 1).map(l => l.letter).join('')}</tspan>
                  </motion.text>

                  {/* Stroke outline for definition */}
                  <motion.text
                    x="50%"
                    y="190"
                    fontSize="74"
                    fontFamily="var(--font-homemade-apple), cursive"
                    fill="none"
                    stroke="#00501b"
                    strokeWidth="2.8"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none"
                    variants={{
                      hidden: {
                        strokeDasharray: 500,
                        strokeDashoffset: 500,
                        opacity: 0
                      },
                      visible: {
                        strokeDashoffset: 0,
                        opacity: 1,
                        transition: {
                          strokeDashoffset: { duration: item.duration, delay: item.delay, ease: "easeInOut" },
                          opacity: { duration: 0.1, delay: item.delay }
                        }
                      }
                    }}
                    style={{ filter: 'url(#roughEdges)', paintOrder: 'stroke fill' }}
                  >
                    <tspan opacity={0}>{textBefore}</tspan>
                    <tspan>{currentLetter}</tspan>
                    <tspan opacity={0}>{letterTimings.slice(index + 1).map(l => l.letter).join('')}</tspan>
                  </motion.text>
                </g>
              );
            })}
          </g>
        </motion.svg>

        {/* Supporting text */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-neutral-dark/70 mt-8 sm:mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.3, duration: 0.8 }}
        >
          At The Scholars' Home, we go beyond traditional education to ignite curiosity,
          foster creativity, and build character that lasts a lifetime.
        </motion.p>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-32 h-24 sm:w-44 sm:h-32 bg-white/80 rounded-2xl shadow-xl left-4 sm:left-10 top-20 border-l-4 border-green/20"
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0], x: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(0, 80, 27, 0.05) 24px, rgba(0, 80, 27, 0.05) 25px)'
          }}
        />

        <motion.div
          className="absolute w-28 h-28 sm:w-40 sm:h-40 bg-green-light/35 rounded-2xl shadow-lg right-4 sm:right-16 top-32 border-2 border-white/50"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />

        <motion.div
          className="absolute w-24 h-24 sm:w-36 sm:h-36 bg-orange-light/50 rounded-full left-8 sm:left-20 bottom-24 sm:bottom-32 blur-2xl"
          animate={{ y: [0, 25, 0], scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />

        <motion.div
          className="absolute w-20 h-32 sm:w-32 sm:h-44 bg-white/70 rounded-2xl shadow-xl right-8 sm:right-24 bottom-16"
          animate={{ y: [0, -18, 0], rotate: [0, 4, 0], x: [0, -8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />

        <motion.div
          className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-green/25 rounded-full left-12 sm:left-32 top-1/2 blur-xl"
          animate={{ y: [0, 15, 0], x: [0, 10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />

        <motion.div
          className="absolute w-24 h-20 sm:w-36 sm:h-28 bg-orange/25 rounded-2xl right-6 sm:right-20 top-1/3 blur-lg border border-orange/30"
          animate={{ y: [0, -12, 0], rotate: [0, -3, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
      </div>
    </section>
  );
}
