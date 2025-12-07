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
    <section className="relative py-24 overflow-hidden bg-green">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-green-light/20" />
        <div className="absolute top-1/2 -right-32 w-[300px] h-[300px] rounded-full bg-green-dark/30" />
        <div className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] rounded-full bg-orange-light/10" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-6"
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
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-green flex items-center justify-center mb-6">
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
