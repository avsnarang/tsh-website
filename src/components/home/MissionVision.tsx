import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Compass, Eye, Star } from 'lucide-react';

export default function MissionVision() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 relative bg-white" ref={ref}>
      {/* Gradient transition from white to colored background - continuing from Hero-2 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-neutral-light/50" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-2/3 h-2/3 bg-green-light/40 rounded-full blur-2xl transform translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-orange-light/40 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/30 text-green rounded-full mb-4">
            <Star className="h-4 w-4" />
            <span className="font-medium">Our Purpose</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-neutral-dark mb-4">
            Guiding <span className="text-green">Principles</span>
          </h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group lg:mt-12"
          >
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-light/20 to-transparent rounded-2xl" />
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-green rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-light to-green rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-display text-green">Our Mission</h3>
                </div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  To provide exceptional education that empowers students to become 
                  critical thinkers, innovative problem-solvers, and compassionate 
                  global citizens. We strive to create a nurturing environment that 
                  fosters academic excellence, personal growth, and character development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <div className="relative bg-green rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-orange rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-light to-orange rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-display text-white">Our Vision</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  To be recognized as a leading educational institution that sets the 
                  standard for academic excellence and holistic development. We aim to 
                  shape future leaders who are equipped with the knowledge, skills, and 
                  values needed to make meaningful contributions to society.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
