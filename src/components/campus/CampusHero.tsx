'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, GraduationCap, MessageSquareQuote, Trophy, Sparkles } from 'lucide-react';
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
  const Icon = icons[index % icons.length];
  return Icon;
};

export default function CampusHero({ info }: CampusHeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-light flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        {/* Bottom left decorative circle */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        {/* Center decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Bottom fade for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <Container className="relative z-10 py-24 mt-16">
        <BreadcrumbNav />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Left Content */}
          <ScrollReveal direction="left">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-6"
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold text-sm">Discover Our Campus</span>
              </motion.div>
              
              <TextReveal>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-dark mb-6 leading-tight">
                  Welcome to{" "}
                  <span className="text-green">{info.name.split(',')[0]}</span>
                  {info.name.includes(',') && (
                    <span className="text-orange">{info.name.split(',').slice(1).join(',')}</span>
                  )}
                </h1>
              </TextReveal>

              <TextReveal delay={0.2}>
                <p className="text-xl text-neutral-dark/70 max-w-xl mb-8 font-body">
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
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-light/10 via-primary-light/5 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-primary-light/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                      
                      <div className="relative bg-white rounded-2xl p-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-light to-green flex items-center justify-center">
                            <StatIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-display text-neutral-dark">
                              {stat.value}
                            </div>
                            <div className="text-sm text-neutral-dark/60">
                              {stat.label}
                            </div>
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
                  <Button
                    variant="cta"
                    className="group text-lg px-8 shadow-xl shadow-green/20"
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button
                    variant="outline2"
                    className="group text-lg px-8 border-2 flex items-center justify-center"
                  >
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
                
                {/* Image Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/40 to-transparent" />
              </div>
              
              {/* Decorative Border Elements */}
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-orange rounded-3xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-full h-full border-2 border-green rounded-3xl pointer-events-none" />

              {/* Floating Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-light to-orange rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-display text-neutral-dark">
                      Excellence
                    </div>
                    <div className="text-sm text-neutral-dark/60">
                      Since 2003
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
