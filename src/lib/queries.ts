import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';
import { useAuth } from '../contexts/AuthContext';
import { Profile as AlumniProfile } from '../types/campus';

export function useAlumniProfiles() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['alumniProfiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni_profiles')
        .select('*')
        .order('batch_year', { ascending: false });

      if (error) {
        console.error('Alumni profiles fetch error:', error);
        throw error;
      }

      return data as AlumniProfile[];
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAlumniProfile(userId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['alumniProfile', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID provided');

      const { data, error } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Alumni profile fetch error:', error);
        throw error;
      }

      return data as ProfileType;
    },
    enabled: !!user && !!userId,
    staleTime: Infinity, // Only refetch when explicitly invalidated
    cacheTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
}

export function useSuccessStories() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['successStories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('success_stories') // Keep plural form
        .select(`
          id,
          title,
          content,
          created_at,
          alumni_profiles!inner (
            id,
            full_name,
            occupation,
            company,
            profile_picture_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Success stories fetch error:', error);
        throw error;
      }

      return data;
    },
    // Only enable the query when user is authenticated
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}





