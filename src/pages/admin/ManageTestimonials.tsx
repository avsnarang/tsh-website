import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, User, Eye, EyeOff, AlertTriangle, Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

interface Testimonial {
  id: string;
  source_type: 'parent' | 'student' | 'alumni';
  author_name: string;
  student_name?: string;
  class?: string;
  content: string;
  profile_picture_url?: string;
  is_visible: boolean;
}

export default function ManageTestimonials() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id' | 'is_visible'>>({
    source_type: 'parent',
    author_name: '',
    student_name: '',
    class: '',
    content: '',
    profile_picture_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchTestimonials();
  }, [user, navigate]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string) => {
    try {
      setError('');
      const testimonial = testimonials.find(t => t.id === id);
      if (!testimonial) return;

      const { error } = await supabase
        .from('testimonials')
        .update({ is_visible: !testimonial.is_visible })
        .eq('id', id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      setError('Failed to update testimonial visibility');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError('');
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setShowDeleteConfirm(null);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setError('Failed to delete testimonial');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      
      const { error } = await supabase
        .from('testimonials')
        .insert([{ ...formData, is_visible: true }]);

      if (error) throw error;

      setSuccess('Testimonial created successfully!');
      setShowCreateForm(false);
      setFormData({
        source_type: 'parent',
        author_name: '',
        student_name: '',
        class: '',
        content: '',
        profile_picture_url: ''
      });
      await fetchTestimonials();
    } catch (error) {
      console.error('Error creating testimonial:', error);
      setError('Failed to create testimonial');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Testimonial
            </Button>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Testimonials</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      {testimonial.profile_picture_url ? (
                        <img
                          src={testimonial.profile_picture_url}
                          alt={testimonial.author_name}
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
                            {testimonial.author_name}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-primary">
                              {testimonial.source_type.charAt(0).toUpperCase() + testimonial.source_type.slice(1)}
                            </p>
                            {testimonial.source_type === 'parent' && testimonial.student_name && (
                              <p className="text-neutral-dark/80">
                                Parent of {testimonial.student_name}
                                {testimonial.class && ` (${testimonial.class})`}
                              </p>
                            )}
                            {testimonial.source_type === 'student' && testimonial.class && (
                              <p className="text-neutral-dark/80">
                                Class: {testimonial.class}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleVisibility(testimonial.id)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              testimonial.is_visible
                                ? 'bg-primary text-white hover:bg-primary-dark'
                                : 'bg-neutral-light text-neutral-dark hover:bg-neutral-dark/10'
                            }`}
                          >
                            {testimonial.is_visible ? (
                              <>
                                <Eye className="h-5 w-5" />
                                Visible
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-5 w-5" />
                                Hidden
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(testimonial.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <AlertTriangle className="h-5 w-5" />
                            Delete
                          </button>
                        </div>
                      </div>
                      <blockquote className="mt-4 text-neutral-dark/80 italic">
                        "{testimonial.content}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Create Testimonial Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">Create Testimonial</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-dark mb-2">Testimonial Source</label>
                <select
                  value={formData.source_type}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    source_type: e.target.value as 'parent' | 'student' | 'alumni',
                    // Reset related fields
                    student_name: e.target.value === 'parent' ? '' : undefined,
                    class: ['parent', 'student'].includes(e.target.value) ? '' : undefined
                  }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Author Name</label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {formData.source_type === 'parent' && (
                <div>
                  <label className="block text-neutral-dark mb-2">Student Name</label>
                  <input
                    type="text"
                    value={formData.student_name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, student_name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              )}

              {(formData.source_type === 'parent' || formData.source_type === 'student') && (
                <div>
                  <label className="block text-neutral-dark mb-2">Class</label>
                  <input
                    type="text"
                    value={formData.class || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-neutral-dark mb-2">Profile Picture URL (Optional)</label>
                <input
                  type="url"
                  value={formData.profile_picture_url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, profile_picture_url: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Testimonial</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Testimonial
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-semibold">Delete Testimonial</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Testimonial
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}