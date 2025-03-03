import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, User, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

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
  const { showToast } = useToast();

  const fetchTestimonials = useCallback(async () => {
    try {
      const { data: alumniData, error: alumniError } = await supabase
        .from('alumni_profiles')
        .select('*, featured_testimonials(*)')
        .not('testimonial', 'is', null)
        .order('batch_year', { ascending: false });

      if (alumniError) throw alumniError;
      
      const { data: featuredData, error: featuredError } = await supabase
        .from('featured_testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (featuredError) throw featuredError;

      setTestimonials(alumniData || []);
      setFeaturedTestimonials(featuredData || []);
    } catch (err) {
      setError('Failed to fetch testimonials');
      showToast('Error loading testimonials', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const toggleVisibility = useCallback(async (testimonialId: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('featured_testimonials')
        .update({ is_visible: !currentVisibility })
        .eq('id', testimonialId);

      if (error) throw error;

      setFeaturedTestimonials(prev => 
        prev.map(t => 
          t.id === testimonialId 
            ? { ...t, is_visible: !currentVisibility }
            : t
        )
      );

      showToast(
        `Testimonial ${currentVisibility ? 'hidden' : 'visible'} successfully`,
        'success'
      );
    } catch (err) {
      showToast('Failed to update visibility', 'error');
    }
  }, [showToast]);

  const deleteTestimonial = useCallback(async (testimonialId: string) => {
    try {
      const { error } = await supabase
        .from('featured_testimonials')
        .delete()
        .eq('id', testimonialId);

      if (error) throw error;

      setFeaturedTestimonials(prev => 
        prev.filter(t => t.id !== testimonialId)
      );
      setShowDeleteConfirm(null);
      showToast('Testimonial deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete testimonial', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </Container>
    );
  }

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
