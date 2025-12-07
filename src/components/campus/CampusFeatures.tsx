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
    <section className="relative py-24 overflow-hidden">
      {/* Continuous gradient background */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, 
          #a5d6a7 0%,
          #81c784 20%,
          #66bb6a 50%,
          #4caf50 80%,
          #43a047 100%)`
      }} />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-green-light/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[300px] rounded-full bg-orange/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-sm">Why Choose Us</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                What Makes Us <span className="text-orange-light">Unique</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
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
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-white/40 to-orange-light/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green to-green-dark flex items-center justify-center mb-6">
                      <FeatureIcon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-display text-neutral-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-dark/70 font-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
