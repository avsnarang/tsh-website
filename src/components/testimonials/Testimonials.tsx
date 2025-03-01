import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import { User } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

interface Testimonial {
  id: string;
  name: string;
  class?: string;
  source_type: 'parent' | 'student';
  content: string;
  is_visible: boolean;
}

interface AlumniTestimonial {
  id: string;
  full_name: string;
  batch_year: number;
  occupation: string;
  company: string;
  profile_picture_url?: string;
  testimonial: string;
  show_testimonial: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<(Testimonial | AlumniTestimonial)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Fetch regular testimonials
        const { data: regularData, error: regularError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_visible', true)
          .limit(2);

        if (regularError) throw regularError;

        // Fetch alumni testimonials
        const { data: alumniData, error: alumniError } = await supabase
          .from('alumni_profiles')
          .select('*')
          .eq('show_testimonial', true)
          .not('testimonial', 'is', null)
          .limit(1);

        if (alumniError) throw alumniError;

        const allTestimonials = [...(regularData || []), ...(alumniData || [])];
        setTestimonials(allTestimonials);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading || error || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="py-24 bg-primary-light/10">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-dark mb-4">What Our Community Says</h2>
            <p className="text-xl text-primary font-body max-w-2xl mx-auto">
              Hear from our students, parents, and alumni about their experience with The Scholars' Home
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.id}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    {'profile_picture_url' in testimonial ? (
                      <img
                        src={testimonial.profile_picture_url}
                        alt={testimonial.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark">
                      {'full_name' in testimonial ? testimonial.full_name : testimonial.name}
                    </h3>
                    {'occupation' in testimonial ? (
                      <>
                        <p className="text-primary text-sm">
                          {testimonial.occupation}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                        <p className="text-primary/80 text-sm">
                          Batch of {testimonial.batch_year}
                        </p>
                      </>
                    ) : (
                      <p className="text-primary text-sm">
                        {testimonial.source_type === 'parent' ? 'Parent' : 'Student'} 
                        {testimonial.class && ` - Class ${testimonial.class}`}
                      </p>
                    )}
                  </div>
                </div>
                <blockquote className="text-neutral-dark/80 italic">
                  "{'testimonial' in testimonial ? testimonial.testimonial : testimonial.content}"
                </blockquote>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
