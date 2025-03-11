import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';
import { useAuth } from '../contexts/AuthContext';
import { Profile as AlumniProfile } from '../types/campus';
import { useEffect } from 'react';

interface SuccessStory {
  id: string;
  title: string;
  content: string;
  created_at: string;
  alumni_profiles: {
    id: string;
    full_name: string;
    occupation?: string;
    company?: string;
    profile_picture_url?: string;
  };
}

export function useAlumniProfiles() {
  return useQuery({
    queryKey: ['alumniProfiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni_profiles')
        .select(`
          id, 
          full_name, 
          batch_year, 
          occupation,
          company,
          current_location,
          email,
          phone,
          show_contact_info,
          profile_picture_url,
          linkedin_url,
          facebook_url,
          instagram_url,
          is_public,
          show_in_success
        `)
        .order('batch_year', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
}

export function useAlumniProfile(userId: string | undefined, options = {}) {
  const queryClient = useQueryClient();
  const result = useQuery<AlumniProfile, Error>({
    queryKey: ['alumniProfile', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID provided');

      const { data, error } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Alumni profile fetch error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Profile not found');
      }

      return data as AlumniProfile;
    },
    enabled: !!userId,
    gcTime: 0,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 30000),
    ...options,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (result.data) {
      queryClient.setQueryData(['alumniProfile', userId], result.data);
    }
  }, [result.data, userId, queryClient]);

  return result;
}

export function useSuccessStories() {
  return useQuery({
    queryKey: ['successStories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni_profiles')  // Changed from 'success_stories' to 'alumni_profiles'
        .select(`
          id,
          full_name,
          batch_year,
          occupation,
          company,
          bio,
          profile_picture_url,
          show_in_success
        `)
        .eq('show_in_success', true)  // Only fetch profiles marked for success stories
        .order('batch_year', { ascending: false });

      if (error) {
        console.error('Success stories fetch error:', error);
        throw error;
      }

      return data;
    }
  });
}
