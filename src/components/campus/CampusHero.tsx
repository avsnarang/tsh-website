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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Soft decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-green-light/30 blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full bg-orange-light/25 blur-3xl"
        />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-green-light/20 blur-3xl" />
      </div>
      
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #166534 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Main content */}
      <Container className="relative z-10 flex-1 flex items-center py-8 md:py-12 px-6 md:px-6 lg:px-8">
        <div className="w-full px-12 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <ScrollReveal>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green/10 text-green rounded-full mb-6"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="font-medium text-sm tracking-wide">Excellence in Education</span>
                </motion.div>
              </ScrollReveal>

              {/* Title */}
              <ScrollReveal delay={0.1}>
                <TextReveal>
                  <h1 className="font-display text-neutral-dark mb-6 leading-[1.1]">
                    <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">The Scholars' Home</span>
                    <span className="relative inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                      <span className="text-green">{info.name.replace("The Scholars' Home, ", "").replace("The Scholars' Home ", "")}</span>
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-orange origin-left rounded-full"
                      />
                    </span>
                  </h1>
                </TextReveal>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.2}>
                <TextReveal delay={0.1}>
                  <p className="text-lg md:text-xl text-neutral-dark/70 max-w-xl mx-auto lg:mx-0 mb-8 font-body leading-relaxed">
                    {info.description}
                  </p>
                </TextReveal>
              </ScrollReveal>

              {/* Stats inline */}
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                  {info.stats.slice(0, 3).map((stat, index) => {
                    const StatIcon = getStatIcon(index);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-light to-green flex items-center justify-center shadow-lg shadow-green/20">
                          <StatIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-2xl font-display text-neutral-dark">{stat.value}</div>
                          <div className="text-xs text-neutral-dark/60">{stat.label}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal delay={0.4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                >
                  <Link href="/admissions">
                    <Button variant="cta" className="group text-base md:text-lg px-8 py-4 bg-green hover:bg-green-dark shadow-2xl shadow-green/30 w-full sm:w-auto">
                      Apply Now
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  
                  <Link href="/contact">
                    <Button variant="outline2" className="group text-base md:text-lg px-8 py-4 border-2 border-green text-green hover:bg-green hover:text-white inline-flex items-center justify-center gap-2 w-full sm:w-auto transition-all duration-300">
                      Schedule a Visit
                      <MapPin className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Right column - Image with decorative frame */}
            <div className="order-1 lg:order-2">
              <ScrollReveal delay={0.2}>
                <div className="relative">
                  {/* Decorative frame behind image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute -inset-4 bg-linear-to-br from-green-light/30 via-green/20 to-orange-light/30 rounded-3xl blur-xl"
                  />
                  
                  {/* Green accent border */}
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: 20 }}
                    animate={{ opacity: 1, x: 12, y: 12 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute inset-0 border-2 border-green/30 rounded-3xl"
                  />
                  
                  {/* Orange accent border */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: -20 }}
                    animate={{ opacity: 1, x: -12, y: -12 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute inset-0 border-2 border-orange/30 rounded-3xl"
                  />
                  
                  {/* Main image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3"
                  >
                    <OptimizedImage
                      src={info.heroImage || info.facilities[0]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"}
                      alt={`${info.name} Campus`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Subtle gradient overlay on image */}
                    <div className="absolute inset-0 bg-linear-to-t from-green-dark/30 via-transparent to-transparent" />
                    
                    {/* Floating stat card on image */}
                    {info.stats[3] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange to-orange-dark flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xl font-display text-neutral-dark">{info.stats[3].value}</div>
                            <div className="text-xs text-neutral-dark/60">{info.stats[3].label}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
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
          className="flex flex-col items-center gap-2 text-neutral-dark/40 hover:text-green transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
