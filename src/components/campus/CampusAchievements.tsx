'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal } from 'lucide-react';
import Container from '../ui/Container';
import { CampusInfo } from '../../types/campus';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';

interface CampusAchievementsProps {
  info: CampusInfo;
}

const getAchievementIcon = (index: number) => {
  const icons = [Trophy, Award, Star, Medal];
  return icons[index % icons.length];
};

export default function CampusAchievements({ info }: CampusAchievementsProps) {
  if (!info.achievements?.length) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-orange-light">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[350px] h-[350px] rounded-full bg-orange/20" />
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full bg-green-light/20" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange/20 text-orange-dark rounded-full mb-6"
            >
              <Trophy className="h-4 w-4" />
              <span className="font-semibold text-sm">Recognition and Excellence</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-dark mb-6">
                Our <span className="text-orange">Achievements</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                Recognition that reflects our commitment to excellence
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.achievements.map((achievement, index) => {
            const AchievementIcon = getAchievementIcon(index);
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group h-full"
                >
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-xl transition-all duration-300 h-full border border-orange/10">
                    {/* Year badge */}
                    <div className="absolute -top-3 right-6">
                      <div className="px-4 py-1 bg-orange text-white text-sm font-semibold rounded-full shadow-md">
                        {achievement.year}
                      </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-orange flex items-center justify-center mb-6">
                      <AchievementIcon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-display text-neutral-dark mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-neutral-dark/70 font-body text-sm leading-relaxed">
                      {achievement.description}
                    </p>
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
