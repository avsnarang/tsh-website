import React from 'react';
import { BookOpen, Users, Trophy, Microscope, Heart, Star } from 'lucide-react';
import Container from './ui/Container';
import FeatureCard from './ui/FeatureCard';
import ScrollReveal from './animations/ScrollReveal';
import AnimatedCounter from './animations/AnimatedCounter';

const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Academic Excellence",
    description: "Fostering critical thinking and creativity through our comprehensive CBSE curriculum",
    highlight: "100% Board Pass Results"
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Nurturing Environment",
    description: "Creating a supportive atmosphere where every student feels valued and encouraged",
    highlight: "Student-First Approach"
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Experienced Mentors",
    description: "Learn from passionate educators dedicated to bringing out the best in every student",
    highlight: "15+ Years Avg. Experience"
  },
  {
    icon: <Microscope className="h-8 w-8" />,
    title: "Modern Infrastructure",
    description: "State-of-the-art facilities designed to enhance the learning experience",
    highlight: "Smart Classrooms"
  }
];

export default function Features() {
  return (
    <div id="about" className="py-24 bg-neutral-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-light/10 rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-alt-light/10 rounded-full translate-x-48 translate-y-48" />
      
      <Container className="relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-dark mb-4">Our Legacy of Excellence</h2>
            <p className="text-xl text-primary font-body max-w-2xl mx-auto line-clamp-2">
              At The Scholars' Home, we believe in nurturing not just academic excellence, 
              but the complete development of every child.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal 
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <FeatureCard 
                {...feature} 
                colorVariant={index % 2 === 0 ? 'primary' : 'primary-alt'}
                className="transform transition-all duration-500 hover:-translate-y-2"
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "21+", label: "Years of Excellence" },
            { value: "600+", label: "Alumni Worldwide" },
            { value: "100%", label: "Parent Satisfaction" }
          ].map((stat, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction="up"
            >
              <div 
                className={`text-center p-8 rounded-2xl backdrop-blur-sm ${
                  index % 2 === 0 
                    ? 'bg-primary-light/10'
                    : 'bg-primary-alt-light/10'
                }`}
              >
                <AnimatedCounter
                  value={stat.value}
                  className={`text-4xl font-display mb-2 truncate ${
                    index % 2 === 0 ? 'text-primary' : 'text-primary-alt'
                  }`}
                />
                <div className="text-neutral-dark font-body truncate">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}