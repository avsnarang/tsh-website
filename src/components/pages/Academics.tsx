'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import { BookOpen, Award, Users, Brain, ArrowRight, GraduationCap, Star, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';

const programs = [
  {
    title: "Pre-Primary School",
    grades: "Pre-Nursery to UKG",
    description: "Early childhood education focusing on developmental milestones and foundational learning",
    features: [
      "Play-based learning",
      "Montessori methods",
      "Social skills development",
      "Motor skills activities",
      "Early literacy & numeracy"
    ],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80",
    link: "/academics/pre-primary",
    icon: Heart
  },
  {
    title: "Primary School",
    grades: "Grades 1-5",
    description: "Foundation years focusing on core skills and creative development",
    features: [
      "Play-based learning",
      "Foundational literacy",
      "Numeracy skills",
      "Creative arts",
      "Basic sciences"
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80",
    link: "/academics/primary",
    icon: Star
  },
  {
    title: "Middle School",
    grades: "Grades 6-8",
    description: "Transition phase with focus on analytical and critical thinking",
    features: [
      "Advanced concepts",
      "Project-based learning",
      "Scientific inquiry",
      "Digital literacy",
      "Research skills"
    ],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/academics/middle",
    icon: Brain
  },
  {
    title: "Secondary School",
    grades: "Grades 9-10",
    description: "Preparation for board examinations with comprehensive subject coverage",
    features: [
      "CBSE curriculum",
      "Career guidance",
      "Practical labs",
      "Expert faculty",
      "Board preparation"
    ],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/academics/secondary",
    icon: BookOpen
  },
  {
    title: "Senior Secondary",
    grades: "Grades 11-12",
    description: "Specialized streams preparing students for higher education",
    features: [
      "Science stream",
      "Commerce stream",
      "Humanities",
      "Career counseling",
      "College preparation"
    ],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/academics/senior-secondary",
    icon: GraduationCap
  }
];

const stats = [
  { icon: Users, value: "25:1", label: "Student-Teacher Ratio" },
  { icon: Award, value: "100%", label: "Board Results" },
  { icon: Star, value: "85%", label: "Distinction Rate" },
  { icon: Brain, value: "50+", label: "Expert Faculty" }
];

export default function Academics() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <div className="relative pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/10 rounded-full translate-x-24 translate-y-24 blur-3xl" />
        
        <Container className="relative z-20">
          <ScrollReveal>
            <div className="text-center mb-16 relative">
              <TextReveal>
                <h1 className="text-5xl md:text-6xl text-neutral-dark mb-6">Academic Excellence</h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto mb-12">
                  Comprehensive Education Programs Designed for Success at Every Stage
                </p>
              </TextReveal>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
                {stats.map((stat, index) => (
                  <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <stat.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-neutral-dark mb-2">{stat.value}</div>
                      <div className="text-primary text-sm text-center">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Programs Section */}
      <div className="py-24">
        <Container>
          <div className="space-y-16">
            {programs.map((program, index) => (
              <ScrollReveal 
                key={program.title}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <program.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl text-neutral-dark">{program.title}</h2>
                        <p className="text-primary font-semibold">{program.grades}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-neutral-dark/80 mb-8">{program.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-primary">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={() => router.push(program.link)}
                      className="flex items-center gap-2 group"
                    >
                      Learn More
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </div>
                  
                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/10 via-transparent to-transparent" />
        
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <TextReveal>
                <h2 className="text-4xl text-neutral-light mb-6">Ready to Join Our Academic Journey?</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-primary-light text-lg mb-8">
                  Take the first step towards academic excellence. Apply now for admission to The Scholars' Home.
                </p>
              </TextReveal>
              <Button 
                variant="cta"
                onClick={() => router.push('/admissions')}
                className="flex items-center gap-2 mx-auto"
              >
                <GraduationCap className="h-5 w-5" />
                Apply for Admission
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}
