'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/ui/Container';
import { Lock, ArrowRight, AlertTriangle, Mail, Star } from 'lucide-react';
import { ALUMNI_ROUTES } from '@/config/routes';
import { supabase } from '@/lib/supabase';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';

export default function Login() {
  const posthog = usePostHog();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [blockRedirect, setBlockRedirect] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signIn, user, userRole, loading: authLoading, clearAdminSession } = useAuth();
  const [justLoaded, setJustLoaded] = useState(true);

  const inputClasses = `
    w-full pl-10 pr-4 py-3 
    bg-neutral-light/10 
    border-2 border-neutral-dark/10 
    rounded-xl 
    focus:ring-2 focus:ring-green/20 focus:border-green 
    transition-all duration-300
    hover:border-green/40
    placeholder-neutral-dark/40
  `;

  const inputGroupClasses = `
    relative group
    before:absolute before:-inset-2 before:rounded-xl before:border-2 before:border-transparent before:transition-all before:duration-300
    hover:before:border-green/10 hover:before:bg-green/5
  `;

  // Add a check for Supabase storage on mount
  useEffect(() => {
    // Check localStorage for Supabase session on mount
    const checkForStoredSessions = () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
          console.log(`Found Supabase session key in storage: ${key}`);
          return true;
        }
      }
      return false;
    };
    
    const hasStoredSessions = checkForStoredSessions();
    console.log('Login page mounted. Stored sessions detected:', hasStoredSessions);
    
    // Clear any lingering login progress indicators
    if (typeof window !== 'undefined') {
      const loginInProgress = sessionStorage.getItem('login_in_progress');
      if (loginInProgress) {
        const loginTimestamp = parseInt(loginInProgress);
        const currentTime = new Date().getTime();
        // If login has been in progress for more than 30 seconds, clear it
        if (currentTime - loginTimestamp > 30000) {
          console.log('Clearing stale login progress indicator');
          sessionStorage.removeItem('login_in_progress');
        } else {
          console.log('Login attempt in progress, preserving session');
        }
      }
    }
  }, []);

  // Force clear admin session when login page loads
  useEffect(() => {
    const forceSignOutAdmin = async () => {
      try {
        await clearAdminSession();
        setBlockRedirect(false);
      } catch (err) {
        console.error('Error during force admin signout:', err);
        setBlockRedirect(false);
      }
    };
    
    forceSignOutAdmin();
    
    // Timeout to ensure we don't block redirects forever
    const timeout = setTimeout(() => {
      setBlockRedirect(false);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [clearAdminSession]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Prevent auto-redirects for a short period after loading
  // This gives the page time to stabilize
  useEffect(() => {
    const timer = setTimeout(() => {
      setJustLoaded(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (authLoading || blockRedirect || justLoaded) return;
    
    if (user && userRole) {
      console.log('User already logged in with role:', userRole);
      
      // Use router.push for navigation
      if (userRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (userRole === 'alumni') {
        const from = searchParams?.get('redirect') || '/alumni/profile';
        router.push(from);
      }
    }
  }, [user, userRole, authLoading, searchParams, router, blockRedirect, justLoaded]);

  // Debug function to check Supabase connection
  const checkSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Supabase connection error:', error);
        return false;
      }
      
      console.log('Supabase connection successful, session data:', data);
      return true;
    } catch (err) {
      console.error('Failed to check Supabase connection:', err);
      return false;
    }
  };

  // Increase the timeout duration
  const SIGN_IN_TIMEOUT = 30000; // 30 seconds instead of 15

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      // Mark login as in progress
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('login_in_progress', new Date().getTime().toString());
      }
      
      // Check Supabase connection first
      const isConnected = await checkSupabaseConnection();
      
      if (!isConnected) {
        throw new Error('Cannot connect to authentication service. Please try again later.');
      }
      
      console.log('Attempting sign in with:', { email });
      
      // Set a timeout to handle stalled requests
      timeoutRef.current = window.setTimeout(() => {
        console.error(`Sign in timed out after ${SIGN_IN_TIMEOUT/1000} seconds`);
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('login_in_progress');
        }
        setError('Sign in timed out. Please check your network connection and try again.');
        setLoading(false);
      }, SIGN_IN_TIMEOUT);
      
      await signIn(email, password);

      // Clear timeout if sign-in succeeds
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Identify user and capture successful login
      posthog?.identify(email, {
        email,
      });

      posthog?.capture('alumni_logged_in', {
        email,
      });

    } catch (err: any) {
      console.error('Login error:', err);
      sessionStorage.removeItem('login_in_progress');

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Capture failed login event
      posthog?.capture('alumni_login_failed', {
        email,
        error_message: err.message,
      });

      if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (err.message?.includes('rate limit')) {
        setError('Too many login attempts. Please try again later.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light/30 pb-24">
      {/* Decorative Background Elements */}
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

      <Container className="relative z-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
            >
              <Star className="h-4 w-4" />
              <span className="font-semibold">Welcome Back</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-4">
                Alumni <span className="text-green">Login</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body">Access your alumni account</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange/40 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green/40 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-orange/5 rounded-2xl" />

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border-2 border-red-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative space-y-8">
                <div className={inputGroupClasses}>
                  <label className="block text-sm font-medium text-neutral-dark mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40 group-hover:text-green transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClasses}
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className={inputGroupClasses}>
                  <label className="block text-sm font-medium text-neutral-dark mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40 group-hover:text-green transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClasses}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || authLoading}
                  className="w-full bg-gradient-to-r from-green to-green-dark text-white py-4 px-6 rounded-xl 
                    hover:from-green-dark hover:to-green 
                    transition-all duration-300 
                    disabled:opacity-50 
                    relative overflow-hidden group
                    shadow-lg shadow-green/20
                    hover:shadow-xl hover:shadow-green/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                  <span className="relative font-medium text-lg">
                    {loading || authLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Signing in...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </span>
                </motion.button>

                <div className="text-center">
                  <p className="text-neutral-dark/70">
                    Don't have an account?{' '}
                    <Link
                      href={ALUMNI_ROUTES.REGISTER}
                      className="text-green hover:text-green-dark transition-colors inline-flex items-center gap-1"
                    >
                      Register
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
