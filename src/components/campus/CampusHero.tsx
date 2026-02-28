'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, GraduationCap, Award, Sparkles } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CampusInfo } from '../../types/campus';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';

interface CampusHeroProps {
  info: CampusInfo;
}

const getStatIcon = (index: number) => {
  const icons = [Users, Building2, GraduationCap, Award];
  return icons[index % icons.length];
};

const getStatColor = (index: number) => {
  const colors = [
    'from-green-light to-green shadow-green/20',
    'from-orange-light to-orange shadow-orange/20',
    'from-green-light to-green shadow-green/20',
    'from-orange-light to-orange shadow-orange/20',
  ];
  return colors[index % colors.length];
};

export default function CampusHero({ info }: CampusHeroProps) {
  const campusName = info.name.replace("The Scholars' Home, ", "").replace("The Scholars' Home ", "");

  return (
    <section
      className="relative flex flex-col overflow-hidden lg:h-[calc(100svh-var(--page-top-spacing))]"
    >
      {/* Decorative Background Elements - fixed to cover full viewport including behind navbar */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <Container className="relative z-10 flex-1 flex flex-col justify-start min-h-0 pt-4 sm:pt-2 md:pt-0 pb-8 sm:pb-0">
        {/* Centered text content */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 shrink-0">
          {/* Badge */}
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green/10 text-green rounded-full mb-3 sm:mb-5"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-medium text-xs sm:text-sm tracking-wide">Excellence in Education</span>
            </motion.div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.1}>
            <TextReveal>
              <h1 className="font-display text-neutral-dark mb-2 sm:mb-3 leading-[1.1]">
                <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl">The Scholars&apos; Home</span>
                <span className="relative inline-block text-2xl sm:text-3xl md:text-5xl lg:text-6xl mt-1 sm:mt-2">
                  <span className="text-green">{campusName}</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-orange origin-left rounded-full"
                  />
                </span>
              </h1>
            </TextReveal>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.2}>
            <TextReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-xl text-neutral-dark/70 max-w-2xl mx-auto mb-4 sm:mb-6 font-body leading-relaxed px-2">
                {info.description}
              </p>
            </TextReveal>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            >
              <Link href="/admissions" className="w-full sm:w-auto">
                <Button variant="cta" className="group text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-green hover:bg-green-dark shadow-2xl shadow-green/30 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline2" className="group text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-green text-green hover:bg-green hover:text-white inline-flex items-center justify-center gap-2 w-full sm:w-auto transition-all duration-300">
                  Schedule a Visit
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Panoramic image with floating stat cards */}
        <ScrollReveal delay={0.3}>
          <div className="relative max-w-6xl mx-auto w-full min-h-0">
            {/* Decorative glow behind image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -inset-4 bg-linear-to-br from-green-light/30 via-transparent to-orange-light/30 rounded-2xl sm:rounded-3xl blur-xl"
            />

            {/* Accent borders - hidden on mobile to prevent overflow */}
            <motion.div
              initial={{ opacity: 0, x: -12, y: -12 }}
              animate={{ opacity: 1, x: -8, y: -8 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute inset-0 border-2 border-green/30 rounded-3xl hidden md:block"
            />
            <motion.div
              initial={{ opacity: 0, x: 12, y: 12 }}
              animate={{ opacity: 1, x: 8, y: 8 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute inset-0 border-2 border-orange/30 rounded-3xl hidden md:block"
            />

            {/* Main image - taller on mobile, panoramic on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            >
              <Image
                src={info.heroImage || info.facilities[0]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"}
                alt={`${info.name} Campus`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-dark/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating stat cards on left/right edges - desktop only */}
            {info.stats[0] && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -left-6 top-1/2 -translate-y-1/2 hidden lg:block"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${getStatColor(0)} flex items-center justify-center shadow-lg`}>
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-display text-neutral-dark">{info.stats[0].value}</div>
                      <div className="text-xs text-neutral-dark/60">{info.stats[0].label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {info.stats[1] && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:block"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${getStatColor(1)} flex items-center justify-center shadow-lg`}>
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-display text-neutral-dark">{info.stats[1].value}</div>
                      <div className="text-xs text-neutral-dark/60">{info.stats[1].label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stat cards below image */}
            {/* Mobile: 2x2 grid with all 4 stats */}
            {/* Desktop: only stats 3 & 4 (first 2 are floating on image sides) */}
            <div className="grid grid-cols-2 lg:flex lg:justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              {info.stats.slice(0, 4).map((stat, index) => {
                const StatIcon = getStatIcon(index);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={index < 2 ? 'block lg:hidden' : 'block'}
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-xl border border-white/50">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-br ${getStatColor(index)} flex items-center justify-center shadow-lg shrink-0`}>
                          <StatIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-lg sm:text-xl font-display text-neutral-dark">{stat.value}</div>
                          <div className="text-[10px] sm:text-xs text-neutral-dark/60">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
