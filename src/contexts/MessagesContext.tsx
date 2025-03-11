import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LeadershipMessage } from '../types/leadership';

interface MessagesContextType {
  messages: LeadershipMessage[];
  loading: boolean;
  error: string | null;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('leadership_messages')
          .select('*')
          .order('order');

        if (error) {
          setError(error.message);
          return;
        }

        const formattedMessages = (data || []).map(msg => ({
          ...msg,
          fullMessage: msg.full_message || '',
          display_locations: msg.display_locations || ['all']
        }));

        setMessages(formattedMessages);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, loading, error }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}
