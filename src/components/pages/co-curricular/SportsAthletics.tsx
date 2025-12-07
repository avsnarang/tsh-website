'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { Trophy, Medal, Building2, ArrowRight, Clock, Check, User } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import SportCardSkeleton from '@/components/skeletons/SportCardSkeleton';

interface SportImages {
  main_image: string;
  gallery_images: string[];
  training_images: string[];
  facility_images: string[];
}

interface Sport {
  id: string;
  name: string;
  category: string;
  description: string;
  coach: string;
  achievements: string;
  age_groups: string[];
  schedules: any;
  images: SportImages;
}

interface Program {
  category: string;
  sports: Sport[];
}

export default function SportsAthletics() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sports_programs')
        .select(`
          id,
          name,
          category,
          description,
          coach,
          achievements,
          age_groups,
          schedules,
          images
        `)
        .order('category');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from the database');
      }

      // Group sports by category
      const groupedSports = data.reduce((acc: Program[], sport: Sport) => {
        const existingCategory = acc.find(p => p.category === sport.category);
        if (existingCategory) {
          existingCategory.sports.push(sport);
        } else {
          acc.push({
            category: sport.category,
            sports: [sport]
          });
        }
        return acc;
      }, []);

      setPrograms(groupedSports);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sports programs';
      setError(errorMessage);
      console.error('Error fetching sports:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletonLoaders = () => (
    <div className="space-y-12">
      {[...Array(3)].map((_, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          {/* Category title skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-gray-200 rounded-full" />
            <div className="h-8 w-48 bg-gray-200 rounded" />
          </div>

          {/* Sports grid skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, cardIndex) => (
              <SportCardSkeleton key={cardIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-52 sm:pt-56 pb-24 bg-neutral-light">
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

      <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
            >
              <Trophy className="h-4 w-4" />
              <span className="font-semibold">Sports Excellence</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-4">
                Sports & <span className="text-green">Athletics</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary">Nurturing Champions</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Program Overview */}
        <ScrollReveal>
          <div className="mb-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-3xl text-neutral-dark">
                Program Overview
              </h2>
            </div>
            
            {loading ? (
              renderSkeletonLoaders()
            ) : error ? (
              <div className="text-center text-red-600 py-8">
                {error}
              </div>
            ) : (
              programs.map((program, index) => (
                <div key={index} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-green rounded-full" />
                    <h3 className="font-display text-2xl text-neutral-dark">
                      {program.category}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {program.sports.map((sport) => (
                      <div 
                        key={sport.id}
                        className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={sport.images.main_image}
                            alt={`${sport.name} facilities`}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex gap-2">
                              {sport.age_groups.map((level, levelIndex) => (
                                <span 
                                  key={levelIndex}
                                  className="text-xs px-2 py-1 bg-green/90 text-white rounded-full"
                                >
                                  {level}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-display text-xl text-neutral-dark">
                              {sport.name}
                            </h4>
                            <div className="w-10 h-10 rounded-full bg-orange-light/20 flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-orange" />
                            </div>
                          </div>

                          <div className="space-y-3 text-sm mb-4">
                            <div className="flex items-center gap-2 text-neutral-dark/70">
                              <Clock className="w-4 h-4" />
                              <span>{sport.schedules?.schedule || 'Schedule to be announced'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-dark/70">
                              <User className="w-4 h-4" />
                              <span>{sport.coach}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-dark/70">
                              <Medal className="w-4 h-4" />
                              <span>{sport.achievements}</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-neutral-dark/10">
                            <Link 
                              href={`/co-curricular/sports-athletics/${sport.id}`}
                              className="inline-flex items-center gap-2 text-sm font-medium text-green hover:text-green-dark group-hover:gap-3 transition-all"
                            >
                              Learn More 
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollReveal>

        {/* Facilities Section */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-green to-green-dark text-white rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl mb-6">Our Facilities</h2>
                <ul className="space-y-4">
                  {[
                    "Olympic-size swimming pool",
                    "Indoor basketball court",
                    "Football ground with synthetic turf",
                    "Modern fitness center",
                    "Indoor sports complex"
                  ].map((facility, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-light" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Building2 className="w-32 h-32 text-green-light/30" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
