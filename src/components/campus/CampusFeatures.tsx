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
      {/* Flowing gradient background - continues from hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-green via-white to-white" />
      
      {/* Soft decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-24 w-96 h-96 rounded-full bg-green-light/40 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-green-light/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-light/20 blur-3xl" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute top-0 left-0 right-0 h-[60%] opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Gradient fade for pattern */}
      <div className="absolute top-[40%] left-0 right-0 h-[20%] bg-gradient-to-b from-transparent to-white" />

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
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full border border-green-light/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent rounded-3xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-light to-green flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
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
      
      {/* Bottom transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-light/50 to-transparent" />
    </section>
  );
}
