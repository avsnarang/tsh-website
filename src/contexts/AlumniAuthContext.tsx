import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AlumniAuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, profileData: AlumniProfileData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AlumniProfileData {
  full_name: string;
  batch_year: number;
  occupation: string;
  current_location: string;
  email: string;
}

const AlumniAuthContext = createContext<AlumniAuthContextType | undefined>(undefined);

export function AlumniAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, profileData: AlumniProfileData) => {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: profileData.full_name,
            has_completed_profile: true
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned from signup');

      // 2. Create alumni profile
      const { error: profileError } = await supabase
        .from('alumni_profiles')
        .insert({
          id: authData.user.id,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        // Cleanup: remove auth user if profile creation fails
        await supabase.auth.signOut();
        throw profileError;
      }

      setUser(authData.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AlumniAuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AlumniAuthContext.Provider>
  );
}

export const useAlumniAuth = () => {
  const context = useContext(AlumniAuthContext);
  if (context === undefined) {
    throw new Error('useAlumniAuth must be used within an AlumniAuthProvider');
  }
  return context;
};