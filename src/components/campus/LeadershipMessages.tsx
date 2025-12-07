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

  // Get CSS order class for desktop reordering (2, 1, 3)
  // Mobile stays in natural order (1, 2, 3)
  const getOrderClass = (index: number): string => {
    if (messages.length < 3) return '';
    // On lg+: index 0 -> order 2 (center), index 1 -> order 1 (left), index 2 -> order 3 (right)
    if (index === 0) return 'lg:order-2';
    if (index === 1) return 'lg:order-1';
    if (index === 2) return 'lg:order-3';
    return '';
  };

  // Check if this is the prominent/center card (first message)
  const isProminent = (index: number): boolean => {
    return index === 0 && messages.length >= 3;
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Top fade-in gradient - blends from Features section */}
      <div className="absolute top-0 left-0 right-0 h-32 z-10" style={{
        background: `linear-gradient(to bottom, white 0%, rgba(248, 250, 252, 0.9) 50%, transparent 100%)`
      }} />

      {/* Unique geometric background */}
      <div className="absolute inset-0 bg-[#f8fafc]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2% 50%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                           radial-gradient(circle at 98% 20%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                           radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.7) 0%, transparent 35%)`,
        }} />
        
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px',
        }} />
      </div>

      {/* Bottom fade - matches next section's background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10" />

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

        {/* Horizontal Card Grid - Items reorder on lg screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:items-end">
          {messages.map((leader, index) => (
            <ScrollReveal 
              key={leader.id} 
              delay={index * 0.1}
              className={getOrderClass(index)}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative group h-full ${isProminent(index) ? 'lg:scale-105 lg:z-10' : ''}`}
              >
                {/* Card glow effect - stronger for prominent card */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 ${
                  isProminent(index) 
                    ? 'from-green/50 to-orange/50 lg:opacity-30' 
                    : 'from-green-light/40 to-orange-light/40'
                }`} />
                
                <div className={`relative rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full flex flex-col border ${
                  isProminent(index)
                    ? 'bg-gradient-to-br from-green to-green-dark text-white p-10 border-green lg:shadow-xl'
                    : 'bg-white p-8 border-neutral-100 group-hover:border-green-light/30'
                }`}>
                  {/* Quote Icon */}
                  <Quote className={`absolute top-6 right-6 h-8 w-8 transition-colors duration-300 ${
                    isProminent(index)
                      ? 'text-white/20 group-hover:text-white/30'
                      : 'text-green-light/30 group-hover:text-green-light/50'
                  }`} />
                  
                  {/* Profile Section */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`rounded-full overflow-hidden mb-4 transition-all duration-300 ${
                        isProminent(index)
                          ? 'w-32 h-32 lg:w-36 lg:h-36 ring-4 ring-white/30 group-hover:ring-white/50'
                          : 'w-28 h-28 ring-4 ring-green-light/20 group-hover:ring-green-light/40'
                      }`}
                    >
                      {leader.photo_url ? (
                        <img
                          src={leader.photo_url}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          isProminent(index)
                            ? 'bg-white/20'
                            : 'bg-gradient-to-br from-green-light to-green'
                        }`}>
                          <User className={`${isProminent(index) ? 'h-16 w-16' : 'h-12 w-12'} text-white`} />
                        </div>
                      )}
                    </motion.div>
                    
                    <h3 className={`font-display transition-colors duration-300 ${
                      isProminent(index)
                        ? 'text-2xl lg:text-2xl text-white'
                        : 'text-xl text-neutral-dark group-hover:text-green'
                    }`}>
                      {leader.name}
                    </h3>
                    <p className={`font-medium text-sm ${
                      isProminent(index) ? 'text-orange-light' : 'text-green'
                    }`}>
                      {leader.role}
                    </p>
                  </div>

                  {/* Preview Text */}
                  <div className="flex-grow mb-6">
                    <p className={`font-body text-center leading-relaxed ${
                      isProminent(index)
                        ? 'text-white/90 line-clamp-5'
                        : 'text-neutral-dark/70 line-clamp-4'
                    }`}>
                      "{leader.preview}"
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center mt-auto">
                    <Button
                      onClick={() => setSelectedMessage(leader)}
                      variant={isProminent(index) ? 'cta' : 'outline2'}
                      className={`group/btn inline-flex items-center gap-2 px-6 py-2 text-sm ${
                        isProminent(index) ? 'bg-white text-green hover:bg-orange-light hover:text-neutral-dark' : ''
                      }`}
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
