import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, User, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface AlumniProfile {
  id: string;
  full_name: string;
  batch_year: number;
  occupation: string;
  company: string;
  profile_picture_url?: string;
  testimonial: string;
}

interface FeaturedTestimonial {
  id: string;
  alumni_profile_id: string;
  is_visible: boolean;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<AlumniProfile[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<FeaturedTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all testimonials
      const { data: profilesData, error: profilesError } = await supabase
        .from('alumni_profiles')
        .select('*')
        .not('testimonial', 'is', null)
        .order('batch_year', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch featured testimonials
      const { data: featuredData, error: featuredError } = await supabase
        .from('featured_testimonials')
        .select('*');

      if (featuredError) throw featuredError;

      setTestimonials(profilesData || []);
      setFeaturedTestimonials(featuredData || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (profileId: string) => {
    try {
      setError('');
      const featured = featuredTestimonials.find(f => f.alumni_profile_id === profileId);

      if (featured) {
        // Update existing featured testimonial
        const { error } = await supabase
          .from('featured_testimonials')
          .update({ is_visible: !featured.is_visible })
          .eq('id', featured.id);

        if (error) throw error;
      } else {
        // Create new featured testimonial
        const { error } = await supabase
          .from('featured_testimonials')
          .insert({ alumni_profile_id: profileId, is_visible: true });

        if (error) throw error;
      }

      await fetchTestimonials();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      setError('Failed to update testimonial visibility');
    }
  };

  const removeTestimonial = async (profileId: string) => {
    try {
      setError('');

      // Delete from featured testimonials if exists
      const featured = featuredTestimonials.find(f => f.alumni_profile_id === profileId);
      if (featured) {
        const { error: deleteError } = await supabase
          .from('featured_testimonials')
          .delete()
          .eq('id', featured.id);

        if (deleteError) throw deleteError;
      }

      // Update alumni profile to remove testimonial
      const { error: updateError } = await supabase
        .from('alumni_profiles')
        .update({ testimonial: null, show_testimonial: false })
        .eq('id', profileId);

      if (updateError) throw updateError;

      setShowDeleteConfirm(null);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error removing testimonial:', error);
      setError('Failed to remove testimonial');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Testimonials</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {testimonials.map(profile => {
                const featured = featuredTestimonials.find(f => f.alumni_profile_id === profile.id);
                return (
                  <div
                    key={profile.id}
                    className="bg-white p-6 rounded-2xl shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        {profile.profile_picture_url ? (
                          <img
                            src={profile.profile_picture_url}
                            alt={profile.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl text-neutral-dark font-semibold">
                              {profile.full_name}
                            </h3>
                            <p className="text-primary">
                              Batch of {profile.batch_year}
                              {profile.occupation && ` • ${profile.occupation}`}
                              {profile.company && ` at ${profile.company}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleVisibility(profile.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                featured?.is_visible
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : 'bg-neutral-light text-neutral-dark/60 hover:bg-neutral-dark/10'
                              }`}
                            >
                              {featured?.is_visible ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(profile.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              <AlertTriangle className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <blockquote className="mt-4 text-neutral-dark/80 italic">
                          "{profile.testimonial}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-semibold">Remove Testimonial</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to remove this testimonial? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-6 py-2 bg-neutral-light text-neutral-dark rounded-lg hover:bg-neutral-dark/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => showDeleteConfirm && removeTestimonial(showDeleteConfirm)}
                className="px-6 py-2 bg-red-500 text-neutral-light rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}