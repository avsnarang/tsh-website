'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Sparkles, Target, Lightbulb } from 'lucide-react';
import Container from '../ui/Container';
import { CampusInfo } from '../../types/campus';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';

interface CampusFeaturesProps {
  info: CampusInfo;
}

const getFeatureIcon = (index: number) => {
  const icons = [Award, BookOpen, Users, Sparkles, Target, Lightbulb];
  return icons[index % icons.length];
};

export default function CampusFeatures({ info }: CampusFeaturesProps) {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Top transition gradient for seamless flow from Hero */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-[1]" />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-light/10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-orange-light/10 -translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-sm">Why Choose Us</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-dark mb-6">
                What Makes Us <span className="text-green">Unique</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                Discover what sets us apart and how we nurture excellence in every student
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.features.map((feature, index) => {
            const FeatureIcon = getFeatureIcon(index);
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group h-full"
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/40 to-orange-light/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-xl transition-all duration-300 h-full border border-neutral-100 group-hover:border-green-light/30">
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-light/20 to-green-light/5 flex items-center justify-center mb-6 group-hover:from-green group-hover:to-green-dark transition-all duration-300">
                      <FeatureIcon className="w-8 h-8 text-green group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-display text-neutral-dark mb-4 group-hover:text-green transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-dark/70 font-body leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative corner accent */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-orange-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>

      {/* Bottom fade for seamless transition to Leadership Messages section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1]" style={{
        background: `linear-gradient(to top, #f8fafc 0%, rgba(248, 250, 252, 0.8) 30%, rgba(255, 255, 255, 0.4) 60%, transparent 100%)`
      }} />
    </section>
  );
}
