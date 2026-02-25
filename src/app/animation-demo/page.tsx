'use client';

import TrueHandwritingHero from '@/components/home/TrueHandwritingHero';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Creative photo clusters with intentional positioning
const photoClusters = {
  // Left side cluster - well spaced vertically to prevent overlap
  leftCascade: [
    {
      src: '/hero-real/12308715.jpg',
      caption: 'Learning Together',
      size: 'lg',
      position: { top: '3%', left: '2%' },
      rotation: -12,
      delay: 0.1,
      style: 'polaroid-large',
      decorations: ['tape-top-left', 'star'],
    },
    {
      src: '/hero-real/DSC03556.jpg',
      caption: 'Fun Times!',
      size: 'lg',
      position: { top: '45%', left: '1%' },
      rotation: 8,
      delay: 0.2,
      style: 'polaroid-large',
      decorations: ['tape-top-right', 'heart'],
    },
    {
      src: '/hero-real/TSH05464.jpg',
      caption: 'Adventures',
      size: 'md',
      position: { top: 'auto', bottom: '15%', left: '3%' },
      rotation: -10,
      delay: 0.3,
      style: 'pinned-frame',
      decorations: ['pin-top', 'doodle'],
    },
  ],
  // Right side cluster - well spaced vertically to prevent overlap
  rightFlow: [
    {
      src: '/hero-real/20250814-vlcsnap-2025-08-14-15h49m00s890.jpg',
      caption: 'Friends Forever',
      size: 'lg',
      position: { top: '8%', right: '2%' },
      rotation: 15,
      delay: 0.15,
      style: 'polaroid-large',
      decorations: ['tape-bottom-left', 'arrow'],
    },
    {
      src: '/hero-real/DSC04235.jpg',
      caption: 'Memories',
      size: 'md',
      position: { top: '48%', right: '1%' },
      rotation: -10,
      delay: 0.25,
      style: 'tape-frame',
      decorations: ['tape-all', 'star'],
    },
    {
      src: '/hero-real/DSC08638.jpg',
      caption: 'Achievements',
      size: 'lg',
      position: { top: 'auto', bottom: '18%', right: '3%' },
      rotation: 12,
      delay: 0.35,
      style: 'polaroid-large',
      decorations: ['tape-bottom-right', 'heart'],
    },
  ],
  // Bottom accent photos - spread across bottom with more spacing
  accents: [
    {
      src: '/hero-real/12300058.jpg',
      caption: 'Joy',
      size: 'sm',
      position: { top: 'auto', bottom: '3%', left: '12%' },
      rotation: 10,
      delay: 0.4,
      style: 'doodle-frame',
      decorations: ['doodle-frame', 'star'],
    },
    {
      src: '/hero-real/DSC04216.jpg',
      caption: 'Growth',
      size: 'sm',
      position: { top: 'auto', bottom: '3%', right: '15%' },
      rotation: -12,
      delay: 0.45,
      style: 'pinned-frame',
      decorations: ['pin-top', 'arrow'],
    },
    {
      src: '/hero-real/TSH01770.jpg',
      caption: 'Together',
      size: 'sm',
      position: { top: 'auto', bottom: '3%', left: '50%', transform: 'translateX(-50%)' },
      rotation: 8,
      delay: 0.5,
      style: 'tape-frame',
      decorations: ['tape-all', 'heart'],
    },
  ],
};

const sizeMap = {
  sm: { w: 'w-32', h: 'h-40', lg: 'lg:w-36' },
  md: { w: 'w-40', h: 'h-52', lg: 'lg:w-44' },
  lg: { w: 'w-52', h: 'h-68', lg: 'lg:w-56' },
  xl: { w: 'w-64', h: 'h-80', lg: 'lg:w-72' },
};

