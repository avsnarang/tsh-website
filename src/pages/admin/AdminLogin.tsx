import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { Lock } from 'lucide-react';
import Title from '../../components/utils/Title';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFirstSetup, setIsFirstSetup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkFirstSetup();
  }, []);

  const checkFirstSetup = async () => {
    try {
      const { count, error } = await supabase
        .from('management_users')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      setIsFirstSetup(count === 0);
    } catch (err) {
      console.error('Error checking management setup:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      // Sign in the user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      // Check if user is a management user
      const { data: managementData, error: managementError } = await supabase
        .from('management_users')
        .select('id')
        .eq('id', authData.user.id)
        .single();

      if (managementError || !managementData) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized access');
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  if (isFirstSetup) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl text-neutral-dark">Welcome!</h1>
              <p className="text-neutral-dark/80 mt-4">
                No admin account has been set up yet. Create your first admin account to get started.
              </p>
            </div>
            <Button
              onClick={() => navigate('/admin/setup')}
              className="w-full"
            >
              Create Admin Account
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Title title="Admin Login" description="School Management Portal" />
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl text-neutral-dark">Admin Login</h1>
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
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}