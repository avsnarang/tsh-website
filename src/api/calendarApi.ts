import { supabase } from '../lib/supabase';

export const calendarApi = {
  syncEvents: async (events: any[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('sync-calendar', {
        body: { events }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error syncing events:', error);
      throw error;
    }
  }
};