export default function AnimationDemoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allPhotos = [
    ...photoClusters.leftCascade,
    ...photoClusters.rightFlow,
    ...photoClusters.accents,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-neutral-light via-[#faf9f6] to-neutral-light">
      {/* Enhanced decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Animated gradient orbs */}
        <div className="absolute left-8 top-20 h-96 w-96 rounded-full bg-green-light/25 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute right-12 top-32 h-[500px] w-[500px] rounded-full bg-orange-light/20 blur-[160px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-green-light/15 blur-[180px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        
        {/* Paper texture with subtle animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>

      {/* Connecting decorative lines */}
      <div className="pointer-events-none absolute inset-0 z-4" aria-hidden>
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00501B" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#A65A20" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00501B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Curved connecting lines */}
          <path
            d="M 5% 20% Q 15% 30%, 25% 25% T 45% 30%"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 4"
            className="hidden lg:block"
          />
          <path
            d="M 95% 25% Q 85% 35%, 75% 30% T 55% 35%"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 4"
            className="hidden lg:block"
          />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-20 pt-24 sm:px-6 lg:px-12">
        <div className="relative isolate">
          {/* Creative photo layout */}
          {allPhotos.map((photo, idx) => {
            const sizes = sizeMap[photo.size as keyof typeof sizeMap];
            const isPolaroid = photo.style.includes('polaroid');
            const isPinned = photo.style.includes('pinned');
            const isTape = photo.style.includes('tape');
            const isDoodle = photo.style.includes('doodle');

            return (
              <div
                key={`${photo.src}-${idx}`}
                className={`pointer-events-none absolute z-5 hidden md:block ${sizes.w} ${sizes.h} ${sizes.lg} transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  ...photo.position,
                  ...(!('transform' in photo.position) && { transform: 'none' }),
                  transitionDelay: `${photo.delay}s`,
                  animationName: mounted ? `float-${idx % 4}-${photo.rotation}` : 'none',
                  animationDuration: `${6 + (idx % 3)}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${photo.delay + 1}s`,
                }}
                aria-hidden
              >
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes float-0-${photo.rotation} {
                    0%, 100% { transform: translateY(0px) rotate(${photo.rotation}deg); }
                    50% { transform: translateY(-10px) rotate(${photo.rotation}deg); }
                  }
                  @keyframes float-1-${photo.rotation} {
                    0%, 100% { transform: translateY(0px) rotate(${photo.rotation}deg); }
                    50% { transform: translateY(-12px) rotate(${photo.rotation}deg); }
                  }
                  @keyframes float-2-${photo.rotation} {
                    0%, 100% { transform: translateY(0px) rotate(${photo.rotation}deg); }
                    50% { transform: translateY(-8px) rotate(${photo.rotation}deg); }
                  }
                  @keyframes float-3-${photo.rotation} {
                    0%, 100% { transform: translateY(0px) rotate(${photo.rotation}deg); }
                    50% { transform: translateY(-14px) rotate(${photo.rotation}deg); }
                  }
                `}} />

                {/* Polaroid style */}
                {isPolaroid && (
                  <div className={`${idx % 2 === 0 ? 'bg-orange-light' : 'bg-green-light'} p-3 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.35)] rounded-sm relative`}>
                    {/* Enhanced tape decorations */}
                    {photo.decorations?.includes('tape-top-left') && (
                      <>
                        <div className="absolute -top-2 -left-2 w-16 h-8 bg-white/90 opacity-80 shadow-xl rounded-sm rotate-[-20deg] border border-neutral-DEFAULT/20 z-30" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
                        }} />
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-white/70 rounded-full shadow-md z-30" />
                      </>
                    )}
                    {photo.decorations?.includes('tape-top-right') && (
                      <>
                        <div className="absolute -top-2 -right-2 w-16 h-8 bg-white/90 opacity-80 shadow-xl rounded-sm rotate-20 border border-neutral-DEFAULT/20 z-30" style={{
                          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
                        }} />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/70 rounded-full shadow-md z-30" />
                      </>
                    )}
                    {photo.decorations?.includes('tape-bottom-left') && (
                      <>
                        <div className="absolute -bottom-2 -left-2 w-16 h-8 bg-white/90 opacity-80 shadow-xl rounded-sm rotate-20 border border-neutral-DEFAULT/20 z-30" style={{
                          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
                        }} />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white/70 rounded-full shadow-md z-30" />
                      </>
                    )}
                    {photo.decorations?.includes('tape-bottom-right') && (
                      <>
                        <div className="absolute -bottom-2 -right-2 w-16 h-8 bg-white/90 opacity-80 shadow-xl rounded-sm rotate-[-20deg] border border-neutral-DEFAULT/20 z-30" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
                        }} />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/70 rounded-full shadow-md z-30" />
                      </>
                    )}

                    {/* Decorative icons */}
                    {photo.decorations?.includes('star') && (
                      <div className="absolute -top-6 -right-6 w-12 h-12 z-30 animate-pulse" style={{ animationDuration: '2.5s' }}>
                        <svg viewBox="0 0 24 24" className="text-orange-DEFAULT opacity-95 drop-shadow-xl">
                          <defs>
                            <filter id={`star-glow-${idx}`}>
                              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" fill="currentColor" filter={`url(#star-glow-${idx})`} />
                        </svg>
                      </div>
                    )}
                    {photo.decorations?.includes('heart') && (
                      <div className="absolute -bottom-6 -left-6 w-10 h-10 z-30" style={{ animation: 'heartbeat 1.8s ease-in-out infinite' }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes heartbeat {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.15); }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-green-DEFAULT opacity-85 drop-shadow-lg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                    {photo.decorations?.includes('arrow') && (
                      <div className="absolute -top-6 -left-6 w-12 h-12 z-30" style={{ animation: 'arrow-bounce 2.2s ease-in-out infinite' }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes arrow-bounce {
                            0%, 100% { transform: translateX(0) rotate(0deg); }
                            50% { transform: translateX(6px) rotate(5deg); }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-green-DEFAULT opacity-85 drop-shadow-lg">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" />
                        </svg>
                      </div>
                    )}

                    <div className="bg-white p-2.5 shadow-[inset_0_3px_6px_rgba(0,0,0,0.12)] relative z-0">
                      <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm">
                        <div className="absolute inset-0 bg-linear-to-t from-black/8 via-transparent to-transparent z-10 pointer-events-none" />
                        <Image
                          src={photo.src}
                          alt={photo.caption}
                          width={280}
                          height={350}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="mt-2.5 px-3 py-2 text-center bg-linear-to-r from-transparent via-neutral-DEFAULT/8 to-transparent rounded-sm">
                        <p className="text-xs font-display text-neutral-DEFAULT font-bold" style={{ 
                          fontFamily: 'var(--font-display), cursive',
                          textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                          letterSpacing: '0.5px'
                        }}>
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pinned frame style */}
                {isPinned && (
                  <div className={`relative rounded-xl border-4 ${idx % 2 === 0 ? 'border-green-DEFAULT' : 'border-orange-DEFAULT'} bg-white p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`}>
                    {photo.decorations?.includes('pin-top') && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 z-30">
                        <div className="w-full h-full bg-white/98 rounded-full border-2 border-neutral-DEFAULT/30 shadow-[0_6px_12px_rgba(0,0,0,0.25)] flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-orange-DEFAULT shadow-inner" />
                        </div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-white/98 shadow-md" />
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/15 blur-md rounded-full" />
                      </div>
                    )}
                    {photo.decorations?.includes('doodle') && (
                      <div className="absolute -bottom-8 -left-6 w-16 h-12 z-20" style={{ animation: 'doodle-wiggle 3.5s ease-in-out infinite' }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes doodle-wiggle {
                            0%, 100% { transform: translateX(0) rotate(0deg); }
                            25% { transform: translateX(3px) rotate(2deg); }
                            75% { transform: translateX(-3px) rotate(-2deg); }
                          }
                        `}} />
                        <svg viewBox="0 0 32 16" className="text-green-DEFAULT opacity-75">
                          <path d="M2 8 Q8 4 14 8 T26 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                          <circle cx="4" cy="8" r="2" fill="currentColor" />
                          <circle cx="28" cy="8" r="2" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                    <div className="overflow-hidden rounded-lg relative z-0">
                      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/12 z-10 pointer-events-none" />
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={200}
                        height={250}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-orange-light border-2 border-white shadow-[0_6px_16px_rgba(166,90,32,0.5)] z-20" />
                    <div className="absolute -bottom-3 -left-3 h-7 w-7 rounded-full bg-green-light border-2 border-white shadow-[0_6px_16px_rgba(0,80,27,0.5)] z-20" />
                  </div>
                )}

                {/* Tape frame style */}
                {isTape && (
                  <div className={`relative rounded-xl border-4 ${idx % 2 === 0 ? 'border-green-DEFAULT' : 'border-orange-DEFAULT'} bg-white p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`}>
                    {photo.decorations?.includes('tape-all') && (
                      <>
                        {['-top-3 -left-3 rotate-[-25deg]', '-top-3 -right-3 rotate-25', '-bottom-3 -left-3 rotate-25', '-bottom-3 -right-3 rotate-[-25deg]'].map((pos, i) => (
                          <div key={i} className={`absolute ${pos} w-14 h-8 bg-white/85 opacity-90 shadow-lg rounded-sm border border-neutral-DEFAULT/20 z-30`} style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                          }}>
                            <div className="absolute inset-0 bg-linear-to-br from-white/60 to-transparent rounded-sm" />
                          </div>
                        ))}
                      </>
                    )}
                    <div className="overflow-hidden rounded-lg relative z-0">
                      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/12 z-10 pointer-events-none" />
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={200}
                        height={250}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {photo.decorations?.includes('star') && (
                      <div className="absolute -top-6 -right-6 w-14 h-14 z-30 animate-pulse" style={{ animationDuration: '3s' }}>
                        <svg viewBox="0 0 24 24" className="text-orange-DEFAULT opacity-95 drop-shadow-xl">
                          <defs>
                            <filter id={`star-glow-tape-${idx}`}>
                              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" fill="currentColor" filter={`url(#star-glow-tape-${idx})`} />
                          <circle cx="12" cy="12" r="3" fill="white" opacity="0.9" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Doodle frame style */}
                {isDoodle && (
                  <div className={`relative rounded-xl border-4 ${idx % 2 === 0 ? 'border-green-DEFAULT' : 'border-orange-DEFAULT'} bg-white p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      <defs>
                        <pattern id={`doodle-pattern-${idx}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 0 5 Q 2.5 2.5 5 5 Q 7.5 7.5 10 5" stroke={idx % 2 === 0 ? '#00501B' : '#A65A20'} strokeWidth="2" fill="none" opacity="0.6" />
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill={`url(#doodle-pattern-${idx})`} opacity="0.4" />
                    </svg>
                    <div className="overflow-hidden rounded-lg relative z-0">
                      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/12 z-10 pointer-events-none" />
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={200}
                        height={250}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {photo.decorations?.includes('star') && (
                      <div className="absolute -top-5 -right-5 w-10 h-10 z-20 animate-pulse" style={{ animationDuration: '2.5s' }}>
                        <svg viewBox="0 0 24 24" className="text-orange-DEFAULT opacity-90 drop-shadow-lg">
                          <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Central hero section with handwriting animation - no card wrapper */}
          <div className="relative z-30 mx-auto w-full max-w-5xl">
            <style dangerouslySetInnerHTML={{__html: `
              .animation-demo-wrapper section > div.absolute.inset-0 {
                display: none !important;
              }
              .animation-demo-wrapper section {
                min-height: auto !important;
                height: auto !important;
                padding: 2rem 1rem !important;
                background: transparent !important;
              }
            `}} />
            <div className="animation-demo-wrapper">
              <TrueHandwritingHero />
            </div>
          </div>

          {/* Floating decorative sparkles */}
          {[...Array(6)].map((_, i) => {
            const size = 2 + (i % 3);
            return (
              <div
                key={i}
                className="pointer-events-none absolute z-4 hidden xl:block animate-pulse"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${15 + (i % 3) * 30}%`,
                  animationDuration: `${2 + i * 0.5}s`,
                  animationDelay: `${i * 0.3}s`,
                  width: `${size * 4}px`,
                  height: `${size * 4}px`,
                }}
                aria-hidden
              >
                <div className={`w-full h-full rounded-full ${i % 2 === 0 ? 'bg-green-DEFAULT' : 'bg-orange-DEFAULT'} shadow-lg`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
