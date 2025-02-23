import React from 'react';
import Container from '../ui/Container';
import { BookOpen, Award, Users, Brain } from 'lucide-react';

const programs = [
  {
    title: "Primary School",
    grades: "Grades 1-5",
    description: "Foundation years focusing on core skills and creative development",
    features: ["Play-based learning", "Foundational literacy", "Numeracy skills", "Creative arts"]
  },
  {
    title: "Middle School",
    grades: "Grades 6-8",
    description: "Transition phase with focus on analytical and critical thinking",
    features: ["Advanced concepts", "Project-based learning", "Scientific inquiry", "Digital literacy"]
  },
  {
    title: "Secondary School",
    grades: "Grades 9-10",
    description: "Preparation for board examinations with comprehensive subject coverage",
    features: ["CBSE curriculum", "Career guidance", "Practical labs", "Expert faculty"]
  },
  {
    title: "Senior Secondary",
    grades: "Grades 11-12",
    description: "Specialized streams preparing students for higher education",
    features: ["Science stream", "Commerce stream", "Humanities", "Career counseling"]
  }
];

export default function Academics() {
  return (
    <div id="academics" className="py-24 bg-neutral-light">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl text-neutral-dark mb-4">Academic Excellence</h2>
          <p className="text-xl text-primary font-body max-w-2xl mx-auto">
            Comprehensive education programs designed to nurture future leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl text-neutral-dark mb-2">{program.title}</h3>
              <p className="text-primary font-semibold mb-4">{program.grades}</p>
              <p className="text-neutral-dark/80 mb-6">{program.description}</p>
              <ul className="space-y-2">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-primary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
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