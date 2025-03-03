import { Link, useNavigate } from 'react-router-dom';
import { Users, UserPlus, ArrowRight, BookOpen, LogIn, User } from 'lucide-react';
import Container from '../../components/ui/Container';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useSEO } from '../../lib/seo';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { ALUMNI_ROUTES } from '../../constants/routes';
import Button from '../../components/ui/Button';
import { useAlumniProfiles, useSuccessStories } from '../../lib/queries';

export default function AlumniNetwork() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: alumniProfiles, isLoading: isLoadingProfiles } = useAlumniProfiles();
  const { data: successStories, isLoading: isLoadingStories } = useSuccessStories();

  const handleDirectoryClick = () => {
    if (!user) {
      navigate(ALUMNI_ROUTES.LOGIN, { 
        state: { from: ALUMNI_ROUTES.DIRECTORY }
      });
      return;
    }
    navigate(ALUMNI_ROUTES.DIRECTORY);
  };

  useSEO({
    title: "Alumni Network | The Scholars' Home",
    description: "Join our alumni network to connect with fellow graduates and share your success stories",
    url: "https://tsh.edu.in/alumni/network"
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-8"
            >
              <Users className="h-4 w-4" />
              <span className="font-semibold">Alumni Network</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-4">
                Connect with Your <span className="text-primary">Community</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                Join our vibrant alumni network to stay connected, share experiences, and grow together
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Success Stories Card - Always visible */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg relative group overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl transition-transform group-hover:scale-105" />
              
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg transform group-hover:scale-110 transition-transform" />
                <BookOpen className="h-12 w-12 text-primary relative z-10" />
              </div>

              <h3 className="text-2xl font-display text-neutral-dark mb-4">Success Stories</h3>
              <p className="text-neutral-dark/70 mb-6 min-h-[3rem]">
                {isLoadingStories 
                  ? 'Loading...' 
                  : `Read ${successStories?.length || 0} inspiring stories from fellow alumni`
                }
              </p>

              <Button 
                variant="cta-green"
                className="w-full flex items-center justify-center gap-2 group"
                onClick={() => navigate(ALUMNI_ROUTES.SUCCESS)}
              >
                Explore Stories
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {!user ? (
              <>
                {/* Login Card - Visible when not logged in */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg relative group overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl transition-transform group-hover:scale-105" />
                  
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg transform group-hover:scale-110 transition-transform" />
                    <LogIn className="h-12 w-12 text-primary relative z-10" />
                  </div>

                  <h3 className="text-2xl font-display text-neutral-dark mb-4">Login</h3>
                  <p className="text-neutral-dark/70 mb-6 min-h-[3rem]">
                    Access your alumni profile and connect with fellow graduates
                  </p>

                  <Button 
                    variant="cta-green"
                    className="w-full flex items-center justify-center gap-2 group"
                    onClick={() => navigate(ALUMNI_ROUTES.LOGIN)}
                  >
                    Sign In
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                {/* Register Card - Visible when not logged in */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg relative group overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl transition-transform group-hover:scale-105" />
                  
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg transform group-hover:scale-110 transition-transform" />
                    <UserPlus className="h-12 w-12 text-primary relative z-10" />
                  </div>

                  <h3 className="text-2xl font-display text-neutral-dark mb-4">Register</h3>
                  <p className="text-neutral-dark/70 mb-6 min-h-[3rem]">
                    Create your alumni profile and join our growing community
                  </p>

                  <Button 
                    variant="cta-green"
                    className="w-full flex items-center justify-center gap-2 group"
                    onClick={() => navigate(ALUMNI_ROUTES.REGISTER)}
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                {/* Profile Card - Visible when logged in */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg relative group overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl transition-transform group-hover:scale-105" />
                  
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg transform group-hover:scale-110 transition-transform" />
                    <User className="h-12 w-12 text-primary relative z-10" />
                  </div>

                  <h3 className="text-2xl font-display text-neutral-dark mb-4">Your Profile</h3>
                  <p className="text-neutral-dark/70 mb-6 min-h-[3rem]">
                    Manage your alumni profile and update your information
                  </p>

                  <Button 
                    variant="cta-green"
                    className="w-full flex items-center justify-center gap-2 group"
                    onClick={() => navigate(ALUMNI_ROUTES.PROFILE)}
                  >
                    View Profile
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                {/* Directory Card - Visible when logged in */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg relative group overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl transition-transform group-hover:scale-105" />
                  
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg transform group-hover:scale-110 transition-transform" />
                    <Users className="h-12 w-12 text-primary relative z-10" />
                  </div>

                  <h3 className="text-2xl font-display text-neutral-dark mb-4">Alumni Directory</h3>
                  <p className="text-neutral-dark/70 mb-6 min-h-[3rem]">
                    {isLoadingProfiles 
                      ? 'Loading...' 
                      : `Connect with ${alumniProfiles?.length || 0} fellow alumni`
                    }
                  </p>

                  <Button 
                    variant="cta-green"
                    className="w-full flex items-center justify-center gap-2 group"
                    onClick={handleDirectoryClick}
                  >
                    Browse Directory
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
