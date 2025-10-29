'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import { Lock } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();


  useEffect(() => {
    checkExistingSetup();
  }, [navigate]);

  const checkExistingSetup = async () => {
    try {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');

      if (error) throw error;
      
      // Add null check for count
      if (count && count > 0) {
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Error checking admin setup:', err);
      setError('Failed to check existing setup');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);

      // Remove the 'admin' argument as signUp expects only email and password
      await signUp(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl text-neutral-dark">Create Admin Account</h1>
            <p className="text-neutral-dark/80 mt-4">
              Set up your first admin account to start managing the website.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-neutral-dark mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  minLength={8}
                />
                <p className="text-sm text-neutral-dark/60 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
