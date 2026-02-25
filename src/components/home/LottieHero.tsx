'use client';

import { useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { motion } from 'framer-motion';

export default function LottieHero() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);

  // Try to load the animation file
  useState(() => {
    fetch('/animations/we-inspire.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => {
        console.error('Failed to load Lottie animation:', err);
        setHasError(true);
      });
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-light overflow-hidden">
      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        {hasError ? (
          // Error state with instructions
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border-2 border-orange/20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
              Lottie Animation Not Found
            </h2>
            <p className="text-neutral-dark/70 mb-6 leading-relaxed">
              To see the handwriting animation, you need to add a Lottie JSON file.
            </p>

            <div className="bg-orange-light/10 border-2 border-orange-light rounded-xl p-6 text-left mb-6">
              <h3 className="font-bold text-neutral-dark mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Quick Setup (5 minutes):
              </h3>
              <ol className="text-sm text-neutral-dark/80 space-y-3 list-decimal list-inside">
                <li>
                  Go to{' '}
                  <a
                    href="https://lottiefiles.com/search?q=handwriting+text"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green font-semibold underline hover:text-green-dark"
                  >
                    LottieFiles.com
                  </a>
                </li>
                <li>Search for: <strong>"handwriting text"</strong> or <strong>"write animation"</strong></li>
                <li>Find one that writes text left-to-right naturally</li>
                <li>Click <strong>"Download"</strong> → <strong>"Lottie JSON"</strong></li>
                <li>Save as: <code className="bg-neutral-dark/10 px-2 py-1 rounded">public/animations/we-inspire.json</code></li>
                <li>Refresh this page!</li>
              </ol>
            </div>

            <div className="flex gap-3 justify-center">
              <a
                href="https://lottiefiles.com/search?q=handwriting+text"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-full font-semibold hover:bg-green-dark transition-colors"
              >
                Browse Animations →
              </a>
            </div>
          </div>
        ) : !animationData ? (
          // Loading state
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-green/20 border-t-green rounded-full animate-spin" />
            <p className="text-neutral-dark/60">Loading animation...</p>
          </div>
        ) : (
          // Animation loaded successfully
          <>
            {/* Lottie animation */}
            <div className="relative">
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={true}
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: 'auto',
                  margin: '0 auto',
                }}
                onComplete={() => {
                  console.log('Animation complete!');
                }}
              />
            </div>

            {/* Supporting text */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-dark/70 mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.8 }}
            >
              At The Scholars' Home, we go beyond traditional education to ignite curiosity,
              foster creativity, and build character that lasts a lifetime.
            </motion.p>

            {/* Replay button */}
            <motion.button
              onClick={() => lottieRef.current?.goToAndPlay(0, true)}
              className="mt-8 px-6 py-3 bg-white border-2 border-green text-green rounded-full font-semibold hover:bg-green hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.5, duration: 0.5 }}
            >
              ↻ Replay Animation
            </motion.button>
          </>
        )}
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
