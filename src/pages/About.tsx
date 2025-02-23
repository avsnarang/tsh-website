import React from 'react';
import Container from '../components/ui/Container';
import { BookOpen, Users, Trophy, Heart, Star, Award, ArrowRight } from 'lucide-react';
import Title from '../components/utils/Title';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const campuses = [
  {
    name: "Paonta Sahib Campus",
    description: "Our flagship campus offering comprehensive education from primary to senior secondary levels.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80",
    features: ["CBSE Affiliated", "Grades Pre-Primary to XII", "25 Acre Campus", "State-of-the-art Infrastructure"],
    link: "/campus/paonta-sahib"
  },
  {
    name: "Juniors Campus",
    description: "A specialized campus dedicated to early childhood education and primary schooling.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80",
    features: ["Pre-Primary Focus", "Play-based Learning", "Safe Environment", "Individual Attention"],
    link: "/campus/juniors"
  },
  {
    name: "Majra Campus",
    description: "A perfect blend of traditional values and modern education methodologies.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1970&q=80",
    features: ["Smart Classrooms", "Sports Academy", "Digital Library", "Cultural Hub"],
    link: "/campus/majra"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/10 rounded-full translate-x-24 translate-y-24 blur-3xl" />
        
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal>
                <h1 className="text-5xl md:text-6xl text-neutral-dark mb-6">Our Story</h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                  A Legacy of Excellence in Education Since 2003
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl text-neutral-dark mb-6">Our Journey</h2>
                <div className="prose prose-lg text-neutral-dark/80">
                  <p>
                    Founded in 2003, The Scholars' Home has been at the forefront of educational
                    excellence in India. What started as a small school with big dreams has grown
                    into a prestigious institution with multiple campuses, each maintaining our
                    high standards of education and character development.
                  </p>
                  <p>
                    Our journey has been marked by continuous innovation in teaching methodologies,
                    investment in world-class infrastructure, and an unwavering commitment to
                    nurturing well-rounded individuals who are ready to take on the challenges of
                    the future.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-primary-light/10 p-8 rounded-2xl">
                <h2 className="text-3xl text-neutral-dark mb-6">Quick Facts</h2>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Users, label: 'Students', value: '5000+' },
                    { icon: Trophy, label: 'Awards', value: '100+' },
                    { icon: Star, label: 'Years of Excellence', value: '20+' },
                    { icon: Award, label: 'CBSE Recognition', value: 'A+ Grade' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-dark">{stat.value}</div>
                      <div className="text-primary">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Campuses Section */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl text-neutral-dark mb-4">Our Campuses</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                  Three Unique Environments, One Vision of Excellence
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {campuses.map((campus, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={campus.image}
                      alt={campus.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl text-neutral-light">{campus.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-neutral-dark/80 mb-6">{campus.description}</p>
                    <div className="space-y-2 mb-6">
                      {campus.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-primary">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={campus.link}>
                      <Button 
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 group"
                      >
                        Explore Campus
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mb-24">
            <ScrollReveal>
              <h2 className="text-3xl text-neutral-dark text-center mb-12">Our Values</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Academic Excellence',
                  description: 'Fostering a love for learning and intellectual growth'
                },
                {
                  icon: Heart,
                  title: 'Character Development',
                  description: 'Building strong moral values and ethical principles'
                },
                {
                  icon: Users,
                  title: 'Community Spirit',
                  description: 'Creating a supportive and inclusive learning environment'
                }
              ].map((value, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl text-neutral-dark mb-2">{value.title}</h3>
                    <p className="text-neutral-dark/80">{value.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}