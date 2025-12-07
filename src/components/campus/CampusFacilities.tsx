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
    <section className="relative py-24 overflow-hidden">
      {/* Flowing gradient background - continuation from previous section */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-light/50 via-neutral-light to-[#f5f0e8]" />
      
      {/* Soft decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-light/30 blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full bg-orange-light/25 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-[350px] h-[350px] rounded-full bg-green-light/20 blur-3xl" />
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
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-green-light/20">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-dark/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-display text-white">{facility.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow">
                    <p className="text-neutral-dark/70 font-body text-sm leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  {/* Accent bar */}
                  <div className="h-1 bg-gradient-to-r from-green to-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
      
      {/* Bottom transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f0e8] to-transparent" />
    </section>
  );
}
