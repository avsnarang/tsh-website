import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, LogIn, BookOpen, ArrowRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import Title from '../../components/utils/Title';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { motion } from 'framer-motion';
import { useSEO } from '../../lib/seo';

const stats = [
  { value: "2000+", label: "Alumni Worldwide" },
  { value: "20+", label: "Years of Legacy" },
  { value: "50+", label: "Countries" },
  { value: "100+", label: "Success Stories" }
];

export default function AlumniNetwork() {
  const { user } = useAuth();

  useSEO({
    title: "Alumni Network | The Scholars' Home",
    description: "Connect with The Scholars' Home alumni community. Stay updated with school events and network with fellow graduates.",
    url: "https://tsh.edu.in/alumni"
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Title title="Alumni Network" description="Connect with The Scholars' Home Community" />
      
      {/* Hero Section */}
      <div className="relative mb-24 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Campus view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark/90 via-neutral-dark/70 to-neutral-dark/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        </div>

        <Container className="relative">
          <div className="max-w-5xl">
            <ScrollReveal>
              <div className="mb-12">
                <TextReveal>
                  <h1 className="text-6xl md:text-7xl text-neutral-light mb-6 font-display leading-tight">
                    Alumni Network
                  </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="text-2xl md:text-3xl text-primary-light font-body max-w-3xl">
                    Stay Connected with The Scholars' Home Community
                  </p>
                </TextReveal>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-white/5 rounded-2xl transition-transform group-hover:scale-105" />
                    <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 border border-white/10">
                      <div className="text-4xl font-display text-neutral-light mb-2">{stat.value}</div>
                      <div className="text-primary-light font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal direction="left">
            <Link
              to="/alumni/success"
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all duration-300 group-hover:bg-primary/10" />
              <BookOpen className="h-12 w-12 text-primary mb-6 relative" />
              <h3 className="text-2xl text-neutral-dark mb-3 relative">Success Stories</h3>
              <p className="text-neutral-dark/80 mb-6 flex-grow relative">
                Discover how our alumni are making their mark in various fields through their achievements and contributions.
              </p>
              <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all relative">
                Read Stories <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </Link>
          </ScrollReveal>

          {!user ? (
            <>
              <ScrollReveal direction="up">
                <Link
                  to="/alumni/login"
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all duration-300 group-hover:bg-primary/10" />
                  <LogIn className="h-12 w-12 text-primary mb-6 relative" />
                  <h3 className="text-2xl text-neutral-dark mb-3 relative">Alumni Login</h3>
                  <p className="text-neutral-dark/80 mb-6 flex-grow relative">
                    Already registered? Sign in to access your profile and connect with fellow alumni.
                  </p>
                  <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all relative">
                    Sign In <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <Link
                  to="/alumni/register"
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all duration-300 group-hover:bg-primary/10" />
                  <UserPlus className="h-12 w-12 text-primary mb-6 relative" />
                  <h3 className="text-2xl text-neutral-dark mb-3 relative">Register</h3>
                  <p className="text-neutral-dark/80 mb-6 flex-grow relative">
                    Join our alumni network to connect with fellow graduates and stay updated with school events.
                  </p>
                  <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all relative">
                    Register Now <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </ScrollReveal>
            </>
          ) : (
            <>
              <ScrollReveal direction="up">
                <Link
                  to="/alumni/profile"
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all duration-300 group-hover:bg-primary/10" />
                  <Users className="h-12 w-12 text-primary mb-6 relative" />
                  <h3 className="text-2xl text-neutral-dark mb-3 relative">My Profile</h3>
                  <p className="text-neutral-dark/80 mb-6 flex-grow relative">
                    View and edit your alumni profile, share your achievements and stay connected.
                  </p>
                  <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all relative">
                    Manage Profile <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <Link
                  to="/alumni/directory"
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all duration-300 group-hover:bg-primary/10" />
                  <Users className="h-12 w-12 text-primary mb-6 relative" />
                  <h3 className="text-2xl text-neutral-dark mb-3 relative">Alumni Directory</h3>
                  <p className="text-neutral-dark/80 mb-6 flex-grow relative">
                    Connect with other alumni from The Scholars' Home and expand your network.
                  </p>
                  <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all relative">
                    View Directory <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </ScrollReveal>
            </>
          )}
        </div>
      </Container>

      {/* CTA Section */}
      <div className="mt-24 bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/10 via-transparent to-transparent" />
        
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <TextReveal>
                <h2 className="text-4xl text-neutral-light mb-6">Join Our Alumni Community</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-primary-light text-lg mb-8">
                  Connect with fellow alumni, share your success story, and stay updated with school events.
                </p>
              </TextReveal>
              <Link to={user ? '/alumni/profile' : '/alumni/register'}>
                <Button 
                  variant="cta"
                  className="flex items-center gap-2 mx-auto"
                >
                  <Users className="h-5 w-5" />
                  {user ? 'Complete Your Profile' : 'Register Now'}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}