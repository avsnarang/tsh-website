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
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Soft decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-green-light/20 blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-green-light/15 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green/10 text-green rounded-full mb-6"
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
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full border border-neutral-200">
                    <div className="absolute inset-0 bg-linear-to-br from-green-light/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-light to-green flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-green/20">
                        <FeatureIcon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-display text-neutral-dark mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-dark/70 font-body leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
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
