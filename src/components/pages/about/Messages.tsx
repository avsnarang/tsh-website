'use client';

import React, { useState, useEffect } from 'react';
import { User, X, ArrowRight } from 'lucide-react';
import { LeadershipMessage } from '@/types/leadership';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Messages() {
  const [leadershipMessages, setLeadershipMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from('leadership_messages')
          .select('*')
          .order('order');

        if (error) {
          console.error('Error fetching leadership messages:', error);
          return;
        }

        const formatted = (data || []).map(msg => ({
          ...msg,
          fullMessage: msg.full_message || '',
          display_locations: msg.display_locations || ['all']
        }));

        setLeadershipMessages(formatted);
      } catch (err) {
        console.error('Failed to fetch leadership messages:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className="relative min-h-[90vh] bg-neutral-light">
      {/* Decorative Background Elements - fixed to cover full viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 pb-20">
        <motion.div
          className="flex-1 text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Tag */}
          <motion.div
            className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-8"
            {...fadeIn}
          >
            <span className="text-sm font-semibold">LEADERSHIP INSIGHTS</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
            <span className="text-green">Guiding</span> Voices,{" "}
            <span className="text-orange">Shaping</span> Futures
          </h1>

          {/* Description */}
          <p className="text-lg text-neutral-dark/70 mb-8 max-w-2xl mx-auto">
            Wisdom and vision from the leaders shaping tomorrow's pioneers at The Scholars' Home.
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-xl animate-pulse">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-32 h-32 rounded-xl bg-neutral-200" />
                  <div className="flex-1 space-y-3 w-full">
                    <div className="h-6 w-48 bg-neutral-200 rounded" />
                    <div className="h-4 w-32 bg-neutral-200 rounded" />
                    <div className="h-4 w-full bg-neutral-200 rounded" />
                    <div className="h-4 w-3/4 bg-neutral-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="w-full md:w-[calc(50%-1rem)] max-w-xl bg-white rounded-2xl p-8 shadow-xl animate-pulse">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-32 h-32 rounded-xl bg-neutral-200" />
                    <div className="flex-1 space-y-3 w-full">
                      <div className="h-6 w-48 bg-neutral-200 rounded" />
                      <div className="h-4 w-32 bg-neutral-200 rounded" />
                      <div className="h-4 w-full bg-neutral-200 rounded" />
                      <div className="h-4 w-3/4 bg-neutral-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message cards */}
        {!loading && (
          <div className="max-w-7xl mx-auto">
            {/* First Row - Single Card Centered */}
            <div className="flex justify-center mb-8">
              {leadershipMessages.slice(0, 1).map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative group w-full max-w-2xl"
                >
                  <MessageCard message={message} setSelectedMessage={setSelectedMessage} />
                </motion.div>
              ))}
            </div>

            {/* Second Row - Two Cards */}
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {leadershipMessages.slice(1, 3).map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className="relative group w-full md:w-[calc(50%-1rem)] max-w-xl"
                >
                  <MessageCard message={message} setSelectedMessage={setSelectedMessage} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/90 backdrop-blur-xl flex items-center justify-center p-4 z-[100]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl"
            >
              <div className="relative p-8 border-b border-neutral-200">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden">
                    {selectedMessage.photo_url ? (
                      <img
                        src={selectedMessage.photo_url}
                        alt={selectedMessage.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-light to-green flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display text-neutral-dark">
                      {selectedMessage.name}
                    </h2>
                    <p className="text-green">{selectedMessage.role}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <div className="prose prose-lg max-w-none">
                  {selectedMessage.fullMessage.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-neutral-dark/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// MessageCard component
interface MessageCardProps {
  message: LeadershipMessage;
  setSelectedMessage: (message: LeadershipMessage) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, setSelectedMessage }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
      <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />

      {/* Content */}
      <div className="relative p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Image */}
          <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-green-light to-green">
            {message.photo_url ? (
              <img
                src={message.photo_url}
                alt={message.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-display text-neutral-dark mb-2">
              {message.name}
            </h3>
            <p className="text-green mb-4">{message.role}</p>
            <p className="text-neutral-dark/70 line-clamp-3">
              {message.preview}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline2"
            onClick={() => setSelectedMessage(message)}
            className="group flex items-center gap-2 w-full justify-center hover:bg-green-light/10"
          >
            Read Full Message
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
