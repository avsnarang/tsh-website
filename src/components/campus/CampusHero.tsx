'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, GraduationCap, Award, Sparkles } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CampusInfo } from '../../types/campus';
import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';
import BreadcrumbNav from '../navigation/BreadcrumbNav';
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
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={info.heroImage || info.facilities[0]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"}
          alt={`${info.name} Campus`}
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-dark/95 via-green-dark/85 to-green-dark/70" />
        {/* Bottom gradient for transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-green-light/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[250px] h-[250px] rounded-full bg-orange/10 blur-3xl" />
      </div>

      {/* Breadcrumb at top */}
      <Container className="relative z-10 pt-32">
        <BreadcrumbNav variant="light" />
      </Container>

      {/* Main content - centered vertically */}
      <Container className="relative z-10 flex-1 flex items-center py-12">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full mb-8 border border-white/20"
              >
                <Sparkles className="h-4 w-4 text-orange-light" />
                <span className="font-medium text-sm">Welcome to Our Campus</span>
              </motion.div>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal delay={0.1}>
              <TextReveal>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                  {info.name}
                </h1>
              </TextReveal>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.2}>
              <TextReveal delay={0.1}>
                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
                  {info.description}
                </p>
              </TextReveal>
            </ScrollReveal>

            {/* Stats Row */}
            <ScrollReveal delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
              >
                {info.stats.map((stat, index) => {
                  const StatIcon = getStatIcon(index);
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center">
                        <StatIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-display text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/60">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/admissions">
                  <Button variant="cta" className="group text-lg px-8 py-4 bg-orange hover:bg-orange-dark shadow-lg shadow-orange/30">
                    Apply Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button variant="outline2" className="group text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-green-dark">
                    Schedule a Visit
                    <MapPin className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
