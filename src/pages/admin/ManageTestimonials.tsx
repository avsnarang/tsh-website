import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';

interface FormData {
  name: string;
  batch: string;
  content: string;
  image_url: string;
  source_type: 'alumni' | 'student' | 'parent';
}

const initialFormData: FormData = {
  name: '',
  batch: '',
  content: '',
  image_url: '',
  source_type: 'student'
};

export default function ManageTestimonials(): JSX.Element {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async (): Promise<void> => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (isEditing && currentId) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            batch: formData.batch,
            content: formData.content,
            image_url: formData.image_url,
            source_type: formData.source_type
          })
          .eq('id', currentId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([{
            name: formData.name,
            batch: formData.batch,
            content: formData.content,
            image_url: formData.image_url,
            source_type: formData.source_type
          }]);

        if (error) throw error;
      }

      setFormData(initialFormData);
      setIsEditing(false);
      setCurrentId(null);
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial): void => {
    setFormData({
      name: testimonial.name,
      batch: testimonial.batch,
      content: testimonial.content,
      image_url: testimonial.image_url,
      source_type: testimonial.source_type
    });
    setIsEditing(true);
    setCurrentId(testimonial.id);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial');
    }
  };

  return (
    <div className="manage-testimonials">
      <h2>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="batch">Batch:</label>
          <input
            type="text"
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="source_type">Source Type:</label>
          <select
            id="source_type"
            name="source_type"
            value={formData.source_type}
            onChange={handleInputChange}
            required
          >
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">
          {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </form>

      <div className="testimonials-list">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-item">
            <h3>{testimonial.name}</h3>
            <p>{testimonial.content}</p>
            <div className="actions">
              <button onClick={() => handleEdit(testimonial)}>Edit</button>
              <button onClick={() => handleDelete(testimonial.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
