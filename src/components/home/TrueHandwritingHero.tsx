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

      {/* Playful Photo Collage with Squiggly Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* SVG for squiggly connecting lines and decorative elements */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            {/* Dashed squiggly line pattern */}
            <filter id="squiggleBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
            {/* Hand-drawn arrow marker */}
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#a65a20" opacity="0.6" />
            </marker>
          </defs>

          {/* MASSIVE BOLD connecting lines and doodles */}

          {/* THICK wavy line connecting left to right across top */}
          <path
            d="M 100 150 Q 200 140 300 155 T 500 150 Q 700 145 900 160"
            stroke="#00501b"
            strokeWidth="6"
            fill="none"
            strokeDasharray="15 10"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* BIG decorative hearts cluster - top */}
          <path
            d="M 280 120 Q 280 110 290 110 Q 300 110 300 120 Q 300 130 290 140 Q 280 130 280 120"
            fill="#a65a20"
            opacity="0.4"
          />
          <path
            d="M 750 130 Q 750 120 760 120 Q 770 120 770 130 Q 770 140 760 150 Q 750 140 750 130"
            fill="#00501b"
            opacity="0.35"
          />

          {/* MASSIVE curved swoosh from left side */}
          <path
            d="M 80 200 Q 60 300 80 400 T 100 600"
            stroke="#a65a20"
            strokeWidth="7"
            fill="none"
            strokeDasharray="12 8"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* HUGE playful curved arrow pointing down left */}
          <path
            d="M 120 450 Q 140 480 160 500"
            stroke="#00501b"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            markerEnd="url(#arrowhead)"
          />

          {/* LARGE dots cluster - left side */}
          <circle cx="110" cy="280" r="8" fill="#00501b" opacity="0.4" />
          <circle cx="125" cy="290" r="6" fill="#a65a20" opacity="0.35" />
          <circle cx="115" cy="305" r="10" fill="#00501b" opacity="0.3" />
          <circle cx="100" cy="320" r="5" fill="#a65a20" opacity="0.4" />

          {/* MASSIVE swoosh on right side */}
          <path
            d="M 920 200 Q 940 300 920 400 T 900 600"
            stroke="#a65a20"
            strokeWidth="7"
            fill="none"
            strokeDasharray="12 8"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* BIG spiral doodle - right side */}
          <path
            d="M 950 320 Q 960 310 970 320 Q 980 330 970 340 Q 955 350 940 340"
            stroke="#00501b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* LARGE dots cluster - right side */}
          <circle cx="890" cy="350" r="8" fill="#a65a20" opacity="0.4" />
          <circle cx="875" cy="360" r="6" fill="#00501b" opacity="0.35" />
          <circle cx="885" cy="375" r="10" fill="#a65a20" opacity="0.3" />

          {/* THICK bottom connecting wave */}
          <path
            d="M 150 650 Q 300 640 450 655 T 750 650 Q 850 645 950 660"
            stroke="#00501b"
            strokeWidth="6"
            fill="none"
            strokeDasharray="15 10"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* BIG sparkle stars scattered everywhere */}
          <circle cx="250" cy="280" r="5" fill="#a65a20" opacity="0.5" />
          <circle cx="780" cy="300" r="5" fill="#00501b" opacity="0.5" />
          <circle cx="500" cy="140" r="6" fill="#a65a20" opacity="0.45" />
          <circle cx="550" cy="620" r="5" fill="#00501b" opacity="0.45" />
          <circle cx="350" cy="380" r="4" fill="#a65a20" opacity="0.4" />
          <circle cx="650" cy="400" r="4" fill="#00501b" opacity="0.4" />

          {/* HUGE curved connecting arrows */}
          <path
            d="M 250 550 Q 280 580 320 600"
            stroke="#a65a20"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            markerEnd="url(#arrowhead)"
          />

          <path
            d="M 750 550 Q 720 580 680 600"
            stroke="#00501b"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            markerEnd="url(#arrowhead)"
          />

          {/* BIG loopy doodles */}
          <path
            d="M 850 580 Q 870 600 850 620 T 870 660"
            stroke="#a65a20"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />

          <path
            d="M 150 580 Q 130 600 150 620 T 130 660"
            stroke="#00501b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* MASSIVE zigzag energy lines */}
          <path
            d="M 400 160 L 420 180 L 400 200"
            stroke="#a65a20"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.35"
          />

          <path
            d="M 600 160 L 580 180 L 600 200"
            stroke="#00501b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>

        {/* Left & Right side photos only - keeping top center clear */}
        {/* Top Left - tilted left - LARGE PORTRAIT */}
        <div
          className="absolute left-[2%] sm:left-[4%] top-[12%] shadow-2xl"
          style={{
            transform: 'rotate(-12deg)',
            zIndex: 2
          }}
        >
          <div className="relative">
            {/* MASSIVE decorative corner brackets with GLOW */}
            <div className="absolute -top-6 -left-6 w-20 h-20 border-l-[8px] border-t-[8px] border-[#00501b] rounded-tl-3xl opacity-80 shadow-lg" style={{ zIndex: 3 }} />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 border-r-[8px] border-b-[8px] border-[#a65a20] rounded-br-3xl opacity-80 shadow-lg" style={{ zIndex: 3 }} />

            {/* Extra decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-l-[4px] border-t-[4px] border-[#a65a20] rounded-tl-2xl opacity-50" style={{ zIndex: 2 }} />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-[4px] border-b-[4px] border-[#00501b] rounded-br-2xl opacity-50" style={{ zIndex: 2 }} />

            {/* Big bold scribble */}
            <svg className="absolute -bottom-8 -left-6 w-32 h-16" style={{ zIndex: 3 }}>
              <path d="M 4 8 Q 16 4 28 8 T 52 8" stroke="#a65a20" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M 6 10 Q 18 6 30 10 T 54 10" stroke="#a65a20" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
            </svg>

            {/* Explosive star burst */}
            <svg className="absolute -top-6 -right-8 w-20 h-20" style={{ zIndex: 3 }}>
              <circle cx="10" cy="10" r="6" fill="#a65a20" opacity="0.3" />
              <path d="M10 0 L10 20 M0 10 L20 10 M3 3 L17 17 M17 3 L3 17" stroke="#a65a20" strokeWidth="3" opacity="0.6" />
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/DSC04216.jpg"
                alt=""
                className="w-48 h-64 sm:w-56 sm:h-72 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Top Right - BIG BOLD SQUARE */}
        <div
          className="absolute right-[2%] sm:right-[4%] top-[12%] shadow-2xl"
          style={{
            transform: 'rotate(15deg)',
            zIndex: 3
          }}
        >
          <div className="relative">
            {/* GIANT star explosion */}
            <div className="absolute -top-8 -right-8 opacity-80" style={{ zIndex: 3 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#a65a20" strokeWidth="4">
                <path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" />
              </svg>
            </div>
            <div className="absolute -top-4 -right-16 opacity-60" style={{ zIndex: 3 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="#00501b">
                <circle cx="16" cy="16" r="4" />
                <path d="M16 0 L16 8 M16 24 L16 32 M0 16 L8 16 M24 16 L32 16" stroke="#00501b" strokeWidth="3" />
              </svg>
            </div>

            {/* Wild zigzag border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }}>
              <path
                d="M 0 0 L 20 10 L 0 20 L 20 30 L 0 40 L 20 50"
                stroke="#a65a20"
                strokeWidth="4"
                fill="none"
                opacity="0.4"
              />
            </svg>

            {/* Multiple doodle hearts */}
            <svg className="absolute -left-6 top-[20%] w-16 h-20" style={{ zIndex: 3 }}>
              <path d="M 8 6 Q 8 2 12 2 Q 16 2 16 6 Q 16 10 12 14 Q 8 10 8 6" fill="#a65a20" opacity="0.4" />
            </svg>

            <div className="border-8 border-white rounded-3xl overflow-hidden bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/TSH01770.jpg"
                alt=""
                className="w-52 h-52 sm:w-64 sm:h-64 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Left Side - 2 photos */}
        {/* Left Upper - WIDE LANDSCAPE */}
        <div
          className="absolute left-[3%] sm:left-[5%] top-[28%] shadow-2xl"
          style={{
            transform: 'rotate(-8deg)',
            zIndex: 3
          }}
        >
          <div className="relative">
            {/* MASSIVE wavy border with color blocks */}
            <div className="absolute inset-0 border-[6px] border-[#00501b] rounded-2xl opacity-50" style={{
              zIndex: 3,
              clipPath: 'polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%)'
            }} />

            {/* HUGE cloud doodles */}
            <svg className="absolute -top-10 -right-12 w-32 h-20" style={{ zIndex: 3 }}>
              <ellipse cx="16" cy="12" rx="14" ry="10" fill="none" stroke="#a65a20" strokeWidth="4" opacity="0.5" />
              <ellipse cx="26" cy="8" rx="10" ry="8" fill="none" stroke="#a65a20" strokeWidth="4" opacity="0.5" />
            </svg>

            {/* BIG decorative pins */}
            <div className="absolute -top-2 left-[20%] w-5 h-5 bg-[#a65a20] rounded-full opacity-80 shadow-lg" style={{ zIndex: 4 }} />
            <div className="absolute -top-2 right-[20%] w-5 h-5 bg-[#00501b] rounded-full opacity-80 shadow-lg" style={{ zIndex: 4 }} />

            {/* Bold underline squiggle */}
            <svg className="absolute -bottom-8 left-[10%] w-48 h-12" style={{ zIndex: 3 }}>
              <path d="M 4 6 Q 24 2 48 6 T 96 6" stroke="#a65a20" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/12300058.jpg"
                alt=""
                className="w-64 h-44 sm:w-80 sm:h-52 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Left Lower - MEDIUM square with ATTITUDE */}
        <div
          className="absolute left-[6%] sm:left-[10%] top-[58%] shadow-2xl"
          style={{
            transform: 'rotate(10deg)',
            zIndex: 4
          }}
        >
          <div className="relative">
            {/* BIG corner dots with glow */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#a65a20] rounded-full opacity-70 shadow-xl" style={{ zIndex: 3 }} />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00501b] rounded-full opacity-70 shadow-xl" style={{ zIndex: 3 }} />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#00501b] rounded-full opacity-70 shadow-xl" style={{ zIndex: 3 }} />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#a65a20] rounded-full opacity-70 shadow-xl" style={{ zIndex: 3 }} />

            {/* EXPLOSIVE radiating lines */}
            <svg className="absolute -top-6 -left-6 w-16 h-16" style={{ zIndex: 2 }}>
              <line x1="8" y1="8" x2="2" y2="2" stroke="#a65a20" strokeWidth="3" opacity="0.5" />
              <line x1="8" y1="8" x2="2" y2="14" stroke="#a65a20" strokeWidth="3" opacity="0.5" />
              <line x1="8" y1="8" x2="14" y2="2" stroke="#a65a20" strokeWidth="3" opacity="0.5" />
              <line x1="8" y1="8" x2="0" y2="8" stroke="#00501b" strokeWidth="3" opacity="0.4" />
              <line x1="8" y1="8" x2="8" y2="0" stroke="#00501b" strokeWidth="3" opacity="0.4" />
            </svg>

            {/* Fun arrow pointing TO the photo */}
            <svg className="absolute -right-12 top-[30%] w-24 h-16" style={{ zIndex: 3 }}>
              <path d="M 4 8 Q 12 8 18 8" stroke="#a65a20" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" markerEnd="url(#arrowhead)" />
              <text x="2" y="4" fill="#a65a20" fontSize="10" opacity="0.5">WOW!</text>
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/DSC03556.jpg"
                alt=""
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Right Side - 2 photos */}
        {/* Right Middle - TALL PORTRAIT */}
        <div
          className="absolute right-[3%] sm:right-[5%] top-[38%] shadow-2xl"
          style={{
            transform: 'rotate(-7deg)',
            zIndex: 4
          }}
        >
          <div className="relative">
            {/* MASSIVE tape pieces */}
            <div
              className="absolute -top-5 left-[15%] w-24 h-10 bg-white/70 opacity-70 shadow-lg rounded-sm"
              style={{
                zIndex: 3,
                transform: 'rotate(-6deg)',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.6))'
              }}
            />
            <div
              className="absolute -top-5 right-[15%] w-24 h-10 bg-white/70 opacity-70 shadow-lg rounded-sm"
              style={{
                zIndex: 3,
                transform: 'rotate(8deg)',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.6))'
              }}
            />

            {/* BOLD highlight strokes */}
            <svg className="absolute -right-6 top-[20%] w-12 h-32" style={{ zIndex: 2 }}>
              <path d="M 6 4 L 6 28" stroke="#a65a20" strokeWidth="8" opacity="0.25" strokeLinecap="round" />
            </svg>

            {/* Doodle stars */}
            <svg className="absolute -left-8 top-[40%] w-16 h-16" style={{ zIndex: 3 }}>
              <path d="M8 2 L10 8 L16 10 L10 12 L8 18 L6 12 L0 10 L6 8 Z" fill="#00501b" opacity="0.4" />
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/DSC04235.jpg"
                alt=""
                className="w-48 h-64 sm:w-56 sm:h-72 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Center Bottom - ANOTHER HUGE photo for more coverage */}
        <div
          className="absolute left-[35%] bottom-[35%] shadow-2xl"
          style={{
            transform: 'rotate(8deg)',
            zIndex: 2
          }}
        >
          <div className="relative">
            {/* Colorful border strips */}
            <div className="absolute -top-2 inset-x-0 h-3 bg-gradient-to-r from-[#a65a20]/40 via-[#00501b]/40 to-[#a65a20]/40 rounded-t-xl" style={{ zIndex: 3 }} />
            <div className="absolute -bottom-2 inset-x-0 h-3 bg-gradient-to-r from-[#00501b]/40 via-[#a65a20]/40 to-[#00501b]/40 rounded-b-xl" style={{ zIndex: 3 }} />

            {/* Fun doodle cloud */}
            <svg className="absolute -top-12 -right-10 w-28 h-16" style={{ zIndex: 3 }}>
              <ellipse cx="20" cy="8" rx="16" ry="12" fill="none" stroke="#a65a20" strokeWidth="3" opacity="0.5" />
              <ellipse cx="30" cy="6" rx="12" ry="10" fill="none" stroke="#00501b" strokeWidth="3" opacity="0.4" />
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/TSH05464.jpg"
                alt=""
                className="w-56 h-40 sm:w-64 sm:h-48 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Arc - LARGE photos */}
        {/* Bottom Left - WIDE DRAMATIC landscape */}
        <div
          className="absolute left-[5%] sm:left-[8%] bottom-[5%] shadow-2xl"
          style={{
            transform: 'rotate(-6deg)',
            zIndex: 3
          }}
        >
          <div className="relative">
            {/* MASSIVE Zigzag pattern border */}
            <svg className="absolute -top-6 left-0 w-full h-8" style={{ zIndex: 3 }}>
              <path
                d="M 0 4 L 16 8 L 32 4 L 48 8 L 64 4 L 80 8 L 96 4 L 112 8"
                stroke="#00501b"
                strokeWidth="4"
                fill="none"
                opacity="0.6"
              />
            </svg>

            {/* BIG paper curl effect */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-white/90 to-transparent opacity-70 shadow-lg" style={{
              zIndex: 3,
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              transform: 'rotate(-15deg)'
            }} />

            {/* Fun annotation */}
            <svg className="absolute -top-10 left-[20%] w-32 h-16" style={{ zIndex: 3 }}>
              <text x="0" y="12" fill="#a65a20" fontSize="14" fontWeight="bold" opacity="0.6">SO FUN!</text>
              <path d="M 16 14 Q 20 18 24 16" stroke="#a65a20" strokeWidth="3" fill="none" opacity="0.5" />
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/12308715.jpg"
                alt=""
                className="w-64 h-44 sm:w-80 sm:h-56 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Center - BIG LANDSCAPE with ENERGY */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[4%] shadow-2xl"
          style={{
            transform: 'translateX(-50%) rotate(4deg)',
            zIndex: 4
          }}
        >
          <div className="relative">
            {/* HUGE starburst explosion */}
            <div className="absolute -top-10 -left-10 opacity-70" style={{ zIndex: 3 }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="8" fill="#a65a20" />
                <line x1="32" y1="8" x2="32" y2="24" stroke="#a65a20" strokeWidth="4" />
                <line x1="32" y1="40" x2="32" y2="56" stroke="#a65a20" strokeWidth="4" />
                <line x1="8" y1="32" x2="24" y2="32" stroke="#a65a20" strokeWidth="4" />
                <line x1="40" y1="32" x2="56" y2="32" stroke="#a65a20" strokeWidth="4" />
                {/* Diagonal rays */}
                <line x1="16" y1="16" x2="24" y2="24" stroke="#a65a20" strokeWidth="3" opacity="0.7" />
                <line x1="48" y1="16" x2="40" y2="24" stroke="#a65a20" strokeWidth="3" opacity="0.7" />
                <line x1="16" y1="48" x2="24" y2="40" stroke="#a65a20" strokeWidth="3" opacity="0.7" />
                <line x1="48" y1="48" x2="40" y2="40" stroke="#a65a20" strokeWidth="3" opacity="0.7" />
              </svg>
            </div>

            {/* BIG decorative hearts cluster */}
            <svg className="absolute -bottom-8 -right-8 w-20 h-20" style={{ zIndex: 3 }}>
              <path d="M 8 6 Q 8 2 12 2 Q 16 2 16 6 Q 16 10 12 14 Q 8 10 8 6" fill="#00501b" opacity="0.4" />
              <path d="M 4 12 Q 4 10 6 10 Q 8 10 8 12 Q 8 14 6 16 Q 4 14 4 12" fill="#a65a20" opacity="0.35" />
            </svg>

            {/* Multiple concentric borders */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }}>
              <rect
                x="6"
                y="6"
                width="calc(100% - 12px)"
                height="calc(100% - 12px)"
                fill="none"
                stroke="#00501b"
                strokeWidth="4"
                strokeDasharray="12 8"
                rx="16"
                opacity="0.5"
              />
            </svg>

            <div className="border-8 border-white rounded-3xl overflow-hidden bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/20250814-vlcsnap-2025-08-14-15h49m00s890.jpg"
                alt=""
                className="w-64 h-48 sm:w-80 sm:h-60 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Right - BIG SQUARE with WILD energy */}
        <div
          className="absolute right-[5%] sm:right-[8%] bottom-[5%] shadow-2xl"
          style={{
            transform: 'rotate(-12deg)',
            zIndex: 3
          }}
        >
          <div className="relative">
            {/* MASSIVE doodle squiggles */}
            <svg className="absolute -right-10 top-1/2 -translate-y-1/2 w-24 h-48" style={{ zIndex: 3 }}>
              <path
                d="M 4 4 Q 12 24 4 44 T 4 84 Q 12 104 4 124"
                stroke="#00501b"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 8 8 Q 16 28 8 48 T 8 88 Q 16 108 8 128"
                stroke="#a65a20"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>

            {/* HUGE decorative burst */}
            <svg className="absolute -left-10 -top-8 w-20 h-20" style={{ zIndex: 3 }}>
              <circle cx="10" cy="10" r="6" fill="#a65a20" opacity="0.5" />
              <circle cx="10" cy="10" r="10" fill="none" stroke="#a65a20" strokeWidth="3" opacity="0.4" />
              <circle cx="10" cy="10" r="14" fill="none" stroke="#00501b" strokeWidth="2" opacity="0.3" strokeDasharray="4 2" />
            </svg>

            {/* BIG X marks for fun */}
            <svg className="absolute -bottom-6 left-[30%] w-16 h-16" style={{ zIndex: 3 }}>
              <line x1="4" y1="4" x2="12" y2="12" stroke="#00501b" strokeWidth="4" opacity="0.5" strokeLinecap="round" />
              <line x1="12" y1="4" x2="4" y2="12" stroke="#00501b" strokeWidth="4" opacity="0.5" strokeLinecap="round" />
            </svg>

            {/* Text annotation */}
            <svg className="absolute -top-12 left-[10%] w-32 h-16" style={{ zIndex: 3 }}>
              <text x="0" y="12" fill="#00501b" fontSize="14" fontWeight="bold" opacity="0.6">AMAZING!</text>
            </svg>

            <div className="border-8 border-white rounded-2xl overflow-hidden bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img
                src="/hero-real/DSC08638.jpg"
                alt=""
                className="w-52 h-52 sm:w-60 sm:h-60 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
