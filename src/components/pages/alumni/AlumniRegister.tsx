'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAlumniAuth } from '@/contexts/AlumniAuthContext';
import Container from '@/components/ui/Container';
import { ALUMNI_ROUTES } from '@/config/routes';
import { UserPlus, GraduationCap, MapPin, Briefcase, Mail, Lock, Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AlumniRegister() {
  const [fullName, setFullName] = useState('');
  const [batchYear, setBatchYear] = useState(new Date().getFullYear().toString());
  const [occupation, setOccupation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, signUp } = useAlumniAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(ALUMNI_ROUTES.PROFILE);
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form
      if (!fullName || !batchYear || !occupation || !currentLocation || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      const year = parseInt(batchYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 2005 || year > currentYear) {
        throw new Error(`Please enter a valid year between 2005 and ${currentYear}`);
      }

      // Create profile data object
      const profileData = {
        full_name: fullName,
        batch_year: year,
        occupation,
        current_location: currentLocation,
        email
      };

      // Attempt registration
      await signUp(email, password, profileData);

      // Redirect to profile page on success
      router.push(`${ALUMNI_ROUTES.PROFILE}?registered=true`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-neutral-light/30 pt-32 pb-24">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top right decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        {/* Bottom left decorative circle */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        {/* Center decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <Container className="relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
            >
              <Star className="h-4 w-4" />
              <span className="font-semibold">Join Our Community</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-4">
                Alumni <span className="text-green">Registration</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body">Become part of our growing network</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-6xl mx-auto"> {/* Increased max-width to accommodate columns */}
            <div className="relative bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange/40 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green/40 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-orange/5 rounded-2xl" />
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border-2 border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column - Personal Information */}
                  <div className="space-y-6">
                    <TextReveal>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center">
                          <UserPlus className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-display text-neutral-dark">Personal Information</h2>
                      </div>
                    </TextReveal>

                    <div className="space-y-6">
                      <div className={inputGroupClasses}>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40 group-hover:text-green transition-colors" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={inputClasses}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div className={inputGroupClasses}>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          Batch Year
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40 group-hover:text-green transition-colors" />
                          <input
                            type="number"
                            value={batchYear}
                            onChange={(e) => setBatchYear(e.target.value)}
                            min="2005"
                            max={new Date().getFullYear()}
                            className={inputClasses}
                            placeholder="Enter your batch year"
                            required
                          />
                        </div>
                      </div>

                      <div className={inputGroupClasses}>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          Current Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40 group-hover:text-green transition-colors" />
                          <input
                            type="text"
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                            className={inputClasses}
                            placeholder="Enter your current location"
                            required
                          />
                        </div>
                      </div>

                      <div className={inputGroupClasses}>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          Occupation
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40 group-hover:text-green transition-colors" />
                          <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className={inputClasses}
                            placeholder="Enter your occupation"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Account Information */}
                  <div className="space-y-6">
                    <TextReveal>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-light to-orange rounded-full flex items-center justify-center">
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-display text-neutral-dark">Account Information</h2>
                      </div>
                    </TextReveal>

                    <div className="space-y-6">
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
                            placeholder="Create a password (min. 8 characters)"
                            minLength={8}
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-8">
                        <motion.button
                          type="submit"
                          disabled={loading}
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
                            {loading ? 'Creating Account...' : 'Complete Registration'}
                          </span>
                        </motion.button>

                        <div className="text-center mt-6">
                          <p className="text-neutral-dark/70">
                            Already have an account?{' '}
                            <Link
                              href={ALUMNI_ROUTES.LOGIN}
                              className="text-green hover:text-green-dark transition-colors inline-flex items-center gap-1"
                            >
                              Sign In
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
