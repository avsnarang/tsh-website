import React from 'react';
import Container from '../ui/Container';
import { Trophy } from 'lucide-react';
import { CampusInfo } from '../../types/campus';

interface CampusAchievementsProps {
  info: CampusInfo;
}

export default function CampusAchievements({ info }: CampusAchievementsProps) {
  // If there are no achievements, don't render the section
  if (!info.achievements?.length) {
    return null;
  }

  return (
    <div className="py-24 bg-neutral-light">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl text-neutral-dark mb-4">Our Achievements</h2>
          <p className="text-xl text-primary font-body max-w-2xl mx-auto line-clamp-2">
            Recognition that reflects our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <Trophy className="h-12 w-12 text-primary mb-6 shrink-0" />
              <div className="text-sm text-primary font-semibold mb-2 truncate">
                {achievement.year}
              </div>
              <h3 className="text-2xl text-neutral-dark mb-4 line-clamp-2">
                {achievement.title}
              </h3>
              <p className="text-neutral-dark/80 line-clamp-3">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
