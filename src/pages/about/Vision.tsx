import React from 'react';
import Container from '../../components/ui/Container';
import { Target, Compass, Star, Award } from 'lucide-react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { useSEO } from '../../lib/seo';

export default function Vision() {
  useSEO({
    title: "Vision & Mission | The Scholars' Home",
    description: "Explore The Scholars' Home's vision and mission for educational excellence. Learn about our core values and strategic objectives for shaping tomorrow's leaders.",
    url: "https://tsh.edu.in/about/vision"
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-4">Mission & Vision</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body">Shaping Tomorrow's Leaders Today</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Vision and Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <ScrollReveal direction="left">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full group relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-32 -translate-y-32 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-x-32 translate-y-32 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative">
                <TextReveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl text-neutral-dark">Our Mission</h2>
                  </div>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="text-neutral-dark/80 text-lg leading-relaxed">
                    "We aim to help our Scholars grow into compassionate independent thinkers and innovators who will become the custodians of the environment, world culture and the rich legacy of traditions. We shall provide a conducive environment for their holistic development which will enable them to become the proclaimers of change in society."
                  </p>
                </TextReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* Vision Card */}
          <ScrollReveal direction="right">
            <div className="bg-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full group relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 translate-y-32 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative">
                <TextReveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl text-white">Our Vision</h2>
                  </div>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="text-white/90 text-lg leading-relaxed">
                    "We want to help our students reach their full potential, teaching them to think for themselves, care for the environment, and respect all cultures and traditions. Our school is more than a place to learn; it's where students prepare for the future. We hope that with our well-rounded education, they'll confidently face today's challenges. As they grow, nurtured by our school, they'll become leaders in making the world a better, more united place."
                  </p>
                </TextReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Core Values */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <TextReveal>
              <h2 className="text-3xl text-neutral-dark mb-4">Core Values</h2>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: Star,
              title: "Excellence",
              description: "Striving for the highest standards in everything we do"
            },
            {
              icon: Compass,
              title: "Innovation",
              description: "Embracing new ideas and creative approaches to learning"
            },
            {
              icon: Award,
              title: "Character",
              description: "Building strong moral values and ethical principles"
            },
            {
              icon: Target,
              title: "Leadership",
              description: "Developing future leaders who make a difference"
            }
          ].map((value, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <TextReveal delay={0.2}>
                    <h3 className="text-xl text-neutral-dark mb-2">{value.title}</h3>
                  </TextReveal>
                  <TextReveal delay={0.3}>
                    <p className="text-neutral-dark/80">{value.description}</p>
                  </TextReveal>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Strategic Objectives */}
        <div className="bg-primary p-8 rounded-2xl relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/10 via-transparent to-transparent" />
          
          <ScrollReveal>
            <div className="text-center mb-8 relative">
              <TextReveal>
                <h2 className="text-3xl text-neutral-light">Strategic Objectives</h2>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                title: "Digital Innovation",
                description: "Integrating cutting-edge technology and digital learning solutions"
              },
              {
                title: "Global Partnerships",
                description: "Expanding international collaborations and exchange programs"
              },
              {
                title: "Sustainable Development",
                description: "Leading initiatives for environmental consciousness and sustainability"
              }
            ].map((goal, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 group">
                  <TextReveal delay={0.2}>
                    <h3 className="text-xl text-neutral-dark mb-3 group-hover:text-primary transition-colors">{goal.title}</h3>
                  </TextReveal>
                  <TextReveal delay={0.3}>
                    <p className="text-neutral-dark/80">{goal.description}</p>
                  </TextReveal>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}