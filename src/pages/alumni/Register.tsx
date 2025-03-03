import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { UserPlus, ArrowRight, AlertTriangle, Users, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { ALUMNI_ROUTES } from '../../constants/routes';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [batchYear, setBatchYear] = useState(new Date().getFullYear().toString());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const { user, signUp, loading: authLoading } = useAuth();
  
  // Add debug logging
  const logDebug = (message: string) => {
    console.log(`[Register] ${message}`);
  };

  // Log initial state - only on first render
  useEffect(() => {
    logDebug(`Initial state - User: ${user?.id || 'none'}`);
  }, []);  // Empty dependency array = only run once

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      logDebug('User already logged in - redirecting to profile');
      navigate(ALUMNI_ROUTES.PROFILE);
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    // Validate account fields
    if (!email || !password || !confirmPassword) {
      setError('All account fields are required');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate profile fields
    if (!fullName || !currentLocation || !occupation || !batchYear) {
      setError('All profile fields are required');
      return false;
    }
    
    // Validate batch year
    const year = parseInt(batchYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 2005 || year > currentYear) {
      setError(`Please enter a valid graduation year between 2005 and ${currentYear}`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    setLoading(true);
    setError('');
    
    try {
      logDebug('Starting registration process');
      
      // 1. Check if email already exists
      const { data: existingUsers } = await supabase
        .from('alumni_profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUsers) {
        throw new Error('This email is already registered. Please log in instead.');
      }

      // 2. Create auth user
      logDebug(`Creating auth account for email: ${email}`);
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            has_completed_profile: true,
            profile_created_at: new Date().toISOString()
          }
        }
      });

      if (authError) throw authError;
      if (!authData?.user) throw new Error('No user data returned from signup');

      const userId = authData.user.id;
      logDebug(`Auth account created successfully. User ID: ${userId}`);

      // 3. Create alumni profile
      const profileData = {
        id: userId,
        full_name: fullName,
        current_location: currentLocation,
        occupation: occupation,
        batch_year: parseInt(batchYear),
        email: email,
        // Default values for optional fields
        company: '',
        bio: '',
        linkedin_url: '',
        instagram_url: '',
        facebook_url: '',
        phone: '',
        profile_picture_url: '',
        is_public: false,
        show_contact_info: false,
        testimonial: '',
        show_testimonial: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      logDebug('Creating alumni profile');
      const { error: profileError } = await supabase
        .from('alumni_profiles')
        .insert(profileData);

      if (profileError) {
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      logDebug('Registration successful');
      setSuccessMessage('Registration successful! Redirecting to your profile...');

      // 4. Redirect to profile page
      setTimeout(() => {
        window.location.href = `${ALUMNI_ROUTES.PROFILE}?registered=true`;
      }, 1500);

    } catch (err: any) {
      logDebug(`Registration error: ${err.message}`);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-primary/5 pt-32 pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display text-neutral-dark mb-2">
              Create Alumni Account
            </h1>
            <p className="text-neutral-dark/70">
              Join our alumni network
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Section */}
            <div className="border-b border-neutral-light/50 pb-4 mb-4">
              <h2 className="text-lg font-semibold text-neutral-dark mb-4">Account Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="you@example.com"
                    disabled={loading || submitting}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-dark mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="••••••••"
                    disabled={loading || submitting}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-dark mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="••••••••"
                    disabled={loading || submitting}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Profile Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-neutral-dark mb-4">Alumni Details</h2>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-dark mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-neutral-dark/40" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="John Doe"
                    disabled={loading || submitting}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="currentLocation" className="block text-sm font-medium text-neutral-dark mb-2">
                  Current Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-neutral-dark/40" />
                  </div>
                  <input
                    id="currentLocation"
                    type="text"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="City, Country"
                    disabled={loading || submitting}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-neutral-dark mb-2">
                  Occupation
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-neutral-dark/40" />
                  </div>
                  <input
                    id="occupation"
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Software Engineer"
                    disabled={loading || submitting}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="batchYear" className="block text-sm font-medium text-neutral-dark mb-2">
                  Pass Out Batch (Year)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-neutral-dark/40" />
                  </div>
                  <input
                    id="batchYear"
                    type="number"
                    value={batchYear}
                    onChange={(e) => setBatchYear(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="2023"
                    min="1900"
                    max={new Date().getFullYear()}
                    disabled={loading || submitting}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || authLoading || submitting}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {(loading || authLoading || submitting) ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Complete Registration
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-dark/70">
              Already have an account?{' '}
              <Link
                to={ALUMNI_ROUTES.LOGIN}
                className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
