import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, Calendar, MapPin, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

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
  primary_image_id?: string;
  gallery_images: GalleryImage[];
}

interface FormData {
  title: string;
  description: string;
  date: string;
  campus: string;
  primary_image_id: string;
  primary_image_url: string;
  images: { url: string; caption: string; }[];
}

export default function ManageGallery() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<GalleryEvent | null>(null);
  const [bulkUrls, setBulkUrls] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    campus: '',
    primary_image_id: '',
    primary_image_url: '',
    images: [{ url: '', caption: '' }]
  });

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', caption: '' }]
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      campus: '',
      primary_image_id: '',
      primary_image_url: '',
      images: [{ url: '', caption: '' }]
    });
    setEditingEvent(null);
    setShowEventForm(false);
    setBulkUrls('');
    setError('');
  };

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }

    const checkManagementAccess = async () => {
      try {
        const { data, error } = await supabase
          .from('management_users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (error || !data) {
          navigate('/admin/login');
          return;
        }

        fetchEvents();
      } catch (error) {
        console.error('Error checking management access:', error);
        navigate('/admin/login');
      }
    };

    checkManagementAccess();
  }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('gallery_events')
        .select(`
          id,
          title,
          description,
          date,
          campus,
          primary_image_id,
          gallery_images (
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

      if (editingEvent) {
        const { error: eventError } = await supabase
          .from('gallery_events')
          .update({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            campus: formData.campus,
            primary_image_id: formData.primary_image_id || null,
            primary_image_url: formData.primary_image_url || null
          })
          .eq('id', editingEvent.id);

        if (eventError) throw eventError;

        const { error: deleteError } = await supabase
          .from('gallery_images')
          .delete()
          .eq('event_id', editingEvent.id);

        if (deleteError) throw deleteError;

        const { error: imagesError } = await supabase
          .from('gallery_images')
          .insert(
            formData.images.map(img => ({
              event_id: editingEvent.id,
              image_url: img.url,
              caption: img.caption
            }))
          );

        if (imagesError) throw imagesError;
      } else {
        const { data: eventData, error: eventError } = await supabase
          .from('gallery_events')
          .insert({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            campus: formData.campus,
            primary_image_id: null,
            primary_image_url: formData.primary_image_url || null
          })
          .select()
          .single();

        if (eventError) throw eventError;

        const { error: imagesError } = await supabase
          .from('gallery_images')
          .insert(
            formData.images.map(img => ({
              event_id: eventData.id,
              image_url: img.url,
              caption: img.caption
            }))
          );

        if (imagesError) throw imagesError;

        if (formData.primary_image_id) {
          const { data: images } = await supabase
            .from('gallery_images')
            .select('id')
            .eq('event_id', eventData.id)
            .order('created_at', { ascending: true });

          if (images && images.length > 0) {
            const primaryIndex = parseInt(formData.primary_image_id);
            const primaryImage = images[primaryIndex];
            
            if (primaryImage) {
              const { error: updateError } = await supabase
                .from('gallery_events')
                .update({ primary_image_id: primaryImage.id })
                .eq('id', eventData.id);

              if (updateError) throw updateError;
            }
          }
        }
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event');
    }
  };

  const handlePrimaryImageChange = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      primary_image_id: prev.primary_image_id === imageId ? '' : imageId
    }));
  };

  const handleDelete = async (eventId: string) => {
    try {
      setError('');

      const { error } = await supabase
        .from('gallery_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setShowDeleteConfirm(null);
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  const updateImageField = (index: number, field: 'url' | 'caption', value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const handleEdit = (event: GalleryEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      campus: event.campus,
      primary_image_id: event.primary_image_id || '',
      primary_image_url: '',
      images: event.gallery_images.map(img => ({
        url: img.image_url,
        caption: img.caption
      }))
    });
    setShowEventForm(true);
  };

  const handleBulkUrlsPaste = () => {
    if (!bulkUrls.trim()) return;

    const urls = bulkUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

    if (urls.length === 0) {
      setError('No valid URLs found in the input');
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: urls.map(url => ({ url, caption: '' }))
    }));

    setBulkUrls('');
    setError('');
  };

  return (
    <div className="pt-32 pb-24">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-neutral-dark">Manage Gallery</h1>
          <Button
            onClick={() => setShowEventForm(true)}
            variant="cta"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Event
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
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.campus}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(event)}
                      variant="edit"
                      className="flex items-center gap-2"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(event.id)}
                      variant="delete"
                      className="flex items-center gap-2"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-neutral-dark/80 mb-4">{event.description}</p>
                <div className="flex gap-4">
                  {event.gallery_images.slice(0, 3).map(image => (
                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image.image_url}
                        alt={image.caption || event.title}
                        className="w-14 h-14 object-cover"
                      />
                      {event.primary_image_id === image.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="text-xs text-white font-medium">Primary</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {showEventForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-neutral-dark">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-neutral-dark/60 hover:text-neutral-dark transition-colors"
                >
                  <X className="h-6 w-6" />
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

                <div className="space-y-6">
                  <div className="space-y-4 p-4 bg-neutral-light/50 rounded-xl">
                    <h4 className="text-lg font-semibold text-neutral-dark">Bulk Add Images</h4>
                    <p className="text-sm text-neutral-dark/80">
                      Paste image URLs separated by commas. Each URL should be a direct link to an image.
                    </p>
                    <div className="space-y-2">
                      <textarea
                        value={bulkUrls}
                        onChange={(e) => setBulkUrls(e.target.value)}
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg, ..."
                        className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        onClick={handleBulkUrlsPaste}
                        variant="edit"
                        className="w-full"
                      >
                        Add Images from URLs
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="text-neutral-dark">Images</label>
                    <Button
                      type="button"
                      onClick={addImageField}
                      variant="edit"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Image
                    </Button>
                  </div>

                {formData.images.map((image, index) => (
                  <div key={index} className="space-y-4 p-4 bg-neutral-light rounded-lg">
                    <div>
                      <label className="block text-neutral-dark mb-2">Image URL</label>
                      <div className="flex gap-4">
                        <input
                          type="url"
                          value={image.url}
                          onChange={(e) => updateImageField(index, 'url', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="flex-grow px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                          onBlur={(e) => {
                            const url = e.target.value.trim();
                            if (url && !url.match(/^https?:\/\/.+/)) {
                              setError('Please enter a valid URL starting with http:// or https://');
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => handlePrimaryImageChange(index.toString())}
                          variant={formData.primary_image_id === index.toString() ? 'cta' : 'outline'}
                          className="shrink-0"
                        >
                          {formData.primary_image_id === index.toString() ? 'Primary Image' : 'Set as Primary'}
                        </Button>
                      </div>
                      {image.url && (
                        <img src={image.url} alt="" className="mt-2 w-14 h-14 object-cover rounded" />
                      )}
                    </div>
                    <div>
                      <label className="block text-neutral-dark mb-2">Caption</label>
                      <input
                        type="text"
                        value={image.caption}
                        onChange={(e) => updateImageField(index, 'caption', e.target.value)}
                        placeholder="Enter a description for this image"
                        className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeImageField(index)}
                        variant="delete"
                      >
                        Remove Image
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline2"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update Event' : 'Create Event'}
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
              <h2 className="text-2xl font-semibold">Delete Event</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to delete this event? This action cannot be undone.
              All associated images will also be removed.
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
                Delete Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
