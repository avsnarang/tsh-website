'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Users, Trophy, Globe, ArrowRight } from 'lucide-react';
import type { Feature } from '../../types/components';

const features: Feature[] = [
  {
    title: "Academic Excellence",
    description: "Comprehensive curriculum designed to foster critical thinking and academic achievement",
    icon: "BookOpen",
    link: "/academics"
  },
  {
    title: "Experienced Faculty",
    description: "Dedicated teachers committed to nurturing each student's potential",
    icon: "Users",
    link: "/faculty"
  },
  {
    title: "Student Achievement",
    description: "Consistent record of outstanding academic and extracurricular accomplishments",
    icon: "Trophy",
    link: "/achievements"
  },
  {
    title: "Global Perspective",
    description: "International exposure through exchange programs and cultural activities",
    icon: "Globe",
    link: "/international"
  }
];

const iconComponents = {
  BookOpen,
  Users,
  Trophy,
  Globe
};

export default function Features() {
  return (
    <section className="pt-24 pb-4 relative">
      {/* Complete the circle from Hero-2 - adjusted position to show smaller part */}
      <div className="absolute -top-72 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
      
      {/* Extended background pattern from Hero */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-[70%] opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Gradient fade-out for smooth transition */}
        <div className="absolute top-[40%] left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-4xl md:text-5xl text-neutral-dark font-display mb-4">
            Why Choose <span className="text-green">The Scholars' Home</span>?
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
            We provide a nurturing environment where students can excel academically and develop into well-rounded individuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon as keyof typeof iconComponents];
            
            return (
              <motion.div
                key={feature.title}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 1, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent rounded-2xl" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-light to-green rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display text-neutral-dark mb-3">{feature.title}</h3>
                  <p className="text-neutral-dark/70 mb-6">{feature.description}</p>
                  <Link
                    href={feature.link}
                    className="text-green hover:text-green-dark font-medium transition-colors inline-flex items-center gap-2 group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Connecting element to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-light/50 to-transparent" />
    </section>
  );
}
