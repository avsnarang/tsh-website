'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, ArrowRight, X, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import ScrollReveal from '../animations/ScrollReveal';
import type { LeadershipMessage } from '../../types/leadership';

interface LeaderMessagesProps {
  messages: LeadershipMessage[];
  isLoading: boolean;
}

export default function LeaderMessages({ messages, isLoading }: LeaderMessagesProps) {
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (selectedMessage) {
      // Prevent background scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMessage]);

  const homepageMessages = messages.filter(message => 
    message.display_locations.includes('homepage') || 
    message.display_locations.includes('all')
  ).slice(0, 3);

  if (isLoading || homepageMessages.length === 0) return null;

  return (
    <section className="relative py-40">
      {/* Top fade-in gradient - increased opacity */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white to-transparent z-10" />

      {/* Unique geometric background - increased color intensities */}
      <div className="absolute inset-0 bg-[#f8fafc]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2% 50%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                           radial-gradient(circle at 98% 20%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                           radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.7) 0%, transparent 35%)`,
        }} />
        
        {/* Animated wave pattern - increased opacity */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px',
          animation: 'wave 60s linear infinite',
        }} />
      </div>

      <Container className="relative z-20">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-green-light/20 text-green rounded-full text-sm font-medium mb-6">
              Leadership Insights
            </span>
            <h2 className="text-5xl md:text-6xl font-display text-neutral-dark mb-8">
              Voices of <span className="text-green">Experience</span>
            </h2>
            <p className="text-neutral-dark/70 text-xl max-w-2xl mx-auto">
              Wisdom and guidance from our educational leaders shaping tomorrow's minds
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-10">
          {homepageMessages.map((message, index) => (
            <ScrollReveal key={message.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative group h-full"
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-light/10 via-primary-light/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-primary-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                
                {/* Main card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-xl h-full flex flex-col">
                  {/* Quote icon */}
                  <MessageSquareQuote className="absolute top-6 right-6 h-12 w-12 text-green/10" />
                  
                  <div className="flex items-center gap-5 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-green-light to-primary flex-shrink-0 shadow-lg"
                    >
                      {message.photo_url ? (
                        <Image
                          src={message.photo_url}
                          alt={message.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-display text-neutral-dark">
                        {message.name}
                      </h3>
                      <p className="text-primary font-medium">
                        {message.role}
                      </p>
                    </div>
                  </div>

                  <blockquote className="mb-8 flex-grow">
                    <p className="text-neutral-dark/80 text-lg leading-relaxed line-clamp-6">
                      "{message.preview}"
                    </p>
                  </blockquote>

                  <motion.button
                    onClick={() => setSelectedMessage(message)}
                    className="inline-flex items-center gap-2 text-green hover:text-green-dark font-medium group/btn self-start"
                    whileTap={{ scale: 0.98 }}
                  >
                    Read Full Message
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 bg-neutral-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header - Sticky */}
              <div className="sticky top-0 bg-white p-8 border-b border-neutral-200 z-10">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-green-light to-primary flex-shrink-0">
                      {selectedMessage.photo_url ? (
                        <Image
                          src={selectedMessage.photo_url}
                          alt={selectedMessage.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-display text-neutral-dark">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-neutral-dark/60">{selectedMessage.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-neutral-dark/60" />
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {selectedMessage.fullMessage.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-neutral-dark/80 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white to-transparent z-10" />
    </section>
  );
}
