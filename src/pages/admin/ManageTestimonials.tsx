import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, User, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';

interface Testimonial {
  id: string;
  name: string;
  batch: string;
  content: string;
  image_url?: string;
  source_type?: string;
}

export default function ManageTestimonials() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    content: '',
    image_url: ''
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

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      batch: testimonial.batch,
      content: testimonial.content,
      image_url: testimonial.image_url || ''
    });
    setShowForm(true);
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
    <Container>
      <div className="pt-32 pb-24">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-neutral-dark">Manage Testimonials</h1>
          <Button
            onClick={() => setShowForm(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="space-y-6">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl text-neutral-dark font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-primary">Batch of {testimonial.batch}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(testimonial)}
                      variant="edit"
                      className="flex items-center gap-2"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(testimonial.id)}
                      variant="delete"
                      className="flex items-center gap-2"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-neutral-dark/80">{testimonial.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-neutral-dark">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingTestimonial(null);
                    setFormData({ name: '', batch: '', content: '', image_url: '' });
                  }}
                  className="text-neutral-dark/60 hover:text-neutral-dark transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-neutral-dark mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-dark mb-2">Batch Year</label>
                  <input
                    type="text"
                    value={formData.batch}
                    onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
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

                <div>
                  <label className="block text-neutral-dark mb-2">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTestimonial(null);
                      setFormData({ name: '', batch: '', content: '', image_url: '' });
                    }}
                    variant="outline2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
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
                  variant="outline2"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                  variant="delete"
                >
                  Delete Testimonial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
