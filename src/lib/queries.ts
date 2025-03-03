import { useQuery, useQueryClient } from '@tanstack/react-query';
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

export function useAlumniProfile(userId: string | undefined, options = {}) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['alumniProfile', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID provided');

      const { data, error } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully

      if (error) {
        console.error('Alumni profile fetch error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Profile not found');
      }

      return data as ProfileType;
    },
    enabled: !!userId,
    staleTime: 0,
    retry: 3, // Add retry attempts
    retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 30000), // Exponential backoff
    ...options,
    onSuccess: (data) => {
      queryClient.setQueryData(['alumniProfile', userId], data);
    }
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





