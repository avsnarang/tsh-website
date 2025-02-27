import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, ArrowRight, Star, Award, Heart, Users, BookOpen, Palette, Trophy, MapPin } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import AnimatedCounter from '../components/animations/AnimatedCounter';

export default function Home2() {
  const [latestUpdate, setLatestUpdate] = useState('');
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    fetchLatestUpdate();
  }, []);

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

  const cards = [
    {
      title: "Academic Excellence",
      description: "Comprehensive CBSE curriculum with modern teaching methodologies",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80",
      stats: [
        { value: "100%", label: "Board Results" },
        { value: "25:1", label: "Student-Teacher Ratio" }
      ],
      color: "from-green-600 to-green-800",
      icon: BookOpen
    },
    {
      title: "Sports & Athletics",
      description: "Professional coaching and world-class sports facilities",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { value: "20+", label: "Sports Offered" },
        { value: "50+", label: "Championships" }
      ],
      color: "from-orange-600 to-orange-800",
      icon: Trophy
    },
    {
      title: "Arts & Culture",
      description: "Nurturing creativity through diverse artistic programs",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { value: "15+", label: "Cultural Events" },
        { value: "10+", label: "Art Forms" }
      ],
      color: "from-purple-600 to-purple-800",
      icon: Palette
    }
  ];

  return (
    <div className="relative min-h-screen bg-neutral-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        <Container className="relative">
          <div className="min-h-screen flex flex-col justify-center py-24">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary-light mb-8">
                  <Star className="h-4 w-4" />
                  <span>Excellence in Education Since 2003</span>
                </div>
                <h1 className="text-7xl lg:text-8xl text-white font-display leading-tight mb-6">
                  Shape Your Future
                </h1>
                <p className="text-2xl text-primary-light font-display mb-8">
                  Where Excellence Meets Innovation
                </p>
                <div className="flex justify-center gap-6">
                  <Link to="/admissions">
                    <Button 
                      variant="cta-green" 
                      className="h-16 px-10 flex items-center justify-center gap-3 text-lg"
                    >
                      <GraduationCap className="h-6 w-6" />
                      Begin Your Journey
                    </Button>
                  </Link>
                  <Link to="/campuses">
                    <Button 
                      variant="outline" 
                      className="h-16 px-10 flex items-center justify-center gap-3 text-lg group border-white text-white hover:bg-white/10"
                    >
                      Explore Campuses
                      <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Interactive Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <motion.div
                    className={`relative h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                      activeCard === index ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                    onClick={() => setActiveCard(activeCard === index ? null : index)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-90`} />
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col">
                      <card.icon className="h-12 w-12 text-white mb-6" />
                      <h3 className="text-3xl text-white font-display mb-4">{card.title}</h3>
                      <p className="text-white/80 text-lg mb-8">{card.description}</p>
                      
                      {/* Stats */}
                      <div className="mt-auto grid grid-cols-2 gap-4">
                        {card.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-3xl text-white font-display mb-1">{stat.value}</div>
                            <div className="text-white/60 text-sm">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Content */}
                      <motion.div
                        initial={false}
                        animate={{ height: activeCard === index ? 'auto' : 0, opacity: activeCard === index ? 1 : 0 }}
                        className="overflow-hidden mt-8"
                      >
                        <Link to={`/${card.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Button 
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-white text-white hover:bg-white/10"
                          >
                            Learn More
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Latest Updates Ticker */}
      {latestUpdate && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm py-3 text-neutral-light border-t border-neutral-light/10 z-50">
          <Container>
            <div className="flex items-center gap-4">
              <span className="font-semibold shrink-0">Latest Updates:</span>
              <div className="relative overflow-hidden w-full">
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex">
                      <span className="inline-block px-4">{latestUpdate}</span>
                      <span className="inline-block px-4">{latestUpdate}</span>
                      <span className="inline-block px-4">{latestUpdate}</span>
                      <span className="inline-block px-4">{latestUpdate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}