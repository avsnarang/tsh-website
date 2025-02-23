import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { Users, UserPlus, LogIn, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Title from '../../components/utils/Title';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';

export default function AlumniNetwork() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Title title="Alumni Network" description="Connect with The Scholars' Home Community" />
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-4">Alumni Network</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                Stay Connected with The Scholars' Home Community
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal direction="left">
            <Link
              to="/alumni/success"
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
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
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
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
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
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
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
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
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
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
    </div>
  );
}