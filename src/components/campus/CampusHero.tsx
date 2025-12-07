'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, GraduationCap, Award, Sparkles, ChevronDown } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CampusInfo } from '../../types/campus';
import OptimizedImage from '../OptimizedImage';
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

export default function CampusHero({ info }: CampusHeroProps) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Full-bleed background with artistic overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={info.heroImage || info.facilities[0]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"}
          alt={`${info.name} Campus`}
          className="w-full h-full object-cover scale-105"
        />
        
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-dark/95 via-green-dark/80 to-green/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-dark/90 via-transparent to-transparent" />
        
        {/* Animated gradient accent */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred circles */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-orange/20 blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-green-light/20 blur-3xl"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating accent shapes */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[15%] w-20 h-20 border border-white/10 rounded-2xl hidden lg:block"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-[10%] w-16 h-16 border border-orange/20 rounded-full hidden lg:block"
        />
      </div>

      {/* Main content */}
      <Container className="relative z-10 flex-1 flex items-center py-4 sm:py-6 md:py-12 px-4 md:px-6 pt-28 sm:pt-32 md:pt-36">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <ScrollReveal>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20"
                >
                  <Sparkles className="h-4 w-4 text-orange-light" />
                  <span className="font-medium text-sm tracking-wide">Excellence in Education</span>
                </motion.div>
              </ScrollReveal>

              {/* Title with animated underline */}
              <ScrollReveal delay={0.1}>
                <TextReveal>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-[1.1]">
                    {info.name.split(' ').map((word, i) => (
                      <span key={i} className="inline-block">
                        {i === info.name.split(' ').length - 1 ? (
                          <span className="relative">
                            <span className="text-orange-light">{word}</span>
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.8, delay: 1 }}
                              className="absolute -bottom-2 left-0 right-0 h-1 bg-orange origin-left rounded-full"
                            />
                          </span>
                        ) : (
                          <span>{word} </span>
                        )}
                      </span>
                    ))}
                  </h1>
                </TextReveal>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.2}>
                <TextReveal delay={0.1}>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 font-body leading-relaxed">
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
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                >
                  <Link href="/admissions">
                    <Button variant="cta" className="group text-base md:text-lg px-8 py-4 bg-orange hover:bg-orange-dark shadow-2xl shadow-orange/40 w-full sm:w-auto">
                      Apply Now
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  
                  <Link href="/contact">
                    <Button variant="outline2" className="group text-base md:text-lg px-8 py-4 bg-white/5 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-green-dark inline-flex items-center justify-center gap-2 w-full sm:w-auto transition-all duration-300">
                      Schedule a Visit
                      <MapPin className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Right column - Stats cards */}
            <div className="hidden lg:block">
              <ScrollReveal delay={0.4}>
                <div className="grid grid-cols-2 gap-4">
                  {info.stats.map((stat, index) => {
                    const StatIcon = getStatIcon(index);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`relative group ${index === 0 ? 'col-span-2' : ''}`}
                      >
                        <div className={`relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 overflow-hidden ${index === 0 ? 'flex items-center gap-6' : ''}`}>
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className={`relative z-10 ${index === 0 ? 'flex items-center gap-6' : ''}`}>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center shadow-lg shadow-orange/30 ${index !== 0 ? 'mb-4' : ''}`}>
                              <StatIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="text-3xl md:text-4xl font-display text-white mb-1">
                                {stat.value}
                              </div>
                              <div className="text-sm text-white/70 font-medium">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile stats - shown below content */}
          <div className="lg:hidden mt-8">
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-3">
                {info.stats.map((stat, index) => {
                  const StatIcon = getStatIcon(index);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center">
                          <StatIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-display text-white">{stat.value}</div>
                          <div className="text-xs text-white/60">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToContent}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
    </section>
  );
}
