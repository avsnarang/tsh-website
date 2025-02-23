import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import { schoolInfo } from '../data/schoolData';
import AnimatedCounter from './animations/AnimatedCounter';
import { supabase } from '../lib/supabase';
import NewsTicker from './NewsTicker';

export default function Hero() {
  const [latestUpdate, setLatestUpdate] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchLatestUpdate = async () => {
      try {
        const { data, error } = await supabase
          .from('latest_updates')
          .select('content')
          .eq('is_active', true)
          .single();

        if (error) throw error;
        if (data) {
          setLatestUpdate(data.content);
        }
      } catch (error) {
        console.error('Error fetching latest update:', error);
      }
    };

    fetchLatestUpdate();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div id="home" className="relative min-h-screen overflow-hidden bg-[#F4F8F6]">
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(0, 80, 27, 0.08) 0%,
            rgba(0, 80, 27, 0.05) 20%,
            rgba(0, 80, 27, 0.02) 40%,
            rgba(0, 0, 0, 0) 60%),
            linear-gradient(to bottom right, #F4F8F6, #E8F1EC)
          `
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20 transition-opacity duration-300" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(0, 80, 27, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 80, 27, 0.1) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem'
          }}
        />
        
        {/* Glowing Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-orange/5 rounded-full blur-[100px] mix-blend-multiply"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Container className="relative">
        <div className="min-h-screen grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 pt-8"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl text-neutral-dark font-display leading-tight">
                {schoolInfo.tagline}
              </h1>
              <p className="text-xl text-primary/90 max-w-xl">
                Join a legacy of excellence where we nurture future leaders through world-class education and holistic development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/admissions" className="flex-1">
                <Button 
                  variant="cta" 
                  className="w-full h-14 flex items-center justify-center gap-2 text-lg"
                >
                  <GraduationCap className="h-6 w-6" />
                  Apply Now
                </Button>
              </Link>
              <Link to="/campuses" className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full h-14 flex items-center justify-center gap-2 text-lg group border-primary text-primary hover:bg-primary/5"
                >
                  Explore Campuses
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Legacy Highlight */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary/5 p-6 rounded-2xl border border-primary/10 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <AnimatedCounter 
                      value="21+"
                      className="text-4xl md:text-5xl font-display text-primary"
                    />
                    <div className="text-sm md:text-base text-primary/80 mt-1">Years of Legacy</div>
                  </div>
                </div>
              </motion.div>

              {/* Other Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: 'Students', value: '1700+' },
                  { icon: BookOpen, label: 'Expert Faculty', value: '100+' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="text-center p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-colors duration-300 border border-primary/5"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 mb-3">
                      <stat.icon className="h-6 w-6 text-primary/80" />
                    </div>
                    <AnimatedCounter 
                      value={stat.value}
                      className="text-2xl md:text-3xl font-display text-neutral-dark"
                    />
                    <div className="text-sm text-primary/80 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative grid grid-cols-2 gap-4 h-[600px]"
          >
            <div className="relative h-full">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(50%-8px)] mb-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80"
                  alt="Students in classroom"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(50%-8px)]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="School campus"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
            <div className="relative h-full mt-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(50%-8px)] mb-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Students studying"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(50%-8px)]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80"
                  alt="School activities"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* News Ticker */}
      <NewsTicker latestUpdate={latestUpdate} />
    </div>
  );
}