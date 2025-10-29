'use client';

import { useState, useEffect } from 'react';
import { User, ArrowRight, X, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { LeadershipMessage } from '../../types/leadership';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { useAuth } from '../../contexts/AuthContext';

interface LeadershipMessagesProps {
  campusName: string;
}

export default function LeadershipMessages({ campusName }: LeadershipMessagesProps) {
  const { loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchMessages();
    }
  }, [campusName, authLoading]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leadership_messages')
        .select('*')
        .eq('campus', campusName);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || messages.length === 0) {
    return null;
  }

  return (
    <div className="py-24 bg-gradient-to-b from-primary-light/5 to-white">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/5 rounded-full -translate-y-12" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary/10 rounded-full -translate-y-8" />
            
            <div className="relative">
              <TextReveal>
                <h2 className="text-4xl text-neutral-dark mb-4">Words from Our Leaders</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                  Insights and guidance from {campusName} campus leadership
                </p>
              </TextReveal>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {messages.map((leader, index) => (
            <ScrollReveal
              key={leader.id}
              delay={index * 0.1}
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
                      <TextReveal delay={0.2}>
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
                          variant="primary"
                          className="flex items-center gap-2 group-hover:gap-3 transition-all"
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
      </Container>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <div className="sticky top-0 bg-white p-6 border-b border-neutral-dark/10 flex items-center justify-between">
              <div>
                <TextReveal>
                  <h2 className="text-2xl font-semibold text-neutral-dark">{selectedMessage.name}</h2>
                </TextReveal>
                <TextReveal delay={0.1}>
                  <p className="text-primary">{selectedMessage.role}</p>
                </TextReveal>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>
            <div className="p-6">
              <div className="prose prose-lg max-w-none">
                {selectedMessage.fullMessage.split('\n\n').map((paragraph, index) => (
                  <TextReveal key={index} delay={0.2 + index * 0.1}>
                    <p className="text-neutral-dark/80 mb-4">{paragraph}</p>
                  </TextReveal>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
