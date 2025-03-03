import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MissionVision() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-primary/5 rounded-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To provide exceptional education that empowers students to become 
              critical thinkers, innovative problem-solvers, and compassionate 
              global citizens. We strive to create a nurturing environment that 
              fosters academic excellence, personal growth, and character development.
            </p>
          </motion.div>

          <motion.div 
            className="bg-primary/5 rounded-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be recognized as a leading educational institution that sets the 
              standard for academic excellence and holistic development. We aim to 
              shape future leaders who are equipped with the knowledge, skills, and 
              values needed to make meaningful contributions to society.
            </p>
          </motion.div>

          <motion.div 
            className="md:col-span-2 text-center mt-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Our Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Excellence",
                "Integrity",
                "Innovation",
                "Respect",
                "Responsibility",
                "Collaboration",
                "Global Mindset",
                "Community Service"
              ].map((value, index) => (
                <div 
                  key={value}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm"
                >
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}