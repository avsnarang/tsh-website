import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlumniProfile } from '../../lib/queries';
import { queryClient } from '../../lib/queryClient';
import Container from '../../components/ui/Container';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Profile as ProfileType } from '../../types/campus';
import { 
  User, Mail, Phone, Briefcase, Building2, 
  Save, Star, AlertTriangle, CheckCircle,
  LogOut, Upload,
  MapPin, LinkedinIcon
} from 'lucide-react';
// Import modern social icons from a different package
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

export interface AlumniProfile extends Omit<ProfileType,
  'full_name' | 
  'batch_year' | 
  'occupation' | 
  'current_location' |
  'email' |
  'show_contact_info' |
  'is_public'
> {
  profile_picture_url?: string;
  full_name: string;
  batch_year: number;
  occupation?: string;
  company?: string;
  current_location?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  bio?: string;
  show_contact_info?: boolean;
  is_public?: boolean;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use React Query for profile data with proper typing and configuration
  const { 
    data: profile, 
    isLoading: loading,
    error: queryError,
    refetch: refreshProfile 
  } = useAlumniProfile(user?.id, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  }) as { 
    data: AlumniProfile | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
  };

  // Add effect to handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshProfile();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshProfile]);

  // Memoized change handler with immediate optimistic updates
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (!profile) return;

    const updatedProfile = {
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    };

    // Optimistically update the cache
    queryClient.setQueryData(['alumniProfile', user?.id], updatedProfile);
  }, [profile, user?.id]);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const { error } = await supabase
        .from('alumni_profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setSuccess('Profile updated successfully!');
      
      // Only refresh the profile data after successful update
      refreshProfile();
    } catch (error: any) {
      console.error('Update error:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  }, [user, profile, refreshProfile]);

  // Show error message if query fails
  useEffect(() => {
    if (queryError) {
      setError((queryError as Error).message || 'Failed to load profile');
    }
  }, [queryError]);

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (success || error) {
      timeoutId = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [success, error]);

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !profile) return;
    
    try {
      setUploading(true);
      setError('');
      setSuccess('');

      const file = e.target.files?.[0];
      if (!file) {
        throw new Error('No file selected');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      if (profile.profile_picture_url) {
        const oldFileName = profile.profile_picture_url.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('alumni')
            .remove([`profile-pictures/${oldFileName}`]);
        }
      }

      await supabase.storage
        .from('alumni')
        .upload(`profile-pictures/${fileName}`, file);

      const { data: { publicUrl } } = supabase.storage
        .from('alumni')
        .getPublicUrl(`profile-pictures/${fileName}`);

      await supabase
        .from('alumni_profiles')
        .update({ 
          profile_picture_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      // Refresh the profile data instead of directly setting state
      refreshProfile();
      
      setSuccess('Profile picture updated successfully!');
    } catch (error: any) {
      console.error('Profile picture upload failed:', error);
      setError(error.message || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
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

      <Container className="relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8">
            <Star className="h-4 w-4" />
            <span className="font-semibold">Alumni Profile</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
            Welcome Back, <span className="text-green">{profile?.full_name || 'Alumni'}</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 overflow-hidden relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
              
              <div className="relative">
                {/* Profile Picture Section */}
                <div className="relative mb-8">
                  <div className="relative mx-auto w-48 h-48 group">
                    {profile?.profile_picture_url ? (
                      <img
                        src={profile.profile_picture_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-neutral-light/50 flex items-center justify-center border-4 border-white shadow-lg">
                        <User className="h-16 w-16 text-neutral-dark/30" />
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                      ) : (
                        <Upload className="h-8 w-8 text-white" />
                      )}
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </div>

                {/* Profile Info */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-neutral-dark mb-2">
                    {profile?.full_name || 'Your Name'}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-green mb-6">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">Class of {profile?.batch_year}</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  {[
                    { icon: Briefcase, text: profile?.occupation },
                    { icon: Building2, text: profile?.company },
                    { icon: MapPin, text: profile?.current_location },
                    { icon: Mail, text: profile?.email },
                    { icon: Phone, text: profile?.phone }
                  ].map((item, index) => (
                    item.text && (
                      <div key={index} className="flex items-center gap-3 text-neutral-dark/70 hover:text-green transition-colors">
                        <item.icon className="h-5 w-5" />
                        <span>{item.text}</span>
                      </div>
                    )
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-neutral-light">
                  <h3 className="text-lg font-semibold text-neutral-dark mb-4">Connect</h3>
                  <div className="flex items-center justify-center gap-4">
                    {profile?.linkedin_url && (
                      <a href={profile.linkedin_url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 rounded-full bg-neutral-light hover:bg-blue-50 text-neutral-dark hover:text-blue-600 transition-colors">
                        <LinkedinIcon className="h-6 w-6" />
                      </a>
                    )}
                    {profile?.facebook_url && (
                      <a href={profile.facebook_url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 rounded-full bg-neutral-light hover:bg-blue-50 text-neutral-dark hover:text-[#1877F2] transition-colors">
                        <FaFacebook className="h-6 w-6" />
                      </a>
                    )}
                    {profile?.instagram_url && (
                      <a href={profile.instagram_url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 rounded-full bg-neutral-light hover:bg-pink-50 text-neutral-dark hover:text-pink-600 transition-colors">
                        <FaInstagram className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 transition-colors border-2 border-red-500/20 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-8"
          >
            {/* Status Messages */}
            {(error || success) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  mb-8 p-4 rounded-xl border-2 flex items-center gap-3
                  ${error 
                    ? 'bg-red-50 text-red-600 border-red-200' 
                    : 'bg-green-50 text-green-600 border-green-200'
                  }
                `}
              >
                {error ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                {error || success}
              </motion.div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <section className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-dark">Basic Information</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={profile?.full_name || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Batch Year
                    </label>
                    <input
                      type="number"
                      name="batch_year"
                      value={profile?.batch_year || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={profile?.occupation || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={profile?.company || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Current Location
                    </label>
                    <input
                      type="text"
                      name="current_location"
                      value={profile?.current_location || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profile?.bio || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green min-h-[120px]"
                    />
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-dark">Contact Information</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile?.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile?.phone || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={profile?.linkedin_url || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      name="facebook_url"
                      value={profile?.facebook_url || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      name="instagram_url"
                      value={profile?.instagram_url || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 focus:ring-2 focus:ring-green/20 focus:border-green"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="show_contact_info"
                      checked={profile?.show_contact_info || false}
                      onChange={handleChange}
                      className="rounded border-neutral-dark/20 text-green focus:ring-green/20"
                    />
                    <label className="text-sm text-neutral-dark">
                      Show contact information to other alumni
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_public"
                      checked={profile?.is_public || false}
                      onChange={handleChange}
                      className="rounded border-neutral-dark/20 text-green focus:ring-green/20"
                    />
                    <label className="text-sm text-neutral-dark">
                      Make profile visible in alumni directory
                    </label>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={saving}
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
                <span className="relative font-medium text-lg flex items-center justify-center gap-2">
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Save Profile
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
