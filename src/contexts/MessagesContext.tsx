'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { LeadershipMessage } from '../types/leadership';

interface MessagesContextType {
  messages: LeadershipMessage[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchMessages = useCallback(async () => {
    // Don't fetch if already fetched or currently loading
    if (hasFetched || loading) return;

    setLoading(true);
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
      setHasFetched(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [hasFetched, loading]);

  return (
    <MessagesContext.Provider value={{ messages, loading, error, fetchMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }

  // Lazy-load: fetch only when hook is used
  useEffect(() => {
    if (context.messages.length === 0 && !context.loading) {
      context.fetchMessages();
    }
  }, [context]);

  return context;
}
