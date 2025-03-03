import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, Globe } from 'lucide-react';
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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose The Scholars' Home?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide a nurturing environment where students can excel academically and develop into well-rounded individuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon as keyof typeof iconComponents];
            
            return (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link
                    to={feature.link}
                    className="text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}