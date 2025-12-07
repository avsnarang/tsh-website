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
    <section className="relative py-32 overflow-hidden">
      {/* Top fade-in gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white to-transparent z-10" />
      
      {/* Unique geometric background - similar to homepage LeaderMessages */}
      <div className="absolute inset-0 bg-[#f8fafc]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2% 50%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                           radial-gradient(circle at 98% 20%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                           radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.7) 0%, transparent 35%)`,
        }} />
        
        {/* Animated wave pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px',
        }} />
      </div>

      <Container className="relative z-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-6"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-semibold text-sm">Leadership Insights</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-dark mb-6">
                Voices of <span className="text-green">Experience</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                Wisdom and guidance from our educational leaders shaping tomorrow's minds
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:items-end">
          {messages.map((leader, index) => (
            <ScrollReveal key={leader.id} delay={index * 0.1} className={getOrderClass(index)}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative group h-full ${isProminent(index) ? 'lg:scale-105 lg:z-10' : ''}`}
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-light/10 via-transparent to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-orange-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                
                <div className={`relative rounded-3xl p-8 shadow-xl transition-all duration-300 h-full flex flex-col ${
                  isProminent(index)
                    ? 'bg-green text-white'
                    : 'bg-white'
                }`}>
                  <Quote className={`absolute top-6 right-6 h-10 w-10 ${
                    isProminent(index) ? 'text-white/15' : 'text-green-light/20'
                  }`} />
                  
                  <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 shadow-lg ${
                        isProminent(index) ? 'ring-white/30' : 'ring-green-light/30'
                      }`}
                    >
                      {leader.photo_url ? (
                        <img src={leader.photo_url} alt={leader.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          isProminent(index) ? 'bg-green-dark' : 'bg-gradient-to-br from-green-light to-green'
                        }`}>
                          <User className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </motion.div>
                    
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
                    <motion.button
                      onClick={() => setSelectedMessage(leader)}
                      className={`inline-flex items-center gap-2 font-medium group/btn ${
                        isProminent(index) 
                          ? 'text-white hover:text-orange-light' 
                          : 'text-green hover:text-green-dark'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      Read Full Message
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-neutral-dark/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedMessage(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-green to-green-dark p-6 text-white relative">
              <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30">
                  {selectedMessage.photo_url ? (
                    <img src={selectedMessage.photo_url} alt={selectedMessage.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-green-dark flex items-center justify-center">
                      <User className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-display">{selectedMessage.name}</h2>
                  <p className="text-green-light">{selectedMessage.role}</p>
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
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-light/50 via-white to-transparent z-10" />
    </section>
  );
}
