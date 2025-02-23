import React from 'react';
import { Award, Star, Trophy, Medal } from 'lucide-react';
import Container from '../ui/Container';
import AchievementCard from './AchievementCard';
import ScrollReveal from '../animations/ScrollReveal';

const achievements = [
  {
    icon: <Trophy className="h-10 w-10" />,
    title: "Best CBSE School",
    description: "Ranked #1 in the region for academic excellence and infrastructure"
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "100% Board Results",
    description: "Consistent outstanding performance in CBSE board examinations"
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Sports Excellence",
    description: "National level achievements in multiple sports disciplines"
  },
  {
    icon: <Medal className="h-10 w-10" />,
    title: "Innovation Hub",
    description: "Recognized for STEM education and technological innovation"
  }
];

export default function Achievements() {
  return (
    <div className="py-24 bg-neutral-light relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-dark mb-4">Our Achievements</h2>
            <p className="text-xl text-primary font-body max-w-2xl mx-auto">
              Recognition that reflects our commitment to excellence in education
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <AchievementCard {...achievement} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}