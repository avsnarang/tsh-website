import React, { useState } from 'react';
import Container from '../../components/ui/Container';
import { User, X, Quote, ArrowRight } from 'lucide-react';
import { LeadershipMessage } from '../../types/leadership';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '../../contexts/MessagesContext';

export default function Messages() {
  const { messages, loading } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);

  // Filter messages for leadership page
  const leadershipMessages = messages.filter(msg => 
    msg.display_locations.includes('all') || msg.display_locations.includes('leadership')
  );

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Container>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-8 text-xl text-primary animate-pulse">Loading messages...</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ScrollReveal>
                <div className="text-center mb-16 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/5 rounded-full -translate-y-12" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary/10 rounded-full -translate-y-8" />
                  
                  <div className="relative">
                    <TextReveal>
                      <h1 className="text-5xl text-neutral-dark mb-6">What our Leaders Say</h1>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                      <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                        Guidance and vision from our school leadership
                      </p>
                    </TextReveal>
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-12">
                {leadershipMessages.map((leader, index) => (
                  <ScrollReveal
                    key={leader.id}
                    delay={index * 0.05}
                    direction={index % 2 === 0 ? 'left' : 'right'}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-32 -translate-y-32 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-x-32 translate-y-32 group-hover:scale-110 transition-transform duration-500" />
                      
                      <div className="relative p-8">
                        <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div className="lg:w-1/3 flex flex-col items-center text-center">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="w-48 h-48 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 overflow-hidden"
                            >
                              {leader.photo_url ? (
                                <img
                                  src={leader.photo_url}
                                  alt={leader.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <User className="h-24 w-24 text-primary" />
                              )}
                            </motion.div>
                            <TextReveal delay={0.1}>
                              <h3 className="text-xl text-neutral-dark font-semibold">{leader.name}</h3>
                            </TextReveal>
                            <TextReveal delay={0.15}>
                              <p className="text-primary">{leader.role}</p>
                            </TextReveal>
                          </div>
                          <div className="lg:w-2/3">
                            <TextReveal delay={0.1}>
                              <h2 className="text-3xl text-neutral-dark mb-6">{leader.role}'s Message</h2>
                            </TextReveal>
                            <TextReveal delay={0.15}>
                              <div className="prose prose-lg text-neutral-dark/80 mb-6">
                                <p>{leader.preview}</p>
                              </div>
                            </TextReveal>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={() => setSelectedMessage(leader)}
                                className="flex items-center gap-2"
                              >
                                Read Full Message
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedMessage && (
            <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto relative"
              >
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-neutral-dark/10 rounded-full transition-colors z-10"
                >
                  <X className="h-6 w-6 text-neutral-dark" />
                </button>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-primary-light/20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    {selectedMessage.photo_url ? (
                      <img
                        src={selectedMessage.photo_url}
                        alt={selectedMessage.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <User className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <div>
                    <TextReveal>
                      <h2 className="text-2xl font-semibold text-neutral-dark">{selectedMessage.name}</h2>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                      <p className="text-lg text-primary">{selectedMessage.role}</p>
                    </TextReveal>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {selectedMessage.fullMessage.split('\n\n').map((paragraph, index) => (
                    <TextReveal key={index} delay={0.2 + index * 0.1}>
                      <p className="text-neutral-dark/80 text-base leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    </TextReveal>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}