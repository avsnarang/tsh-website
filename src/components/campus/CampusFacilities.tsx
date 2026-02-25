'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import Container from '../ui/Container';
import { CampusInfo } from '../../types/campus';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import OptimizedImage from '../OptimizedImage';

interface CampusFacilitiesProps {
  info: CampusInfo;
}

export default function CampusFacilities({ info }: CampusFacilitiesProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Soft decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-48 w-[500px] h-[500px] rounded-full bg-orange-light/15 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-green-light/15 blur-3xl" />
      </div>
      
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle, #166534 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green/10 text-green rounded-full mb-6"
            >
              <Building2 className="h-4 w-4" />
              <span className="font-semibold text-sm">World-Class Infrastructure</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-dark mb-6">
                Our <span className="text-green">Facilities</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                State-of-the-art infrastructure designed for holistic development
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {info.facilities.map((facility, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative group h-full"
              >
                {/* Card glow effect on hover */}
                <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-green-light/30 to-orange-light/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-neutral-200">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-green-dark/80 via-green-dark/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-display text-white drop-shadow-lg">{facility.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 grow">
                    <p className="text-neutral-dark/70 font-body text-sm leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  {/* Accent bar */}
                  <div className="h-1 bg-linear-to-r from-green via-green-light to-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
