import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, User } from 'lucide-react';
import Container from '@/components/ui/Container';

interface Testimonial {
  id: string;
  name: string;
  class?: string;
  source_type: 'parent' | 'student';
  content: string;
  is_visible: boolean;
}

interface FormData {
  name: string;
  class: string;
  content: string;
  source_type: 'parent' | 'student';
}

const initialFormData: FormData = {
  name: '',
  class: '',
  content: '',
  source_type: 'student'
};

export default function ManageTestimonials(): JSX.Element {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentId) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            class: formData.class,
            content: formData.content,
            source_type: formData.source_type
          })
          .eq('id', currentId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([{
            name: formData.name,
            class: formData.class,
            content: formData.content,
            source_type: formData.source_type,
            is_visible: true
          }]);

        if (error) throw error;
      }

      setShowModal(false);
      setFormData(initialFormData);
      setIsEditing(false);
      setCurrentId(null);
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save testimonial');
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_visible: !currentVisibility })
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update visibility');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add New Testimonial
            </button>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Testimonials</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl text-neutral-dark font-semibold">
                        {testimonial.name}
                      </h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {testimonial.source_type}
                      </span>
                    </div>
                    {testimonial.class && (
                      <p className="text-primary mb-2">Class: {testimonial.class}</p>
                    )}
                    <p className="text-neutral-dark/60">{testimonial.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleVisibility(testimonial.id, testimonial.is_visible)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        testimonial.is_visible
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {testimonial.is_visible ? 'Visible' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => {
                        setFormData({
                          name: testimonial.name,
                          class: testimonial.class || '',
                          content: testimonial.content,
                          source_type: testimonial.source_type
                        });
                        setCurrentId(testimonial.id);
                        setIsEditing(true);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl text-neutral-dark font-semibold mb-6">
              {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-dark font-medium mb-2">
                  Source Type
                </label>
                <select
                  value={formData.source_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_type: e.target.value as 'parent' | 'student' }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-dark font-medium mb-2">
                  {formData.source_type === 'parent' ? "Parent's Name" : "Student's Name"}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark font-medium mb-2">
                  {formData.source_type === 'parent' ? "Student's Class" : 'Class'}
                </label>
                <input
                  type="text"
                  value={formData.class}
                  onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark font-medium mb-2">
                  Testimonial Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData(initialFormData);
                    setIsEditing(false);
                    setCurrentId(null);
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {isEditing ? 'Update' : 'Add'} Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
