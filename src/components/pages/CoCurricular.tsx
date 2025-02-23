import React from 'react';
import Container from '../ui/Container';
import { Music, Palette, Trophy, Theater } from 'lucide-react';

const activities = [
  {
    icon: Music,
    title: "Performing Arts",
    description: "Music, dance, and drama programs to nurture artistic talents",
    programs: ["Classical Music", "Contemporary Dance", "Theater Productions", "Annual Performances"]
  },
  {
    icon: Trophy,
    title: "Sports & Athletics",
    description: "Comprehensive sports program for physical development",
    programs: ["Cricket Academy", "Basketball", "Athletics", "Swimming"]
  },
  {
    icon: Palette,
    title: "Visual Arts",
    description: "Creative expression through various art forms",
    programs: ["Painting", "Sculpture", "Digital Art", "Photography"]
  },
  {
    icon: Theater,
    title: "Clubs & Societies",
    description: "Extra-curricular activities for holistic development",
    programs: ["Debate Club", "Science Club", "Eco Club", "Literary Society"]
  }
];

export default function CoCurricular() {
  return (
    <div id="co-curricular" className="py-24 bg-primary-light/10">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl text-neutral-dark mb-4">Co-Curricular Activities</h2>
          <p className="text-xl text-primary font-body max-w-2xl mx-auto">
            Nurturing talents beyond academics for holistic development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <activity.icon className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl text-neutral-dark mb-4">{activity.title}</h3>
              <p className="text-neutral-dark/80 mb-6">{activity.description}</p>
              <ul className="space-y-2">
                {activity.programs.map((program, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-primary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {program}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}