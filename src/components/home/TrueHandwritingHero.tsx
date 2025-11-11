'use client';

import { motion } from 'framer-motion';

export default function TrueHandwritingHero() {
  // Timing configuration
  const scratchDelay = 1.0;
  const writingStartDelay = 1.5;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-light overflow-hidden">
      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        {/* Main SVG Animation Container */}
        <div className="scale-150 sm:scale-[1.8] origin-center">
          <motion.svg
            viewBox="0 0 900 300"
            className="w-full max-w-5xl mx-auto"
            style={{ height: 'auto' }}
            initial="hidden"
            animate="visible"
          >
          {/* SVG Filters for realistic ink */}
          <defs>
            <style>{`
              /* All elements scale together via container transform */
            `}</style>
            {/* Ink bleeding effect */}
            <filter id="inkBleed" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>

            {/* Rough marker edges */}
            <filter id="roughEdges" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="4" numOctaves="3" seed="2" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Uneven marker texture filter */}
            <filter id="markerTexture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="8" numOctaves="4" seed="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation="0.3" />
            </filter>

            {/* Uneven marker sketching patterns - irregular and hand-drawn */}
            <pattern id="hatchPattern1" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(42)">
              <path d="M0,0 Q1,2.5 0,5" stroke="#00501b" strokeWidth="1.8" opacity="0.55" fill="none" strokeLinecap="round" />
              <line x1="2.5" y1="-0.3" x2="2.3" y2="5.2" stroke="#00501b" strokeWidth="1.3" opacity="0.45" strokeLinecap="round" />
            </pattern>
            <pattern id="hatchPattern2" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-38)">
              <path d="M0,0 C1,2 -0.5,4 0,6" stroke="#00501b" strokeWidth="2" opacity="0.6" fill="none" strokeLinecap="round" />
              <path d="M3,0 Q3.5,3 3,6" stroke="#00501b" strokeWidth="1.4" opacity="0.4" fill="none" strokeLinecap="round" />
            </pattern>
            <pattern id="hatchPattern3" patternUnits="userSpaceOnUse" width="4.5" height="4.5" patternTransform="rotate(18)">
              <line x1="0.2" y1="0" x2="-0.1" y2="4.5" stroke="#00501b" strokeWidth="1.9" opacity="0.5" strokeLinecap="round" />
              <path d="M2,0 Q2.3,2.2 2,4.5" stroke="#00501b" strokeWidth="1.5" opacity="0.4" fill="none" strokeLinecap="round" />
            </pattern>
            <pattern id="hatchPattern4" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(68)">
              <path d="M0,0 C0.5,2.5 -0.3,4.5 0,7" stroke="#00501b" strokeWidth="1.4" opacity="0.35" fill="none" strokeLinecap="round" />
            </pattern>

            {/* Mask for the text shape */}
            <mask id="textMask">
              <text
                x="50%"
                y="170"
                fontSize="90"
                fontFamily="var(--font-lilita), 'Lilita One', cursive"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                We Inspire.
              </text>
            </mask>

            {/* Clip path for left-to-right reveal - outline */}
            <clipPath id="leftToRightClipOutline">
              <motion.rect
                x="0"
                y="0"
                width="900"
                height="300"
                initial={{ x: 0, width: 0 }}
                animate={{ width: 900 }}
                transition={{ duration: 2.5, delay: writingStartDelay, ease: "easeInOut" }}
              />
            </clipPath>

            {/* Clip path for left-to-right reveal - fill (same timing as outline) */}
            <clipPath id="leftToRightClipFill">
              <motion.rect
                x="0"
                y="0"
                width="900"
                height="300"
                initial={{ x: 0, width: 0 }}
                animate={{ width: 900 }}
                transition={{ duration: 2.5, delay: writingStartDelay, ease: "easeInOut" }}
              />
            </clipPath>
          </defs>

          {/* Base line: "We don't just teach." */}
          <motion.text
            x="50%"
            y="90"
            className="select-none"
            fontSize="68"
            fontFamily="var(--font-caveat-brush), 'Caveat Brush', cursive"
            fill="#666666"
            textAnchor="middle"
            dominantBaseline="middle"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.1, duration: 0.4, ease: "easeOut" }}
          >
            We don't just teach.
          </motion.text>

          {/* 3 squiggly scratch lines crossing out text, left to right - shorter and angled */}
          <g>
            {/* Scratch 1 - squiggly path */}
            <motion.path
              d="M 200 78 Q 350 76 500 80 T 700 82"
              fill="none"
              stroke="#a65a20"
              strokeWidth="6"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1, opacity: 0.85,
                  transition: { pathLength: { duration: 0.5, delay: scratchDelay, ease: "easeOut" }, opacity: { duration: 0.05, delay: scratchDelay } }
                }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />
            <motion.path
              d="M 200 79 Q 350 77 500 81 T 700 83"
              fill="none"
              stroke="#a65a20" strokeWidth="8" strokeLinecap="round" opacity="0.15"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 0.15, transition: { pathLength: { duration: 0.5, delay: scratchDelay + 0.02 }, opacity: { duration: 0.05, delay: scratchDelay + 0.02 } } }
              }}
              style={{ filter: 'blur(3px)' }}
            />

            {/* Scratch 2 - squiggly path with slight angle */}
            <motion.path
              d="M 205 84 Q 355 87 505 88 T 705 91"
              fill="none"
              stroke="#a65a20" strokeWidth="7" strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 0.9, transition: { pathLength: { duration: 0.45, delay: scratchDelay + 0.25 }, opacity: { duration: 0.05, delay: scratchDelay + 0.25 } } }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />
            <motion.path
              d="M 205 85 Q 355 88 505 89 T 705 92"
              fill="none"
              stroke="#a65a20" strokeWidth="9" strokeLinecap="round" opacity="0.2"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 0.2, transition: { pathLength: { duration: 0.45, delay: scratchDelay + 0.27 }, opacity: { duration: 0.05, delay: scratchDelay + 0.27 } } }
              }}
              style={{ filter: 'blur(3px)' }}
            />

            {/* Scratch 3 - squiggly path angled opposite */}
            <motion.path
              d="M 198 94 Q 348 90 498 92 T 698 89"
              fill="none"
              stroke="#a65a20" strokeWidth="5.5" strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 0.75, transition: { pathLength: { duration: 0.4, delay: scratchDelay + 0.5 }, opacity: { duration: 0.05, delay: scratchDelay + 0.5 } } }
              }}
              style={{ filter: 'url(#roughEdges)' }}
            />
          </g>

          {/* "We inspire." - Brand font (Lilita One) */}
          <g>
            {/* Hatching fill layers - revealed left to right with uneven marker texture */}
            <g clipPath="url(#leftToRightClipFill)">
              {/* Base layer - dense hatching */}
              <rect
                x="0"
                y="0"
                width="900"
                height="300"
                fill="url(#hatchPattern1)"
                mask="url(#textMask)"
                style={{ filter: 'url(#markerTexture)' }}
              />

              {/* Cross-hatching layer */}
              <rect
                x="0"
                y="0"
                width="900"
                height="300"
                fill="url(#hatchPattern2)"
                mask="url(#textMask)"
                style={{ filter: 'url(#markerTexture)' }}
              />

              {/* Angular texture layer */}
              <rect
                x="0"
                y="0"
                width="900"
                height="300"
                fill="url(#hatchPattern3)"
                mask="url(#textMask)"
                style={{ filter: 'url(#markerTexture)' }}
              />

              {/* Vertical accent strokes */}
              <rect
                x="0"
                y="0"
                width="900"
                height="300"
                fill="url(#hatchPattern4)"
                mask="url(#textMask)"
                style={{ filter: 'url(#markerTexture)' }}
              />

              {/* Solid fill overlay for richness */}
              <text
                x="50%"
                y="170"
                className="select-none"
                fontSize="90"
                fontFamily="var(--font-lilita), 'Lilita One', cursive"
                fill="#00501b"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity="0.55"
                style={{ filter: 'url(#inkBleed)' }}
              >
                We Inspire.
              </text>
            </g>

            {/* Stroke outline for handwriting effect - revealed left to right */}
            <g clipPath="url(#leftToRightClipOutline)">
              <text
                x="50%"
                y="170"
                className="select-none"
                fontSize="90"
                fontFamily="var(--font-lilita), 'Lilita One', cursive"
                fill="none"
                stroke="#00501b"
                strokeWidth="3"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ filter: 'url(#roughEdges)', paintOrder: 'stroke fill' }}
              >
                We Inspire.
              </text>
            </g>
          </g>

          {/* Decorative elements - clean and simple style, close to text - OUTSIDE text group to render on top */}
          {/* Simple 4-point sparkle star - left of text */}
          <motion.g
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 0.7,
                scale: 1,
                transition: {
                  duration: 0.4,
                  delay: writingStartDelay + 0.625,
                  ease: "backOut"
                }
              }
            }}
          >
            <path
              d="M 200 140 L 202 145 L 207 147 L 202 149 L 200 154 L 198 149 L 193 147 L 198 145 Z"
              fill="none"
              stroke="#00501b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Simple 4-point sparkle star - right of text (appears at 1.7 seconds) */}
          <motion.g
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 0.7,
                scale: 1,
                transition: {
                  duration: 0.4,
                  delay: writingStartDelay + 1.7,
                  ease: "backOut"
                }
              }
            }}
          >
            <path
              d="M 690 175 L 692 180 L 697 182 L 692 184 L 690 189 L 688 184 L 683 182 L 688 180 Z"
              fill="none"
              stroke="#00501b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Creative squiggly underline below text */}
          <motion.path
            d="M 220 199 Q 280 194 340 199 T 460 199 Q 520 202 580 199 Q 620 197 660 202"
            fill="none"
            stroke="#00501b"
            strokeWidth="5"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 0.75,
                transition: {
                  pathLength: { duration: 0.8, delay: writingStartDelay + 0.75 },
                  opacity: { duration: 0.1, delay: writingStartDelay + 0.75 }
                }
              }
            }}
            style={{ filter: 'url(#roughEdges)' }}
          />
        </motion.svg>
        </div>

        {/* Supporting text */}
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-neutral-dark/70 -mt-4 sm:-mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.775, duration: 0.8 }}
        >
          At The Scholars' Home, we go beyond traditional education to ignite curiosity,
          foster creativity, and build character that lasts a lifetime.
        </motion.p>
      </div>

    </section>
  );
}
