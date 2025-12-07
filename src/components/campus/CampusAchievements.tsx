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
  // If there are no achievements, don't render the section
  if (!info.achievements?.length) {
    return null;
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Green Background with decorative elements */}
      <div className="absolute inset-0 bg-green">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-light/20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-light/20" />
        
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-6 backdrop-blur-sm"
            >
              <Trophy className="h-4 w-4" />
              <span className="font-semibold text-sm">Recognition & Excellence</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Our <span className="text-orange-light">Achievements</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
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
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group h-full"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-white/30 to-orange-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Year Badge */}
                    <div className="absolute -top-3 right-6">
                      <div className="px-4 py-1 bg-gradient-to-r from-orange to-orange-dark text-white text-sm font-semibold rounded-full shadow-lg">
                        {achievement.year}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-light/20 to-green-light/5 flex items-center justify-center mb-6 group-hover:from-green group-hover:to-green-dark transition-all duration-300">
                      <AchievementIcon className="w-8 h-8 text-green group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-display text-neutral-dark mb-4 group-hover:text-green transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-neutral-dark/70 font-body leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-green-light/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
