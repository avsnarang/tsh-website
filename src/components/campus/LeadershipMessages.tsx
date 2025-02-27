import React, { useState, useEffect } from 'react';
import { User, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { LeadershipMessage } from '../../types/leadership';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';

interface LeadershipMessagesProps {
  campusName: string;
}

export default function LeadershipMessages({ campusName }: LeadershipMessagesProps) {
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [campusName]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('leadership_messages')
        .select('*')
        .or(`display_locations.cs.{${campusName}},display_locations.cs.{all}`)
        .order('order');

      if (error) throw error;

      // Format messages
      const formattedMessages = (data || []).map(msg => ({
        ...msg,
        fullMessage: msg.full_message || ''
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || messages.length === 0) {
    return null;
  }

  // Determine grid columns based on number of messages
  const gridCols = messages.length === 1 ? 'md:grid-cols-1' :
                   messages.length === 2 ? 'md:grid-cols-2' :
                   'md:grid-cols-3';

  return (
    <div className="py-24 bg-primary-light/10">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h2 className="text-4xl text-neutral-dark mb-4">Leadership Messages</h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                Guidance and vision from our school leadership
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
          {messages.map((leader, index) => (
            <ScrollReveal
              key={leader.id}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="flex-grow">
                  <div className="w-36 h-36 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    {leader.photo_url ? (
                      <img
                        src={leader.photo_url}
                        alt={leader.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-20 w-20 text-primary" />
                    )}
                  </div>
                  <TextReveal delay={0.3 + index * 0.1}>
                    <h3 className="text-xl text-neutral-dark font-semibold mb-2 text-center">{leader.name}</h3>
                  </TextReveal>
                  <TextReveal delay={0.4 + index * 0.1}>
                    <p className="text-primary mb-4 text-center">{leader.role}</p>
                  </TextReveal>
                  <TextReveal delay={0.5 + index * 0.1}>
                    <p className="text-neutral-dark/80 mb-6 line-clamp-3">{leader.preview}</p>
                  </TextReveal>
                </div>
                <Button 
                  onClick={() => setSelectedMessage(leader)}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2 group-hover:gap-3 mt-auto"
                >
                  Read Message
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
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
            <div className="prose prose-lg">
              {selectedMessage?.fullMessage?.split('\n\n').map((paragraph: string, index: number) => (
                <TextReveal key={index} delay={0.2 + index * 0.1}>
                  <p className="text-neutral-dark/80 mb-4">
                    {paragraph}
                  </p>
                </TextReveal>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}