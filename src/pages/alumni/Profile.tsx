import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Profile as ProfileType } from '../../types/campus';
import { Upload, X, User, CheckCircle, Phone, Mail, Instagram, Facebook, Trash2, AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<ProfileType>({
    full_name: '',
    batch_year: new Date().getFullYear(),
    current_location: '',
    occupation: '',
    company: '',
    bio: '',
    linkedin_url: '',
    is_public: false,
    profile_picture_url: '',
    phone: '',
    email: '',
    instagram_url: '',
    facebook_url: '',
    show_contact_info: false,
    testimonial: '',
    show_testimonial: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/alumni/login');
      return;
    }

    const checkUserRole = async () => {
      try {
        // Check if user is a management user
        const { data: managementData } = await supabase
          .from('management_users')
          .select('id')
          .eq('id', user.id)
          .single();

        // If user is a management user, redirect to management dashboard
        if (managementData) {
          navigate('/management/dashboard');
          return;
        }

        // Proceed with fetching alumni profile
        const fetchProfile = async () => {
          try {
            // First check if profile exists
            const { data, error: selectError } = await supabase
              .from('alumni_profiles')
              .select('*')
              .eq('id', user.id)
              .maybeSingle();

            if (selectError) throw selectError;
            
            if (!data) {
              // Profile doesn't exist, create it
              const { error: insertError } = await supabase
                .from('alumni_profiles')
                .insert({
                  id: user.id,
                  full_name: '',
                  batch_year: new Date().getFullYear(),
                  is_public: false,
                  show_testimonial: true,
                  show_contact_info: false
                });

              if (insertError) throw insertError;
            } else {
              // Profile exists, update state with data
              setProfile({
                ...profile,
                ...data,
                full_name: data.full_name || '',
                current_location: data.current_location || '',
                occupation: data.occupation || '',
                company: data.company || '',
                bio: data.bio || '',
                linkedin_url: data.linkedin_url || '',
                profile_picture_url: data.profile_picture_url || '',
                phone: data.phone || '',
                email: data.email || '',
                instagram_url: data.instagram_url || '',
                facebook_url: data.facebook_url || '',
                testimonial: data.testimonial || '',
                show_testimonial: data.show_testimonial !== false
              });
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load profile');
          }
        };

        await fetchProfile();
      } catch (error) {
        console.error('Error checking user role:', error);
        setError('Failed to verify user role');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user, navigate]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      const { error } = await supabase
        .from('alumni_profiles')
        .upsert({ id: user.id, ...profile });

      if (error) throw error;
      setSuccess('Profile saved successfully!');
      // Scroll to top
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDeleteProfile = async () => {
    if (!user) return;

    try {
      setError('');
      setSuccess('');

      // Delete profile picture from storage if exists
      if (profile.profile_picture_url) {
        const filePath = profile.profile_picture_url.split('/').pop();
        if (filePath) {
          await supabase.storage
            .from('alumni')
            .remove([`profile-pictures/${filePath}`]);
        }
      }

      // Delete profile from database
      const { error } = await supabase
        .from('alumni_profiles')
        .delete()
        .eq('id', user.id);

      if (error) throw error;

      // Sign out the user
      await signOut();
      navigate('/alumni');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError('');
      setSuccess('');

      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `profile-pictures/${fileName}`;

      // Delete existing profile picture if any
      if (profile.profile_picture_url) {
        const oldFilePath = profile.profile_picture_url.split('/').pop();
        if (oldFilePath) {
          await supabase.storage
            .from('alumni')
            .remove([`profile-pictures/${oldFilePath}`]);
        }
      }

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('alumni')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('alumni')
        .getPublicUrl(filePath);

      // Update profile with new picture URL
      const { error: updateError } = await supabase
        .from('alumni_profiles')
        .update({ profile_picture_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, profile_picture_url: publicUrl }));
      setSuccess('Profile picture updated successfully!');
      // Scroll to top
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePicture = async () => {
    try {
      setUploading(true);
      setError('');
      setSuccess('');

      // Delete the file from storage
      if (profile.profile_picture_url) {
        const filePath = profile.profile_picture_url.split('/').pop();
        if (filePath) {
          await supabase.storage
            .from('alumni')
            .remove([`profile-pictures/${filePath}`]);
        }
      }

      // Update profile to remove picture URL
      const { error: updateError } = await supabase
        .from('alumni_profiles')
        .update({ profile_picture_url: null })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, profile_picture_url: '' }));
      setSuccess('Profile picture removed successfully!');
      // Scroll to top
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error removing profile picture:', error);
      setError('Failed to remove profile picture');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24" ref={containerRef}>
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-neutral-dark">My Profile</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-2 bg-red-500 text-neutral-light rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Profile
              </button>
              <button
                onClick={() => signOut()}
                className="px-6 py-2 bg-neutral-dark text-neutral-light rounded-lg hover:bg-neutral-dark/80 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {profile.profile_picture_url ? (
                  <div className="relative w-32 h-32">
                    <img
                      src={profile.profile_picture_url}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePicture}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-primary" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-4 py-2 bg-primary text-neutral-light rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Upload Picture'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-neutral-dark mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-dark mb-2">Batch Year</label>
              <input
                type="number"
                name="batch_year"
                value={profile.batch_year}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-dark mb-2">Current Location</label>
              <input
                type="text"
                name="current_location"
                value={profile.current_location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-neutral-dark mb-2">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-neutral-dark mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={profile.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-neutral-dark mb-2">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
              />
            </div>

            <div className="space-y-6 border-t border-neutral-dark/10 pt-6">
              <h3 className="text-lg font-semibold text-neutral-dark">School Testimonial</h3>
              <p className="text-neutral-dark/80">
                Share your experience at The Scholars' Home. Your testimonial may be featured on our website.
              </p>
              <textarea
                name="testimonial"
                value={profile.testimonial}
                onChange={handleChange}
                placeholder="Share how The Scholars' Home has impacted your life and career..."
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="show_testimonial"
                  checked={profile.show_testimonial}
                  onChange={handleChange}
                  className="rounded border-neutral-dark/20 text-primary focus:ring-primary"
                />
                <label className="text-neutral-dark">Allow my testimonial to be featured on the homepage</label>
              </div>
            </div>

            <div className="space-y-6 border-t border-neutral-dark/10 pt-6">
              <h3 className="text-lg font-semibold text-neutral-dark">Contact Information</h3>
              
              <div>
                <label className="block text-neutral-dark mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Instagram Profile URL</label>
                <input
                  type="url"
                  name="instagram_url"
                  value={profile.instagram_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Facebook Profile URL</label>
                <input
                  type="url"
                  name="facebook_url"
                  value={profile.facebook_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://facebook.com/username"
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">LinkedIn Profile URL</label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={profile.linkedin_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-neutral-dark/10 pt-6">
              <h3 className="text-lg font-semibold text-neutral-dark">Privacy Settings</h3>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_public"
                  checked={profile.is_public}
                  onChange={handleChange}
                  className="rounded border-neutral-dark/20 text-primary focus:ring-primary"
                />
                <label className="text-neutral-dark">Make profile public</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="show_contact_info"
                  checked={profile.show_contact_info}
                  onChange={handleChange}
                  className="rounded border-neutral-dark/20 text-primary focus:ring-primary"
                />
                <label className="text-neutral-dark">Show contact information to other alumni</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full bg-primary text-neutral-light py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </Container>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-semibold">Delete Profile</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to delete your profile? This action cannot be undone.
              All your data, including profile picture and testimonials, will be permanently removed.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 bg-neutral-light text-neutral-dark rounded-lg hover:bg-neutral-dark/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="px-6 py-2 bg-red-500 text-neutral-light rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}