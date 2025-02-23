import React from 'react';

interface AchievementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AchievementCard({ icon, title, description }: AchievementCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-primary/20 rounded-2xl transition-transform group-hover:scale-105" />
      <div className="relative p-8 bg-neutral-light rounded-2xl transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
        <div className="mb-6 text-primary">{icon}</div>
        <h3 className="text-2xl font-semibold mb-3 text-neutral-dark line-clamp-2">{title}</h3>
        <p className="text-primary/80 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}