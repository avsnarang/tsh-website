import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, X } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Update {
  id: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

export default function ManageUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [formContent, setFormContent] = useState('');

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

      if (editingUpdate) {
        // Update existing update
        const { error } = await supabase
          .from('latest_updates')
          .update({ content: formContent })
          .eq('id', editingUpdate.id);

        if (error) throw error;
        setSuccess('Update modified successfully!');
      } else {
        // Create new update
        const { error } = await supabase
          .from('latest_updates')
          .insert([{ content: formContent, is_active: true }]);

        if (error) throw error;
        setSuccess('Update created successfully!');
      }

      setShowForm(false);
      setEditingUpdate(null);
      setFormContent('');
      await fetchUpdates();
    } catch (error) {
      console.error('Error saving update:', error);
      setError('Failed to save update');
    }
  };

  const toggleActive = async (update: Update) => {
    try {
      setError('');

      // If activating this update, deactivate all others
      if (!update.is_active) {
        await supabase
          .from('latest_updates')
          .update({ is_active: false })
          .neq('id', update.id);
      }

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
    setShowForm(true);
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
            <Button
              onClick={() => {
                setEditingUpdate(null);
                setFormContent('');
                setShowForm(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Update
            </Button>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Latest Updates</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <p className="text-neutral-dark/80 whitespace-pre-wrap break-words">
                        {update.content}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          update.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {update.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-xs text-neutral-dark/60">
                          Created: {new Date(update.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(update)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                        Edit
                      </button>
                      <button
                        onClick={() => toggleActive(update)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          update.is_active
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {update.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">
                {editingUpdate ? 'Edit Update' : 'Create Update'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingUpdate(null);
                  setFormContent('');
                }}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
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
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  placeholder="Example: Admissions Open for 2025-26 • Annual Sports Day on March 15th"
                  required
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
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingUpdate ? 'Save Changes' : 'Create Update'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}