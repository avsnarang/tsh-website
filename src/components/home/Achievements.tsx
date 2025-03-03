import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Trophy } from 'lucide-react';
import type { Achievement } from '../../types/components';

const achievements: Achievement[] = [
  {
    title: "Academic Excellence",
    value: "98%",
    description: "Board exam success rate",
    icon: BookOpen
  },
  {
    title: "Student Placement",
    value: "95%",
    description: "Higher education admission rate",
    icon: Users
  },
  {
    title: "Awards Won",
    value: "200+",
    description: "National & international accolades",
    icon: Trophy
  },
  {
    title: "Distinctions",
    value: "50+",
    description: "Subject distinctions per year",
    icon: Award
  }
];

export default function Achievements() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            A track record of excellence in academics and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            
            return (
              <motion.div
                key={achievement.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {achievement.value}
                </h3>
                <p className="text-xl font-semibold mb-1">
                  {achievement.title}
                </p>
                <p className="text-white/80">
                  {achievement.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/achievements"
            className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            View All Achievements
          </a>
        </motion.div>
      </div>
    </section>
  );
}