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
  const { user } = useAuth();

  return useQuery<AlumniProfile[], Error>({
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
    gcTime: 1000 * 60 * 5,
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
  const { user } = useAuth();

  return useQuery<SuccessStory[], Error>({
    queryKey: ['successStories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('success_stories')
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

      // Transform the data to match the SuccessStory interface
      return data.map((story: any) => ({
        id: story.id,
        title: story.title,
        content: story.content,
        created_at: story.created_at,
        alumni_profiles: story.alumni_profiles[0] // Take the first (and should be only) alumni profile
      })) as SuccessStory[];
    },
    enabled: !!user,
    gcTime: 1000 * 60 * 5,
  });
}





