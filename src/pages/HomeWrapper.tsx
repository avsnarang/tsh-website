import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Home from './Home';
import type { LeadershipMessage } from '../types/leadership';

export default function HomeWrapper() {
  const [initialData, setInitialData] = useState<{
    messages: LeadershipMessage[];
    latestUpdate: string;
  }>({
    messages: [],
    latestUpdate: ''
  });
  
  useEffect(() => {
    async function getInitialData() {
      const { data: messages } = await supabase
        .from('leadership_messages')
        .select('*')
        .eq('display_locations', ['homepage'])
        .order('order');

      const { data: latestUpdate } = await supabase
        .from('latest_updates')
        .select('content')
        .eq('is_active', true)
        .single();

      setInitialData({
        messages: messages || [],
        latestUpdate: latestUpdate?.content || ''
      });
    }

    getInitialData();
  }, []);

  return <Home {...initialData} />;
}
