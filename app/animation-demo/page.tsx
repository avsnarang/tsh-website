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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-light via-[#faf9f6] to-[#f5f3ef]">
      {/* Multi-layered sophisticated background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fefefe] via-[#faf9f6] via-60% to-[#f5f3ef]" />
        
        {/* Animated gradient orbs with better positioning and movement */}
        <div 
          className="absolute left-8 top-20 h-[500px] w-[500px] rounded-full bg-green-light/30 blur-[180px]"
          style={{ 
            animation: 'float-orb-1 20s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute right-12 top-32 h-[600px] w-[600px] rounded-full bg-orange-light/25 blur-[200px]"
          style={{ 
            animation: 'float-orb-2 25s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute bottom-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-green-light/20 blur-[220px]"
          style={{ 
            animation: 'float-orb-3 30s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-orange-light/15 blur-[150px]"
          style={{ 
            animation: 'float-orb-4 18s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        
        {/* Paper texture overlay with better opacity */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.6),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(166,212,180,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-25" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
        
        {/* Animated keyframes for orb movement */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float-orb-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.1); }
            66% { transform: translate(-20px, 30px) scale(0.95); }
          }
          @keyframes float-orb-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-40px, 50px) scale(1.15); }
            66% { transform: translate(25px, -30px) scale(0.9); }
          }
          @keyframes float-orb-3 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            33% { transform: translate(calc(-50% + 50px), calc(-50% - 60px)) scale(1.2); }
            66% { transform: translate(calc(-50% - 40px), calc(-50% + 40px)) scale(0.85); }
          }
          @keyframes float-orb-4 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            33% { transform: translate(calc(-50% + 35px), calc(-50% + 45px)) scale(1.05); }
            66% { transform: translate(calc(-50% - 30px), calc(-50% - 35px)) scale(0.98); }
          }
        `}} />
      </div>

      {/* Enhanced connecting decorative lines with more sophistication */}
      <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
        <svg className="w-full h-full opacity-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00501B" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#A65A20" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#00501B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#A65A20" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A65A20" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#00501B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A65A20" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* More sophisticated curved connecting lines */}
          <path
            d="M 5% 20% Q 15% 30%, 25% 25% T 45% 30%"
            stroke="url(#lineGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="10 6"
            className="hidden lg:block"
            filter="url(#glow)"
            style={{ animation: 'dash-move 8s linear infinite' }}
          />
          <path
            d="M 95% 25% Q 85% 35%, 75% 30% T 55% 35%"
            stroke="url(#lineGradient2)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="10 6"
            className="hidden lg:block"
            filter="url(#glow)"
            style={{ animation: 'dash-move 10s linear infinite reverse' }}
          />
          <path
            d="M 8% 60% Q 20% 50%, 30% 55% T 50% 50%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 5"
            className="hidden xl:block"
            opacity="0.4"
            style={{ animation: 'dash-move 12s linear infinite' }}
          />
          <path
            d="M 92% 60% Q 80% 50%, 70% 55% T 50% 50%"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 5"
            className="hidden xl:block"
            opacity="0.4"
            style={{ animation: 'dash-move 14s linear infinite reverse' }}
          />
        </svg>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash-move {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 32; }
          }
        `}} />
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
                className={`pointer-events-none absolute z-[5] hidden md:block ${sizes.w} ${sizes.h} ${sizes.lg} transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  ...(photo.position.top ? { top: photo.position.top } : {}),
                  ...(photo.position.bottom ? { bottom: photo.position.bottom } : {}),
                  ...('left' in photo.position && photo.position.left ? { left: photo.position.left } : {}),
                  ...('right' in photo.position && photo.position.right ? { right: photo.position.right } : {}),
                  ...('transform' in photo.position && photo.position.transform ? { transform: photo.position.transform } : {}),
                  transitionDelay: `${photo.delay}s`,
                  animationName: mounted ? `float-${idx % 4}-${photo.rotation}` : 'none',
                  animationDuration: `${6 + (idx % 3)}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${photo.delay + 1}s`,
                } as React.CSSProperties}
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

                {/* Polaroid style - Enhanced with better shadows and depth */}
                {isPolaroid && (
                  <div className={`${idx % 2 === 0 ? 'bg-orange-light' : 'bg-green-light'} p-3.5 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.4),0_10px_30px_-10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] rounded-sm relative transition-all duration-300 hover:shadow-[0_35px_90px_-10px_rgba(0,0,0,0.45),0_15px_35px_-8px_rgba(0,0,0,0.25)]`}>
                    {/* Enhanced tape decorations with better shadows */}
                    {photo.decorations?.includes('tape-top-left') && (
                      <>
                        <div className="absolute -top-2.5 -left-2.5 w-[72px] h-9 bg-white/95 opacity-90 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-sm rotate-[-22deg] border border-neutral-DEFAULT/25 z-30 transition-transform duration-300 hover:scale-105" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                        }} />
                        <div className="absolute -top-1.5 -left-1.5 w-4.5 h-4.5 bg-white/80 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] z-30" />
                      </>
                    )}
                    {photo.decorations?.includes('tape-top-right') && (
                      <>
                        <div className="absolute -top-2.5 -right-2.5 w-18 h-9 bg-white/95 opacity-90 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-sm rotate-[22deg] border border-neutral-DEFAULT/25 z-30 transition-transform duration-300 hover:scale-105" style={{
                          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                        }} />
                        <div className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-white/80 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] z-30" />
                      </>
                    )}
                    {photo.decorations?.includes('tape-bottom-left') && (
                      <>
                        <div className="absolute -bottom-2.5 -left-2.5 w-18 h-9 bg-white/95 opacity-90 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-sm rotate-[22deg] border border-neutral-DEFAULT/25 z-30 transition-transform duration-300 hover:scale-105" style={{
                          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                        }} />
                        <div className="absolute -bottom-1.5 -left-1.5 w-4.5 h-4.5 bg-white/80 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] z-30" />
                      </>
                    )}
                    {photo.decorations?.includes('tape-bottom-right') && (
                      <>
                        <div className="absolute -bottom-2.5 -right-2.5 w-18 h-9 bg-white/95 opacity-90 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-sm rotate-[-22deg] border border-neutral-DEFAULT/25 z-30 transition-transform duration-300 hover:scale-105" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                        }} />
                        <div className="absolute -bottom-1.5 -right-1.5 w-4.5 h-4.5 bg-white/80 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] z-30" />
                      </>
                    )}

                    {/* Enhanced decorative icons with better animations */}
                    {photo.decorations?.includes('star') && (
                      <div className="absolute -top-7 -right-7 w-14 h-14 z-30" style={{ animation: `star-twinkle-${idx} 2.5s ease-in-out infinite` }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes star-twinkle-${idx} {
                            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.95; }
                            25% { transform: scale(1.1) rotate(5deg); opacity: 1; }
                            50% { transform: scale(1.15) rotate(-5deg); opacity: 0.9; }
                            75% { transform: scale(1.05) rotate(3deg); opacity: 1; }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-orange-DEFAULT drop-shadow-[0_4px_12px_rgba(166,90,32,0.4)]">
                          <defs>
                            <filter id={`star-glow-${idx}`}>
                              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                            <radialGradient id={`star-gradient-${idx}`}>
                              <stop offset="0%" stopColor="#A65A20" stopOpacity="1" />
                              <stop offset="100%" stopColor="#A65A20" stopOpacity="0.7" />
                            </radialGradient>
                          </defs>
                          <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" fill={`url(#star-gradient-${idx})`} filter={`url(#star-glow-${idx})`} />
                        </svg>
                      </div>
                    )}
                    {photo.decorations?.includes('heart') && (
                      <div className="absolute -bottom-7 -left-7 w-12 h-12 z-30" style={{ animation: 'heartbeat 1.8s ease-in-out infinite' }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes heartbeat {
                            0%, 100% { transform: scale(1); }
                            25% { transform: scale(1.1); }
                            50% { transform: scale(1.2); }
                            75% { transform: scale(1.05); }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-green-DEFAULT drop-shadow-[0_4px_10px_rgba(0,80,27,0.35)]">
                          <defs>
                            <filter id={`heart-glow-${idx}`}>
                              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" filter={`url(#heart-glow-${idx})`} />
                        </svg>
                      </div>
                    )}
                    {photo.decorations?.includes('arrow') && (
                      <div className="absolute -top-7 -left-7 w-14 h-14 z-30" style={{ animation: 'arrow-bounce 2.2s ease-in-out infinite' }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes arrow-bounce {
                            0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
                            25% { transform: translateX(4px) translateY(-2px) rotate(3deg); }
                            50% { transform: translateX(8px) translateY(-4px) rotate(5deg); }
                            75% { transform: translateX(4px) translateY(-2px) rotate(2deg); }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-green-DEFAULT drop-shadow-[0_4px_10px_rgba(0,80,27,0.35)]">
                          <defs>
                            <filter id={`arrow-glow-${idx}`}>
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" filter={`url(#arrow-glow-${idx})`} />
                        </svg>
                      </div>
                    )}

                    <div className="bg-white p-3 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] relative z-0 rounded-sm">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 z-10 pointer-events-none" />
                        <Image
                          src={photo.src}
                          alt={photo.caption}
                          width={280}
                          height={350}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="mt-3 px-4 py-2.5 text-center bg-gradient-to-r from-transparent via-neutral-DEFAULT/10 to-transparent rounded-sm border-t border-neutral-DEFAULT/5">
                        <p className="text-xs font-display text-neutral-DEFAULT font-bold" style={{ 
                          fontFamily: 'var(--font-display), cursive',
                          textShadow: '0 2px 4px rgba(0,0,0,0.12)',
                          letterSpacing: '0.6px'
                        }}>
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pinned frame style - Enhanced */}
                {isPinned && (
                  <div className={`relative rounded-xl border-4 ${idx % 2 === 0 ? 'border-green-DEFAULT' : 'border-orange-DEFAULT'} bg-white p-3.5 shadow-[0_25px_70px_-12px_rgba(0,0,0,0.35),0_8px_25px_-8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.4),0_12px_30px_-6px_rgba(0,0,0,0.25)]`}>
                    {photo.decorations?.includes('pin-top') && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 z-30">
                        <div className="w-full h-full bg-white/98 rounded-full border-2 border-neutral-DEFAULT/30 shadow-[0_6px_12px_rgba(0,0,0,0.25)] flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-orange-DEFAULT shadow-inner" />
                        </div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white/98 shadow-md" />
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
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/15 z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent z-10 pointer-events-none" />
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={200}
                        height={250}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute -top-3.5 -right-3.5 h-9 w-9 rounded-full bg-orange-light border-2 border-white shadow-[0_8px_20px_rgba(166,90,32,0.5),inset_0_1px_2px_rgba(255,255,255,0.8)] z-20 transition-transform duration-300 hover:scale-110" />
                    <div className="absolute -bottom-3.5 -left-3.5 h-8 w-8 rounded-full bg-green-light border-2 border-white shadow-[0_8px_20px_rgba(0,80,27,0.5),inset_0_1px_2px_rgba(255,255,255,0.8)] z-20 transition-transform duration-300 hover:scale-110" />
                  </div>
                )}

                {/* Tape frame style - Enhanced */}
                {isTape && (
                  <div className={`relative rounded-xl border-4 ${idx % 2 === 0 ? 'border-green-DEFAULT' : 'border-orange-DEFAULT'} bg-white p-3.5 shadow-[0_25px_70px_-12px_rgba(0,0,0,0.35),0_8px_25px_-8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.4),0_12px_30px_-6px_rgba(0,0,0,0.25)]`}>
                    {photo.decorations?.includes('tape-all') && (
                      <>
                        {['-top-3 -left-3 rotate-[-25deg]', '-top-3 -right-3 rotate-[25deg]', '-bottom-3 -left-3 rotate-[25deg]', '-bottom-3 -right-3 rotate-[-25deg]'].map((pos, i) => (
                          <div key={i} className={`absolute ${pos} w-14 h-8 bg-white/85 opacity-90 shadow-lg rounded-sm border border-neutral-DEFAULT/20 z-30`} style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                          }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-sm" />
                          </div>
                        ))}
                      </>
                    )}
                    <div className="overflow-hidden rounded-lg relative z-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/15 z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent z-10 pointer-events-none" />
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={200}
                        height={250}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    {photo.decorations?.includes('star') && (
                      <div className="absolute -top-7 -right-7 w-16 h-16 z-30" style={{ animation: `star-twinkle-tape-${idx} 3s ease-in-out infinite` }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes star-twinkle-tape-${idx} {
                            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.95; }
                            25% { transform: scale(1.12) rotate(6deg); opacity: 1; }
                            50% { transform: scale(1.18) rotate(-6deg); opacity: 0.9; }
                            75% { transform: scale(1.08) rotate(4deg); opacity: 1; }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-orange-DEFAULT drop-shadow-[0_4px_12px_rgba(166,90,32,0.4)]">
                          <defs>
                            <filter id={`star-glow-tape-${idx}`}>
                              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                            <radialGradient id={`star-gradient-tape-${idx}`}>
                              <stop offset="0%" stopColor="#A65A20" stopOpacity="1" />
                              <stop offset="100%" stopColor="#A65A20" stopOpacity="0.7" />
                            </radialGradient>
                          </defs>
                          <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" fill={`url(#star-gradient-tape-${idx})`} filter={`url(#star-glow-tape-${idx})`} />
                          <circle cx="12" cy="12" r="3" fill="white" opacity="0.95" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Doodle frame style - Enhanced */}
                {isDoodle && (
                  <div className={`relative rounded-xl border-4 ${idx % 2 === 0 ? 'border-green-DEFAULT' : 'border-orange-DEFAULT'} bg-white p-3.5 shadow-[0_25px_70px_-12px_rgba(0,0,0,0.35),0_8px_25px_-8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.4),0_12px_30px_-6px_rgba(0,0,0,0.25)]`}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      <defs>
                        <pattern id={`doodle-pattern-${idx}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 0 5 Q 2.5 2.5 5 5 Q 7.5 7.5 10 5" stroke={idx % 2 === 0 ? '#00501B' : '#A65A20'} strokeWidth="2" fill="none" opacity="0.6" />
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill={`url(#doodle-pattern-${idx})`} opacity="0.4" />
                    </svg>
                    <div className="overflow-hidden rounded-lg relative z-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/15 z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent z-10 pointer-events-none" />
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={200}
                        height={250}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    {photo.decorations?.includes('star') && (
                      <div className="absolute -top-6 -right-6 w-12 h-12 z-20" style={{ animation: `star-twinkle-doodle-${idx} 2.5s ease-in-out infinite` }}>
                        <style dangerouslySetInnerHTML={{__html: `
                          @keyframes star-twinkle-doodle-${idx} {
                            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
                            25% { transform: scale(1.08) rotate(4deg); opacity: 1; }
                            50% { transform: scale(1.12) rotate(-4deg); opacity: 0.85; }
                            75% { transform: scale(1.05) rotate(2deg); opacity: 1; }
                          }
                        `}} />
                        <svg viewBox="0 0 24 24" className="text-orange-DEFAULT drop-shadow-[0_3px_10px_rgba(166,90,32,0.35)]">
                          <defs>
                            <filter id={`star-glow-doodle-${idx}`}>
                              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" fill="currentColor" filter={`url(#star-glow-doodle-${idx})`} />
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

          {/* Enhanced floating decorative sparkles with better animations */}
          {[...Array(12)].map((_, i) => {
            const size = 3 + (i % 4);
            const positions = [
              { left: '8%', top: '12%' },
              { left: '15%', top: '35%' },
              { left: '5%', top: '65%' },
              { left: '88%', top: '18%' },
              { left: '92%', top: '42%' },
              { left: '85%', top: '68%' },
              { left: '25%', top: '8%' },
              { left: '75%', top: '25%' },
              { left: '20%', top: '55%' },
              { left: '80%', top: '60%' },
              { left: '12%', top: '80%' },
              { left: '90%', top: '85%' },
            ];
            const pos = positions[i] || { left: `${10 + i * 7}%`, top: `${15 + (i % 3) * 25}%` };
            return (
              <div
                key={i}
                className="pointer-events-none absolute z-[4] hidden xl:block"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: `${size * 5}px`,
                  height: `${size * 5}px`,
                  animation: `sparkle-float-${i % 3} ${4 + (i % 3) * 1.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
                aria-hidden
              >
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes sparkle-float-0 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
                    33% { transform: translate(8px, -12px) scale(1.2) rotate(120deg); opacity: 0.9; }
                    66% { transform: translate(-6px, 10px) scale(0.9) rotate(240deg); opacity: 0.7; }
                  }
                  @keyframes sparkle-float-1 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.7; }
                    33% { transform: translate(-10px, 15px) scale(1.15) rotate(-120deg); opacity: 0.95; }
                    66% { transform: translate(12px, -8px) scale(0.85) rotate(-240deg); opacity: 0.65; }
                  }
                  @keyframes sparkle-float-2 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.65; }
                    33% { transform: translate(6px, 10px) scale(1.1) rotate(90deg); opacity: 0.85; }
                    66% { transform: translate(-8px, -12px) scale(0.95) rotate(180deg); opacity: 0.7; }
                  }
                `}} />
                <div className={`w-full h-full rounded-full ${i % 2 === 0 ? 'bg-green-DEFAULT' : 'bg-orange-DEFAULT'} shadow-[0_0_12px_currentColor,0_0_24px_currentColor] opacity-80`} 
                  style={{ 
                    filter: `blur(${size * 0.5}px)`,
                    boxShadow: i % 2 === 0 
                      ? '0 0 8px rgba(0, 80, 27, 0.4), 0 0 16px rgba(0, 80, 27, 0.2)' 
                      : '0 0 8px rgba(166, 90, 32, 0.4), 0 0 16px rgba(166, 90, 32, 0.2)'
                  }} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
