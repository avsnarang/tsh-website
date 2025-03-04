import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { ArrowLeft, User, Pencil, X, AlertCircle, Plus, AlertTriangle, Trash2, MessageSquareQuote } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';
import { motion, AnimatePresence } from 'framer-motion';

const getDisplayLocationsText = (locations: string[]): string => {
  if (!locations || locations.length === 0) return 'None';
  if (locations.includes('all')) return 'All pages';
  
  const locationMap: Record<string, string> = {
    'homepage': 'Homepage',
    'leadership': 'Leadership page',
    'campus': 'Campus page'
  };

  return locations
    .map(loc => locationMap[loc] || loc)
    .join(', ');
};

interface LeadershipMessage {
  id: string;
  role: string;
  name: string;
  preview: string;
  full_message: string;
  order: number;
  photo_url?: string | null;
  display_locations: string[];
  created_at?: string;
  is_active?: boolean;
}

interface FormData {
  name: string;
  role: string;
  preview: string;
  full_message: string;
  photo_url?: string | null;
  display_locations: string[];
  order?: number;
}

export default function ManageMessages() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMessage, setEditingMessage] = useState<LeadershipMessage | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    preview: '',
    full_message: '',
    photo_url: '',
    display_locations: ['all'] as string[]
  });

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('leadership_messages')
        .select('*')
        .order('order');

      if (error) throw error;

      const sanitizedData = (data || []).map(message => ({
        ...message,
        full_message: message.full_message || '',
        display_locations: message.display_locations || ['all']
      }));

      setMessages(sanitizedData);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to fetch messages');
      showToast('Error loading messages', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleEdit = (message: LeadershipMessage) => {
    setEditingMessage(message);
    setFormData({
      name: message.name,
      role: message.role,
      preview: message.preview,
      full_message: message.full_message,
      photo_url: message.photo_url || '',
      display_locations: message.display_locations || ['all']
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      preview: '',
      full_message: '',
      photo_url: '',
      display_locations: ['all'],
      order: messages.length + 1
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.name || !formData.role || !formData.preview || !formData.full_message) {
        setError('Please fill in all required fields');
        return;
      }

      // Ensure display_locations is always an array and has at least one value
      const display_locations = formData.display_locations?.length 
        ? formData.display_locations 
        : ['all'];

      const messageData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        preview: formData.preview.trim(),
        full_message: formData.full_message.trim(),
        photo_url: formData.photo_url || null,
        display_locations,
        order: editingMessage?.order || messages.length + 1
      };

      if (editingMessage) {
        const { error } = await supabase
          .from('leadership_messages')
          .update(messageData)
          .eq('id', editingMessage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('leadership_messages')
          .insert([messageData]);

        if (error) throw error;
      }

      // If we get here, the operation was successful
      setShowForm(false);
      setEditingMessage(null);
      resetForm();
      await fetchMessages(); // Refresh the messages list
      setError(''); // Clear any existing errors

    } catch (err: any) {
      console.error('Error saving message:', err);
      setError(err.message || 'Failed to save message');
    }
  };

  const handleDisplayLocationChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      display_locations: prev.display_locations?.includes(value)
        ? prev.display_locations.filter(loc => loc !== value)
        : [...(prev.display_locations || []), value]
    }));
  };

  const handleDelete = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('leadership_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setShowDeleteConfirm(null);
      showToast('Message deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting message:', err);
      showToast('Failed to delete message', 'error');
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green" />
        </div>
      </Container>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-light">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="relative pt-32 pb-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-12">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
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
                className="flex items-center gap-2 bg-green hover:bg-green-dark"
              >
                <Plus className="h-5 w-5" />
                Create Message
              </Button>
            </div>

            <motion.div
              className="flex-1 text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Section Tag */}
              <motion.div
                className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-semibold">MANAGE MESSAGES</span>
              </motion.div>

              <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
                Leadership <span className="text-green">Messages</span>
              </h1>
            </motion.div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-8 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            <div className="space-y-8">
              {messages.length === 0 ? (
                <div className="text-center text-neutral-dark/60 py-16 bg-white rounded-2xl shadow-lg">
                  No messages found. Create your first message by clicking the "Create Message" button above.
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-orange-light/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                    <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                      <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-light to-green">
                          {message.photo_url ? (
                            <img
                              src={message.photo_url}
                              alt={message.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-2xl font-display text-neutral-dark">
                                {message.name}
                              </h3>
                              <p className="text-green">{message.role}</p>
                              <p className="text-neutral-dark/60 text-sm mt-1">
                                Displayed on: {getDisplayLocationsText(message.display_locations || ['all'])}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleEdit(message)}
                                variant="outline2"
                                className="flex items-center gap-2"
                              >
                                <Pencil className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => setShowDeleteConfirm(message.id)}
                                variant="danger"
                                className="flex items-center gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-semibold text-neutral-dark mb-2">Preview</h4>
                            <p className="text-neutral-dark/80">{message.preview}</p>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-semibold text-neutral-dark mb-2">Full Message</h4>
                            <div className="prose prose-sm">
                              {message.full_message?.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="text-neutral-dark/80">
                                  {paragraph}
                                </p>
                              )) || <p className="text-neutral-dark/80">No message content</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Create/Edit Message Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
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
                    value={formData.full_message}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_message: e.target.value }))}
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
                    variant="outline2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingMessage ? 'Save Changes' : 'Create Message'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
            >
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
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete Message
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
