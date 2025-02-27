import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { User, Briefcase, MapPin, GraduationCap, ArrowRight, Quote } from 'lucide-react';
import Title from '../../components/utils/Title';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { useSEO } from '../../lib/seo';

interface AlumniProfile {
  id: string;
  full_name: string;
  batch_year: number;
  current_location: string;
  occupation: string;
  company: string;
  profile_picture_url?: string;
  testimonial?: string;
}

export default function AlumniSuccess() {
  const [profiles, setProfiles] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useSEO({
    title: "Alumni Success Stories | The Scholars' Home",
    description: "Read inspiring success stories of The Scholars' Home alumni. Discover how our graduates are making their mark in various fields.",
    url: "https://tsh.edu.in/alumni/success"
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('is_public', true)
        .not('testimonial', 'is', null)
        .order('batch_year', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load alumni success stories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center">Loading success stories...</div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center text-red-600">{error}</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-neutral-light">
      <Title title="Success Stories" description="Alumni Achievements" />
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-6">Alumni Success Stories</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary mb-8">
                Discover how The Scholars' Home has shaped the careers and lives of our alumni
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <Link
                to="/alumni"
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                Join our Alumni Network
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <ScrollReveal
              key={profile.id}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative p-8">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/10">
                      {profile.profile_picture_url ? (
                        <img
                          src={profile.profile_picture_url}
                          alt={profile.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                          <User className="h-10 w-10 text-primary/40" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl text-neutral-dark font-semibold group-hover:text-primary transition-colors">
                        {profile.full_name}
                      </h3>
                      <div className="flex items-center gap-2 text-primary/80">
                        <GraduationCap className="h-4 w-4" />
                        <span className="text-sm">Batch of {profile.batch_year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {profile.occupation && (
                      <div className="flex items-center gap-2 text-neutral-dark/70">
                        <Briefcase className="h-4 w-4 text-primary/60" />
                        <span className="text-sm">{profile.occupation}</span>
                      </div>
                    )}
                    {profile.company && (
                      <div className="flex items-center gap-2 text-neutral-dark/70">
                        <Briefcase className="h-4 w-4 text-primary/60" />
                        <span className="text-sm">{profile.company}</span>
                      </div>
                    )}
                    {profile.current_location && (
                      <div className="flex items-center gap-2 text-neutral-dark/70">
                        <MapPin className="h-4 w-4 text-primary/60" />
                        <span className="text-sm">{profile.current_location}</span>
                      </div>
                    )}
                  </div>

                  {profile.testimonial && (
                    <div className="relative">
                      <blockquote className="text-neutral-dark/80 italic text-sm leading-relaxed">
                        "{profile.testimonial}"
                      </blockquote>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {profiles.length === 0 && (
          <div className="text-center text-neutral-dark/60">
            No success stories available at the moment.
          </div>
        )}
      </Container>
    </div>
  );
}