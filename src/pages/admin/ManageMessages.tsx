import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { ArrowLeft, User, Pencil, X, AlertCircle, Plus, AlertTriangle, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface LeadershipMessage {
  id: string;
  role: string;
  name: string;
  preview: string;
  fullMessage: string;
  order: number;
  photo_url?: string;
  display_locations: string[];
  full_message?: string;
}

export default function ManageMessages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingMessage, setEditingMessage] = useState<LeadershipMessage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<LeadershipMessage, 'id' | 'order'>>({
    role: '',
    name: '',
    preview: '',
    fullMessage: '',
    photo_url: '',
    display_locations: ['all']
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin-portal/login');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('leadership_messages')
        .select('*')
        .order('order');

      if (error) throw error;

      setMessages(data.map(msg => ({
        ...msg,
        fullMessage: msg.full_message || '',
        display_locations: msg.display_locations || ['all']
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (message: LeadershipMessage) => {
    setEditingMessage(message);
    setFormData({
      role: message.role,
      name: message.name,
      preview: message.preview,
      fullMessage: message.fullMessage,
      photo_url: message.photo_url || '',
      display_locations: message.display_locations || ['all']
    });
    setShowForm(true);
  };

  const handleDelete = async (messageId: string) => {
    try {
      setError('');
      setSuccess('');

      const { error } = await supabase
        .from('leadership_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setSuccess('Message deleted successfully');
      setShowDeleteConfirm(null);
      await fetchMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      if (editingMessage) {
        // Update existing message
        const { error } = await supabase
          .from('leadership_messages')
          .update({
            role: formData.role,
            name: formData.name,
            preview: formData.preview,
            full_message: formData.fullMessage,
            photo_url: formData.photo_url || null,
            display_locations: formData.display_locations,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingMessage.id);

        if (error) throw error;
        setSuccess('Message updated successfully');
      } else {
        // Create new message
        const { error } = await supabase
          .from('leadership_messages')
          .insert([{
            role: formData.role,
            name: formData.name,
            preview: formData.preview,
            full_message: formData.fullMessage,
            photo_url: formData.photo_url || null,
            display_locations: formData.display_locations,
            order: messages.length + 1
          }]);

        if (error) throw error;
        setSuccess('Message created successfully');
      }

      setTimeout(() => setSuccess(''), 3000);
      setShowForm(false);
      setEditingMessage(null);
      resetForm();
      await fetchMessages();
    } catch (error) {
      console.error('Error saving message:', error);
      setError('Failed to save message');
    }
  };

  const handleDisplayLocationChange = (location: string) => {
    setFormData(prev => {
      const newLocations = prev.display_locations.includes(location)
        ? prev.display_locations.filter(loc => loc !== location)
        : [...prev.display_locations, location];
      
      // If 'all' is selected, clear other selections
      if (location === 'all') {
        return { ...prev, display_locations: ['all'] };
      }
      
      // If another option is selected, remove 'all'
      const filteredLocations = newLocations.filter(loc => loc !== 'all');
      
      // If no options are selected, default to 'all'
      return {
        ...prev,
        display_locations: filteredLocations.length > 0 ? filteredLocations : ['all']
      };
    });
  };

  const getDisplayLocationsText = (locations: string[]) => {
    if (locations.includes('all')) return 'All Pages';
    return locations.map(location => {
      switch (location) {
        case 'homepage':
          return 'Homepage';
        case 'leadership':
          return 'Leadership Page';
        case 'paonta-sahib':
          return 'Paonta Sahib Page';
        case 'juniors':
          return 'Juniors Page';
        case 'majra':
          return 'Majra Page';
        default:
          return location;
      }
    }).join(', ');
  };

  const resetForm = () => {
    setFormData({
      role: '',
      name: '',
      preview: '',
      fullMessage: '',
      photo_url: '',
      display_locations: ['all']
    });
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center">Loading messages...</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/admin-portal/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <Button
              onClick={() => {
                setEditingMessage(null);
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Message
            </Button>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Leadership Messages</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {success}
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary-light/20">
                    {message.photo_url ? (
                      <img
                        src={message.photo_url}
                        alt={message.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl text-neutral-dark font-semibold">
                          {message.name}
                        </h3>
                        <p className="text-primary">{message.role}</p>
                        <p className="text-neutral-dark/60 text-sm mt-1">
                          Displayed on: {getDisplayLocationsText(message.display_locations || ['all'])}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleEdit(message)}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => setShowDeleteConfirm(message.id)}
                          variant="outline"
                          className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:border-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-neutral-dark mb-2">Preview</h4>
                      <p className="text-neutral-dark/80">{message.preview}</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-neutral-dark mb-2">Full Message</h4>
                      <div className="prose prose-sm">
                        {message.fullMessage.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="text-neutral-dark/80">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Create/Edit Message Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">
                {editingMessage ? 'Edit Message' : 'Create Message'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingMessage(null);
                  resetForm();
                }}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-neutral-dark mb-2">Display Locations</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Pages' },
                    { value: 'homepage', label: 'Homepage' },
                    { value: 'leadership', label: 'Leadership Page' },
                    { value: 'paonta-sahib', label: 'Paonta Sahib Page' },
                    { value: 'juniors', label: 'Juniors Page' },
                    { value: 'majra', label: 'Majra Page' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.display_locations.includes(option.value)}
                        onChange={() => handleDisplayLocationChange(option.value)}
                        className="rounded border-neutral-dark/20 text-primary focus:ring-primary"
                      />
                      <span className="text-neutral-dark">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Preview</label>
                <textarea
                  value={formData.preview}
                  onChange={(e) => setFormData(prev => ({ ...prev, preview: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Full Message</label>
                <textarea
                  value={formData.fullMessage}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullMessage: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-64"
                  required
                />
                <p className="text-sm text-neutral-dark/60 mt-1">
                  Use double line breaks to separate paragraphs
                </p>
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Photo URL (Optional)</label>
                <input
                  type="url"
                  value={formData.photo_url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMessage(null);
                    resetForm();
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMessage ? 'Save Changes' : 'Create Message'}
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
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}