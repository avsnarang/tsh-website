'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Testimonial {
  id: string;
  source_type: 'parent' | 'student' | 'alumni';
  author_name: string;
  student_name?: string;
  class?: string;
  content: string;
  profile_picture_url?: string;
  is_visible: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative bg-primary-dark">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-white font-display mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto">
            Hear from our students, alumni, and parents about their experiences
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="w-12 h-12 text-primary-light/20 mb-6" />
              <blockquote className="text-xl md:text-2xl text-white mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div className="flex items-center">
                {testimonials[currentIndex].profile_picture_url ? (
                  <Image
                    src={testimonials[currentIndex].profile_picture_url}
                    alt={testimonials[currentIndex].author_name}
                    width={80}
                    height={80}
                    className="w-16 h-16 rounded-xl object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mr-4">
                    <span className="text-2xl text-primary-light">
                      {testimonials[currentIndex].author_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-display text-white">
                    {testimonials[currentIndex].author_name}
                  </p>
                  <p className="text-primary-light">
                    {testimonials[currentIndex].source_type === 'student' && testimonials[currentIndex].class
                      ? `Student, Class ${testimonials[currentIndex].class}`
                      : testimonials[currentIndex].source_type.charAt(0).toUpperCase() + testimonials[currentIndex].source_type.slice(1)}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <button
                onClick={prev}
                className="transform -translate-x-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={next}
                className="transform translate-x-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
