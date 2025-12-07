'use client';

import { useState, useEffect } from 'react';
import { User, ArrowRight, X, Quote, MessageSquare } from 'lucide-react';
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
        .order('order');

      if (error) throw error;

      const filteredMessages = (data || [])
        .filter(message => {
          const locations = message.display_locations || [];
          return locations.includes('all') || locations.includes(campusName);
        })
        .map(message => ({
          ...message,
          fullMessage: message.full_message || ''
        }));

      setMessages(filteredMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || messages.length === 0) {
    return null;
  }

  const formatCampusName = (name: string) => {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Reorder: center gets first message
  const getOrderClass = (index: number): string => {
    if (messages.length < 3) return '';
    if (index === 0) return 'lg:order-2';
    if (index === 1) return 'lg:order-1';
    if (index === 2) return 'lg:order-3';
    return '';
  };

  const isProminent = (index: number): boolean => index === 0 && messages.length >= 3;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Continuous gradient */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, 
          #43a047 0%,
          #388e3c 30%,
          #2e7d32 60%,
          #1b5e20 100%)`
      }} />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-orange/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white rounded-full mb-6"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-semibold text-sm">Leadership Messages</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Words from Our <span className="text-orange-light">Leaders</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
                Insights and guidance from {formatCampusName(campusName)} campus leadership
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:items-end">
          {messages.map((leader, index) => (
            <ScrollReveal key={leader.id} delay={index * 0.1} className={getOrderClass(index)}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative group h-full ${isProminent(index) ? 'lg:scale-105 lg:z-10' : ''}`}
              >
                <div className={`relative rounded-3xl p-8 shadow-xl transition-all duration-300 h-full flex flex-col ${
                  isProminent(index)
                    ? 'bg-gradient-to-br from-orange to-orange-dark text-white'
                    : 'bg-white/95 backdrop-blur-sm'
                }`}>
                  <Quote className={`absolute top-6 right-6 h-8 w-8 ${
                    isProminent(index) ? 'text-white/20' : 'text-green/10'
                  }`} />
                  
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ${
                      isProminent(index) ? 'ring-white/30' : 'ring-green/20'
                    }`}>
                      {leader.photo_url ? (
                        <img src={leader.photo_url} alt={leader.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          isProminent(index) ? 'bg-white/20' : 'bg-gradient-to-br from-green to-green-dark'
                        }`}>
                          <User className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-display ${isProminent(index) ? 'text-white' : 'text-neutral-dark'}`}>
                      {leader.name}
                    </h3>
                    <p className={`text-sm font-medium ${isProminent(index) ? 'text-orange-light' : 'text-green'}`}>
                      {leader.role}
                    </p>
                  </div>

                  <p className={`font-body text-center text-sm leading-relaxed flex-grow mb-6 line-clamp-4 ${
                    isProminent(index) ? 'text-white/90' : 'text-neutral-dark/70'
                  }`}>
                    "{leader.preview}"
                  </p>

                  <div className="text-center mt-auto">
                    <Button
                      onClick={() => setSelectedMessage(leader)}
                      variant={isProminent(index) ? 'cta' : 'outline2'}
                      className={`text-sm ${isProminent(index) ? 'bg-white text-orange hover:bg-orange-light' : ''}`}
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedMessage(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-green to-green-dark p-6 text-white">
              <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full">
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30">
                  {selectedMessage.photo_url ? (
                    <img src={selectedMessage.photo_url} alt={selectedMessage.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                      <User className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-display">{selectedMessage.name}</h2>
                  <p className="text-white/80">{selectedMessage.role}</p>
                </div>
              </div>
            </div>
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              {selectedMessage.fullMessage.split('\n\n').map((p, i) => (
                <p key={i} className="text-neutral-dark/80 mb-4 leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
