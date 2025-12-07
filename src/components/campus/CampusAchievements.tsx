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
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Soft decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-light/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-orange-light/15 blur-3xl" />
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-24 left-0 w-32 h-px bg-gradient-to-r from-transparent via-orange-light/50 to-transparent" />
      <div className="absolute top-24 right-0 w-32 h-px bg-gradient-to-r from-transparent via-orange-light/50 to-transparent" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 text-orange-dark rounded-full mb-6"
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
                  {/* Card glow effect on hover */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-light/40 to-orange/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full border border-neutral-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-light/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Year badge */}
                    <div className="absolute -top-3 right-6">
                      <div className="px-4 py-1 bg-gradient-to-r from-orange to-orange-dark text-white text-sm font-semibold rounded-full shadow-lg shadow-orange/30">
                        {achievement.year}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-light to-orange flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-orange/20">
                        <AchievementIcon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-display text-neutral-dark mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-neutral-dark/70 font-body text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
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
