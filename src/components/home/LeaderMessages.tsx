import { useState, useEffect } from 'react';
import { User, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import type { LeadershipMessage } from '../../types/leadership';
import ScrollReveal from '../animations/ScrollReveal';

export default function LeaderMessages() {
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership_messages')
        .select('*')
        .order('order')
        .filter('display_locations', 'cs', '{"homepage"}')
        .or('display_locations.cs.{"all"}');

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || messages.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-light">
      <Container>
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16">
            Messages from Our Leaders
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {messages.map((message) => (
            <ScrollReveal key={message.id}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary-light/20">
                    {message.photo_url ? (
                      <img
                        src={message.photo_url}
                        alt={message.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-dark">
                      {message.name}
                    </h3>
                    <p className="text-primary">{message.role}</p>
                  </div>
                </div>

                <p className="mt-6 text-neutral-dark/80">
                  {message.preview}
                </p>

                <motion.div
                  className="mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setSelectedMessage(message)}
                    className="flex items-center gap-2"
                  >
                    Read Full Message
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <AnimatePresence>
          {selectedMessage && (
            <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary-light/20">
                        {selectedMessage.photo_url ? (
                          <img
                            src={selectedMessage.photo_url}
                            alt={selectedMessage.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-dark">
                          {selectedMessage.name}
                        </h3>
                        <p className="text-primary">{selectedMessage.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-neutral-dark/60 hover:text-neutral-dark transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    {selectedMessage.fullMessage}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
