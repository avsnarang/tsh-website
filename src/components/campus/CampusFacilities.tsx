'use client';

import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
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
      {/* Unique geometric background */}
      <div className="absolute inset-0 bg-[#f8fafc]">
        {/* Top transition gradient for seamless flow from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f8fafc] to-transparent z-[1]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 15% 50%, rgba(166, 212, 180, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 85% 30%, rgba(166, 212, 180, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.2) 0%, transparent 40%)`
        }} />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group h-full"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-orange-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <OptimizedImage
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 via-neutral-dark/20 to-transparent" />
                    
                    {/* Title on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-display text-white">
                        {facility.title}
                      </h3>
                    </div>

                    {/* Hover accent */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow">
                    <p className="text-neutral-dark/70 font-body leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="h-1 bg-gradient-to-r from-green via-green-light to-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Bottom fade for seamless transition to Achievements (green) section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green via-green/60 to-transparent z-[1]" />
    </section>
  );
}
