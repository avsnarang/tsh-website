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

      // Filter messages based on display_locations
      // Show messages that have 'all' in display_locations OR the specific campus name
      const filteredMessages = (data || [])
        .filter(message => {
          const locations = message.display_locations || [];
          return locations.includes('all') || locations.includes(campusName);
        })
        .map(message => ({
          ...message,
          // Map snake_case to camelCase for fullMessage
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

  // Format campus name for display (e.g., "paonta-sahib" -> "Paonta Sahib")
  const formatCampusName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-light/10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-orange-light/10 -translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-6"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-semibold text-sm">Leadership Messages</span>
            </motion.div>
            
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-dark mb-6">
                Words from Our <span className="text-green">Leaders</span>
              </h2>
            </TextReveal>
            
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                Insights and guidance from {formatCampusName(campusName)} campus leadership
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Horizontal Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {messages.map((leader, index) => (
            <ScrollReveal key={leader.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group h-full"
              >
                {/* Card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/40 to-orange-light/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-neutral-100 group-hover:border-green-light/30">
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-green-light/30 group-hover:text-green-light/50 transition-colors duration-300" />
                  
                  {/* Profile Section */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-green-light/20 group-hover:ring-green-light/40 transition-all duration-300"
                    >
                      {leader.photo_url ? (
                        <img
                          src={leader.photo_url}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-light to-green flex items-center justify-center">
                          <User className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </motion.div>
                    
                    <h3 className="text-xl font-display text-neutral-dark group-hover:text-green transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-green font-medium text-sm">{leader.role}</p>
                  </div>

                  {/* Preview Text */}
                  <div className="flex-grow mb-6">
                    <p className="text-neutral-dark/70 font-body text-center line-clamp-4 leading-relaxed">
                      "{leader.preview}"
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center mt-auto">
                    <Button
                      onClick={() => setSelectedMessage(leader)}
                      variant="outline2"
                      className="group/btn inline-flex items-center gap-2 px-6 py-2 text-sm"
                    >
                      Read Full Message
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Message Modal */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 bg-neutral-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMessage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green to-green-dark p-6 text-white">
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30">
                  {selectedMessage.photo_url ? (
                    <img
                      src={selectedMessage.photo_url}
                      alt={selectedMessage.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-display">{selectedMessage.name}</h2>
                  <p className="text-white/80">{selectedMessage.role}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <Quote className="h-10 w-10 text-green-light/30 mb-4" />
              <div className="prose prose-lg max-w-none">
                {selectedMessage.fullMessage.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neutral-dark/80 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
