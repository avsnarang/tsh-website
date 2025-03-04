import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, Calendar, MapPin, X } from 'lucide-react';

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
  const [bulkImageUrls, setBulkImageUrls] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const handleBulkImageImport = () => {
    if (!bulkImageUrls.trim()) return;
    
    const urls = bulkImageUrls.split(',').map(url => url.trim()).filter(url => url);
    
    const newImages = urls.map(url => ({ url, caption: '' }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    setBulkImageUrls('');
  };

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
            <button
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-neutral-light rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add New Event
            </button>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Gallery</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {events.map(event => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-neutral-dark font-semibold">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 text-primary mt-2">
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
                        className="p-2 bg-primary-light/20 text-primary rounded-lg hover:bg-primary-light/40 transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(event.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <AlertTriangle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-neutral-dark/80 mb-4">{event.description}</p>
                  <div className="relative grid grid-cols-5 gap-2">
                    {event.gallery_images.slice(0, 5).map((image: GalleryImage, index: number) => (
                      <div 
                        key={image.id} 
                        className={`relative aspect-square rounded-lg overflow-hidden ${index === 4 && event.gallery_images.length > 5 ? 'relative' : ''}`}
                      >
                        <img
                          src={image.image_url}
                          alt={image.caption}
                          className="w-full h-full object-cover"
                        />
                        {index === 4 && event.gallery_images.length > 5 && (
                          <div className="absolute inset-0 bg-neutral-dark/70 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">+{event.gallery_images.length - 5}</span>
                          </div>
                        )}
                        {image.caption && index < 4 && (
                          <div className="absolute inset-x-0 bottom-0 bg-neutral-dark/60 text-neutral-light p-1 text-xs">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                    {event.gallery_images.length === 0 && (
                      <div className="col-span-5 text-center py-4 text-neutral-dark/50 italic">
                        No images available
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-dark mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Campus</label>
                <select
                  value={formData.campus}
                  onChange={(e) => setFormData(prev => ({ ...prev, campus: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
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
                <h3 className="text-lg font-semibold text-primary mb-4">Primary Image</h3>
                <div>
                  <label className="block text-neutral-dark mb-2">Primary Image URL <span className="text-red-500">*</span></label>
                  <input
                    type="url"
                    value={formData.primaryImageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryImageUrl: e.target.value }))}
                    placeholder="https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                {formData.primaryImageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-neutral-dark/70 mb-2">Image Preview:</p>
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-neutral-dark/20">
                      <img 
                        src={formData.primaryImageUrl} 
                        alt="Primary image preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Additional Images Section */}
              <div className="border border-neutral-dark/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Additional Images</h3>
                
                <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                  <label className="block text-neutral-dark mb-2">
                    Bulk Add Images (comma-separated URLs)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={bulkImageUrls}
                      onChange={(e) => setBulkImageUrls(e.target.value)}
                      placeholder="url1, url2, url3, ..."
                      className="flex-1 px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleBulkImageImport}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
                    >
                      Add All
                    </button>
                  </div>
                </div>
                
                {formData.images.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square group">
                          <img 
                            src={image.url} 
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border border-neutral-dark/20"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Invalid+Image';
                            }}
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
                  <p className="text-neutral-dark/50 italic text-center py-4">No additional images added yet.</p>
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
                  className="px-6 py-2 bg-primary text-neutral-light rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
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
              <h2 className="text-2xl font-semibold">Delete Event</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to delete this event? This action cannot be undone.
              All associated images will also be removed.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-6 py-2 bg-neutral-light text-neutral-dark rounded-lg hover:bg-neutral-dark/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="px-6 py-2 bg-red-500 text-neutral-light rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
