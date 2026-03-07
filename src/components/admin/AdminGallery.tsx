'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, AlertTriangle, Calendar, MapPin, X, Star, ArrowLeft } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FileUploader from '../ui/FileUploader';

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
}

interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  campus: string;
  primary_image_url?: string;
  gallery_images: GalleryImage[];
}

interface FormData {
  title: string;
  description: string;
  date: string;
  campus: string;
  primaryImageUrl: string;
  images: { url: string; caption: string; }[];
}

export default function AdminGallery() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<GalleryEvent | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    campus: '',
    primaryImageUrl: '',
    images: []
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (showEventForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure we restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEventForm]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('gallery_events')
        .select(`
          id,
          title,
          date,
          description,
          campus,
          primary_image_url,
          gallery_images!eventID(
            id,
            image_url,
            caption
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');

      if (!formData.primaryImageUrl.trim()) {
        setError('Primary image URL is required');
        return;
      }

      if (editingEvent) {
        const { error: eventError } = await supabase
          .from('gallery_events')
          .update({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            campus: formData.campus,
            primary_image_url: formData.primaryImageUrl
          })
          .eq('id', editingEvent.id);

        if (eventError) throw eventError;

        const { error: deleteError } = await supabase
          .from('gallery_images')
          .delete()
          .eq('eventID', editingEvent.id);

        if (deleteError) throw deleteError;

        if (formData.images.length > 0) {
          const { error: imagesError } = await supabase
            .from('gallery_images')
            .insert(
              formData.images.map(img => ({
                eventID: editingEvent.id,
                image_url: img.url,
                caption: img.caption
              }))
            );

          if (imagesError) throw imagesError;
        }
      } else {
        const { data: eventData, error: eventError } = await supabase
          .from('gallery_events')
          .insert({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            campus: formData.campus,
            primary_image_url: formData.primaryImageUrl
          })
          .select()
          .single();

        if (eventError) throw eventError;

        if (formData.images.length > 0) {
          const { error: imagesError } = await supabase
            .from('gallery_images')
            .insert(
              formData.images.map(img => ({
                eventID: eventData.id,
                image_url: img.url,
                caption: img.caption
              }))
            );

          if (imagesError) throw imagesError;
        }
      }

      await fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event');
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      setError('');
      
      // First, delete all gallery images associated with this event
      const { error: imagesError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('eventID', eventId);
      
      if (imagesError) {
        console.error('Error deleting images:', imagesError);
        throw imagesError;
      }
      
      // Then delete the event itself
      const { error: eventError } = await supabase
        .from('gallery_events')
        .delete()
        .eq('id', eventId);

      if (eventError) throw eventError;

      setShowDeleteConfirm(null);
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      campus: '',
      primaryImageUrl: '',
      images: []
    });
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const updateImageField = (index: number, field: 'url' | 'caption', value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const uploadGalleryImages = useCallback(async (files: File[]): Promise<string[]> => {
    setUploading(true);
    try {
      const allUrls: string[] = [];

      for (const file of files) {
        const body = new FormData();
        body.append('images', file);

        const res = await fetch('/api/upload-gallery-image', { method: 'POST', body });
        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: `Upload failed for ${file.name}` }));
          throw new Error(data.error || 'Upload failed');
        }
        const data = await res.json();
        allUrls.push(...(data.urls as string[]));
      }

      return allUrls;
    } finally {
      setUploading(false);
    }
  }, []);

  const handlePrimaryImageUpload = useCallback(async (files: File[]): Promise<string[]> => {
    const urls = await uploadGalleryImages(files);
    if (urls.length > 0) {
      setFormData(prev => ({ ...prev, primaryImageUrl: urls[0] }));
    }
    return urls;
  }, [uploadGalleryImages]);

  const handleAdditionalImagesUpload = useCallback(async (files: File[]): Promise<string[]> => {
    const urls = await uploadGalleryImages(files);
    if (urls.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls.map(url => ({ url, caption: '' }))]
      }));
    }
    return urls;
  }, [uploadGalleryImages]);

  const safeRemoveImage = (index: number) => {
    console.log('Attempting to remove image at index:', index);
    
    const currentImages = [...formData.images];
    
    const newImages = currentImages.filter((_, i) => i !== index);
    
    console.log('New images array length:', newImages.length);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  return (
    <Container className="relative z-20 min-h-screen pb-24">
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

      <div className="relative">
        {/* Header Section */}
        <ScrollReveal>
          <div className="text-center mb-12">
            {/* Add Back Button */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </Link>
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
              >
                <Star className="h-4 w-4" />
                <span className="font-semibold">Gallery Management</span>
              </motion.div>
            </div>
            
            <TextReveal>
              <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                Manage <span className="text-green">School Events</span> Gallery
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                Add and manage photo galleries for school events and activities
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Add Event Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex justify-end"
        >
          <button
            onClick={() => setShowEventForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Event</span>
          </button>
        </motion.div>
      </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <ScrollReveal>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 rounded-xl p-8 z-10"
            >
              {events.map((event) => (
                <div key={event.id} className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-display text-neutral-dark mb-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 text-neutral-dark/70">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.campus}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingEvent(event);
                              setFormData({
                                title: event.title,
                                description: event.description,
                                date: event.date,
                                campus: event.campus,
                                primaryImageUrl: event.primary_image_url || '',
                                images: event.gallery_images.map(img => ({
                                  url: img.image_url,
                                  caption: img.caption
                                }))
                              });
                              setShowEventForm(true);
                            }}
                            className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(event.id)}
                            className="p-2 text-neutral-dark/70 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-neutral-dark/70 mb-6">{event.description}</p>

                      {/* Gallery Preview */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {event.gallery_images.slice(0, 5).map((image, index) => (
                          <div
                            key={image.id}
                            className={`relative aspect-square rounded-xl overflow-hidden ${
                              index === 4 && event.gallery_images.length > 5 ? 'relative' : ''
                            }`}
                          >
                            <img
                              src={image.image_url}
                              alt={image.caption}
                              className="w-full h-full object-cover"
                            />
                            {index === 4 && event.gallery_images.length > 5 && (
                              <div className="absolute inset-0 bg-neutral-dark/70 flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                  +{event.gallery_images.length - 5}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </ScrollReveal>

        {/* Event Form Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-100 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl"
            >
              <div className="p-8 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-8 sticky top-0 bg-white z-10">
                  <h2 className="text-2xl font-display text-neutral-dark">
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-dark mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-hidden focus:ring-2 focus:ring-primary h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Campus</label>
                <select
                  value={formData.campus}
                  onChange={(e) => setFormData(prev => ({ ...prev, campus: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Campus</option>
                  <option value="Paonta Sahib">Paonta Sahib</option>
                  <option value="Juniors">Juniors</option>
                  <option value="Majra">Majra</option>
                </select>
              </div>

              {/* Primary Image Section */}
              <div className="border border-primary rounded-lg p-4 bg-primary-light/10">
                <h3 className="text-lg font-semibold text-primary mb-4">Primary Image <span className="text-red-500">*</span></h3>

                {formData.primaryImageUrl ? (
                  <div>
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-neutral-dark/20 mb-3">
                      <img
                        src={formData.primaryImageUrl}
                        alt="Primary image preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, primaryImageUrl: '' }))}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-dark/50 truncate">{formData.primaryImageUrl}</p>
                  </div>
                ) : (
                  <FileUploader
                    label="Upload primary image"
                    description="JPEG, PNG, or WebP up to 10MB"
                    accept="image/*"
                    maxSize={10 * 1024 * 1024}
                    maxFiles={1}
                    multiple={false}
                    onUpload={handlePrimaryImageUpload}
                    disabled={uploading}
                  />
                )}
              </div>
              
              {/* Additional Images Section */}
              <div className="border border-neutral-dark/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Additional Images</h3>

                <FileUploader
                  label="Upload additional images"
                  description="JPEG, PNG, or WebP up to 10MB each. You can select multiple files."
                  accept="image/*"
                  maxSize={10 * 1024 * 1024}
                  maxFiles={999}
                  multiple={true}
                  onUpload={handleAdditionalImagesUpload}
                  disabled={uploading}
                />

                {formData.images.length > 0 ? (
                  <div>
                    <p className="text-sm text-neutral-dark/70 mt-4 mb-2">{formData.images.length} image(s) added</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square group">
                          <img
                            src={image.url}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border border-neutral-dark/20"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-neutral-dark/60 text-neutral-light p-1 text-xs truncate">
                            {image.caption || 'No caption'}
                          </div>

                          <div className="absolute inset-0 bg-neutral-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newCaption = window.prompt('Enter caption for this image:', image.caption);
                                if (newCaption !== null) {
                                  updateImageField(index, 'caption', newCaption);
                                }
                              }}
                              className="p-1.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                              title="Edit Caption"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                safeRemoveImage(index);
                              }}
                              className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              title="Remove Image"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-dark/50 italic text-center py-4 mt-4">No additional images added yet.</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-neutral-light text-neutral-dark rounded-lg hover:bg-neutral-dark/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-primary text-neutral-light rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>  
          </div>
        </motion.div>
      </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-100 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
          >
            <h3 className="text-xl font-display text-neutral-dark mb-4">
              Confirm Deletion
            </h3>
            <p className="text-neutral-dark/70 mb-8">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-6 py-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Container>
  );
};
