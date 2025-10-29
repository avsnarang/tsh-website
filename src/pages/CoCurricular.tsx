'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/ui/Container';
import { Music, Palette, Trophy, Theater, ArrowRight, Star, Users, Award, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';

const activities = [
  {
    icon: Music,
    title: "Performing Arts",
    description: "Music, dance, and drama programs to nurture artistic talents",
    features: [
      "Classical Music Training",
      "Contemporary Dance",
      "Theater Productions",
      "Annual Performances",
      "Voice Training"
    ],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/co-curricular/performing-arts"
  },
  {
    icon: Trophy,
    title: "Sports & Athletics",
    description: "Comprehensive sports program for physical development",
    features: [
      "Cricket Academy",
      "Basketball Training",
      "Athletics Program",
      "Swimming Classes",
      "Professional Coaching"
    ],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/co-curricular/sports-athletics"
  },
  {
    icon: Palette,
    title: "Visual Arts",
    description: "Creative expression through various art forms",
    features: [
      "Painting & Drawing",
      "Sculpture Classes",
      "Digital Art",
      "Photography",
      "Art Exhibitions"
    ],
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/co-curricular/visual-arts"
  },
  {
    icon: Theater,
    title: "Clubs & Societies",
    description: "Extra-curricular activities for holistic development",
    features: [
      "Debate Club",
      "Science Society",
      "Eco Club",
      "Literary Club",
      "Tech Innovation Hub"
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80",
    link: "/co-curricular/clubs-societies"
  }
];

const stats = [
  { icon: Trophy, value: "50+", label: "Annual Events" },
  { icon: Star, value: "25+", label: "Activity Clubs" },
  { icon: Users, value: "100%", label: "Student Participation" },
  { icon: Award, value: "200+", label: "Competition Wins" }
];

export default function CoCurricular() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/10 rounded-full translate-x-24 translate-y-24 blur-3xl" />
        
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16 relative">
              <TextReveal>
                <h1 className="text-5xl md:text-6xl text-neutral-dark mb-6">Co-Curricular Excellence</h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto mb-12">
                  Nurturing Talents Beyond Academics for Holistic Development
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

      {/* Activities Section */}
      <div className="py-24">
        <Container>
          <div className="space-y-16">
            {activities.map((activity, index) => (
              <ScrollReveal 
                key={activity.title}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <activity.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-3xl text-neutral-dark">{activity.title}</h2>
                    </div>
                    
                    <p className="text-lg text-neutral-dark/80 mb-8">{activity.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {activity.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-primary">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={() => router.push(activity.link)}
                      className="flex items-center gap-2 group"
                    >
                      Learn More
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </div>
                  
                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <img
                        src={activity.image}
                        alt={activity.title}
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
                <h2 className="text-4xl text-neutral-light mb-6">Discover Your Passion</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-primary-light text-lg mb-8">
                  Join our vibrant community and explore a world of opportunities beyond academics.
                </p>
              </TextReveal>
              <Button 
                variant="cta"
                onClick={() => router.push('/admissions')}
                className="flex items-center gap-2 mx-auto"
              >
                <Heart className="h-5 w-5" />
                Join Our Programs
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}