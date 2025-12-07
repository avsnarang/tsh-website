'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, GraduationCap, MessageSquareQuote, Sparkles } from 'lucide-react';
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
  const icons = [Users, Building2, GraduationCap, MessageSquareQuote];
  return icons[index % icons.length];
};

export default function CampusHero({ info }: CampusHeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-light">
      {/* Decorative background elements using brand colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-light/30" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-orange-light/40" />
        <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-green-light/20" />
      </div>

      <Container className="relative z-10 pt-32 pb-20">
        <BreadcrumbNav />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Left Content */}
          <ScrollReveal direction="left">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/30 text-green rounded-full mb-6"
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold text-sm">Welcome to Our Campus</span>
              </motion.div>
              
              <TextReveal>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-dark mb-6 leading-tight">
                  {info.name.split(',')[0]}
                  {info.name.includes(',') && (
                    <span className="text-green">{info.name.split(',').slice(1).join(',')}</span>
                  )}
                </h1>
              </TextReveal>

              <TextReveal delay={0.2}>
                <p className="text-xl text-neutral-dark/70 max-w-xl mb-8 font-body leading-relaxed">
                  {info.description}
                </p>
              </TextReveal>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {info.stats.map((stat, index) => {
                  const StatIcon = getStatIcon(index);
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-green-light/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green flex items-center justify-center">
                          <StatIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-display text-neutral-dark">
                            {stat.value}
                          </div>
                          <div className="text-xs text-neutral-dark/60">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/admissions">
                  <Button variant="cta" className="group text-lg px-8 shadow-lg">
                    Apply Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button variant="outline2" className="group text-lg px-8">
                    Schedule a Visit
                    <MapPin className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Image Section */}
          <ScrollReveal direction="right" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={info.facilities[0]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"}
                  alt={`${info.name} Campus`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 to-transparent" />
              </div>
              
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-green-light/40 rounded-[2rem] pointer-events-none" />
              <div className="absolute -inset-8 border border-orange-light/30 rounded-[2.5rem] pointer-events-none" />
            </motion.div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
