import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';

interface Message {
  id: string;
  name: string;
  role: string;
  preview: string;
  full_message: string;
  photo_url?: string;
  display_locations: string[];
  campus: string;
  order: number;
  published: boolean;
}

interface FormData {
  name: string;
  role: string;
  preview: string;
  full_message: string;
  photo_url: string; // Initialize with empty string, not undefined
  display_locations: string[];
  campus: string;
  order: number;
  published: boolean;
}

const DISPLAY_LOCATIONS = {
  all: 'All Pages',
  homepage: 'Homepage',
  leadership: 'Leadership Messages',
  'paonta-sahib': 'Paonta Sahib Campus',
  juniors: 'Juniors Campus',
  majra: 'Majra Campus'
};

const validateImageUrl = (url: string): boolean => {
  if (!url) return true; // Allow empty URLs
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ManageMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const initialFormData: FormData = {
    name: '',
    role: '',
    preview: '',
    full_message: '',
    photo_url: '', // Initialize with empty string
    display_locations: [],
    campus: '',
    order: 0,
    published: false
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('leadership_messages')
        .select('*')
        .order('order');

      if (fetchError) throw fetchError;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleEdit = (message: Message) => {
    setFormData({
      name: message.name || '',
      role: message.role || '',
      preview: message.preview || '',
      full_message: message.full_message || '',
      photo_url: message.photo_url || '',
      display_locations: message.display_locations || [],
      campus: message.campus || '',
      order: message.order || 0,
      published: message.published || false
    });
    setEditingMessage(message);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.photo_url && !validateImageUrl(formData.photo_url)) {
      setError('Please enter a valid image URL');
      return;
    }

    try {
      // Remove undefined or empty string values
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
      );

      if (editingMessage) {
        const { error: updateError } = await supabase
          .from('leadership_messages')
          .update(cleanedData)
          .eq('id', editingMessage.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('leadership_messages')
          .insert([cleanedData]);

        if (insertError) throw insertError;
      }

      await fetchMessages();
      
      setShowForm(false);
      setEditingMessage(null);
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleLocationChange = (location: string) => {
    setFormData(prev => {
      const newLocations = prev.display_locations.includes(location)
        ? prev.display_locations.filter(loc => loc !== location)
        : [...prev.display_locations, location];
      return { ...prev, display_locations: newLocations };
    });
  };

  const handleDelete = async (messageId: string) => {
    try {
      setError('');

      const { error } = await supabase
        .from('leadership_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setShowDeleteConfirm(null);
      await fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light pt-32 pb-24">
      <Container>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-neutral-dark">Manage Messages</h1>
          <Button
            onClick={() => setShowForm(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Message
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
            {messages.map(message => (
              <div
                key={message.id}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl text-neutral-dark font-semibold">
                      {message.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-primary">{message.role}</p>
                      <p className="text-neutral-dark/60">{message.campus}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(message)}
                      variant="edit"
                      className="flex items-center gap-2"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(message.id)}
                      variant="delete"
                      className="flex items-center gap-2"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-neutral-dark/80 mb-4">{message.preview}</p>
                {message.photo_url && (
                  <img
                    src={message.photo_url}
                    alt={message.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    message.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {message.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-neutral-dark">
                  {editingMessage ? 'Edit Message' : 'Add New Message'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic fields */}
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
                  <label className="block text-neutral-dark mb-2">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Display Locations */}
                <div>
                  <label className="block text-neutral-dark mb-2">Display Locations</label>
                  <div className="space-y-2">
                    {Object.entries(DISPLAY_LOCATIONS).map(([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`location-${value}`}
                          checked={formData.display_locations.includes(value)}
                          onChange={() => handleLocationChange(value)}
                          className="rounded border-neutral-dark/20"
                        />
                        <label htmlFor={`location-${value}`} className="text-neutral-dark">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview and Full Message */}
                <div>
                  <label className="block text-neutral-dark mb-2">Preview</label>
                  <textarea
                    value={formData.preview}
                    onChange={(e) => setFormData(prev => ({ ...prev, preview: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-dark mb-2">Full Message</label>
                  <textarea
                    value={formData.full_message}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_message: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={6}
                    required
                  />
                </div>

                {/* Other fields */}
                <div>
                  <label className="block text-neutral-dark mb-2">Photo URL</label>
                  <input
                    type="text"
                    value={formData.photo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://images.tsh.edu.in/leaders/..."
                  />
                  <p className="text-sm text-neutral-dark/60 mt-1">
                    Enter the full URL of the leader's photo
                  </p>
                </div>

                <div>
                  <label className="block text-neutral-dark mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded border-neutral-dark/20"
                  />
                  <label className="text-neutral-dark">Published</label>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="submit" className="w-full">
                    {editingMessage ? 'Update Message' : 'Add Message'}
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
                <h2 className="text-2xl font-semibold">Delete Message</h2>
              </div>
              <p className="text-neutral-dark/80 mb-8">
                Are you sure you want to delete this message? This action cannot be undone.
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
                  Delete Message
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
