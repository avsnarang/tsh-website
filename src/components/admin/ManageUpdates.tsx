'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, X, Star, Ban, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { motion } from 'framer-motion';

interface Update {
  id: string;
  content: string;
  is_active: boolean;
  created_at: string;
  link?: string;
}

export default function ManageUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [formContent, setFormContent] = useState('');
  const [formLink, setFormLink] = useState('');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('latest_updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUpdates(data || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
      setError('Failed to load updates');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      
      // Split content by bullet points and validate
      const updates = formContent.split('•').map(update => update.trim()).filter(Boolean);
      if (updates.length === 0) {
        throw new Error('Please enter at least one update');
      }

      const updateData = {
        content: formContent,
        is_active: true,
        updated_at: new Date().toISOString(),
        ...(formLink.trim() ? { link: formLink.trim() } : {})
      };

      if (editingUpdate) {
        const { error } = await supabase
          .from('latest_updates')
          .update(updateData)
          .eq('id', editingUpdate.id);

        if (error) throw error;
        setSuccess('Update modified successfully!');
      } else {
        const { error } = await supabase
          .from('latest_updates')
          .insert([{
            ...updateData,
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;
        setSuccess('Update created successfully!');
      }

      // Reset form and refresh updates
      setShowForm(false);
      setEditingUpdate(null);
      setFormContent('');
      setFormLink('');
      await fetchUpdates();
    } catch (error) {
      console.error('Error saving update:', error);
      setError(error instanceof Error ? error.message : 'Failed to save update');
    }
  };

  const toggleActive = async (update: Update) => {
    try {
      setError('');

      const { error } = await supabase
        .from('latest_updates')
        .update({ is_active: !update.is_active })
        .eq('id', update.id);

      if (error) throw error;
      await fetchUpdates();
    } catch (error) {
      console.error('Error toggling update status:', error);
      setError('Failed to update status');
    }
  };

  const handleEdit = (update: Update) => {
    setEditingUpdate(update);
    setFormContent(update.content);
    setFormLink(update.link || '');
    setShowForm(true);
  };

  return (
    <div className="relative min-h-screen bg-neutral-light pt-32 pb-24">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container>
        <div className="relative">
          <ScrollReveal>
            <div className="text-center mb-12">
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
                  <span className="font-semibold">Updates Management</span>
                </motion.div>
              </div>
              
              <TextReveal>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                  Manage <span className="text-green">Latest Updates</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                  Create and manage latest updates displayed across the website
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Add Update Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-end"
          >
            <button
              onClick={() => {
                setEditingUpdate(null);
                setFormContent('');
                setFormLink('');
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create Update</span>
            </button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span>{success}</span>
            </div>
          )}

          {/* Updates List */}
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
                className="space-y-6"
              >
                {updates.map((update) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-dark/10"
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <p className="text-neutral-dark/80 whitespace-pre-wrap break-words">
                            {update.content}
                          </p>
                          <div className="mt-4 flex items-center gap-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              update.is_active
                                ? 'bg-green-light/20 text-green'
                                : 'bg-neutral-light text-neutral-dark/60'
                            }`}>
                              {update.is_active ? 'Active' : 'Inactive'}
                            </span>
                            <span className="text-sm text-neutral-dark/60">
                              Created: {new Date(update.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(update)}
                            className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => toggleActive(update)}
                            className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                          >
                            {update.is_active ? <Ban className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </ScrollReveal>
        </div>
      </Container>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display text-neutral-dark">
                  {editingUpdate ? 'Edit Update' : 'Create Update'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingUpdate(null);
                    setFormContent('');
                    setFormLink('');
                  }}
                  className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-neutral-dark mb-2">
                    Content
                    <span className="text-neutral-dark/60 text-sm ml-2">
                      (Use • to separate different updates)
                    </span>
                  </label>
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green h-32"
                    placeholder="Example: Admissions Open for 2025-26 • Annual Sports Day on March 15th"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-dark mb-2">
                    Link (Optional)
                    <span className="text-neutral-dark/60 text-sm ml-2">
                      (Where should this update link to?)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                    placeholder="Example: /admissions or https://external-link.com"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline2"
                    onClick={() => {
                      setShowForm(false);
                      setEditingUpdate(null);
                      setFormContent('');
                      setFormLink('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    {editingUpdate ? 'Save Changes' : 'Create Update'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
