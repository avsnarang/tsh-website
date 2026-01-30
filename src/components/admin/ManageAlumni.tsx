'use client';

import { FC } from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAlumniProfiles } from '../../lib/queries';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Eye, EyeOff, Trash2, Search, X, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { Profile as AlumniProfile } from '../../types/alumni';

const ManageAlumni: FC = () => {
  const queryClient = useQueryClient();
  const { data: profiles } = useAlumniProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const filteredProfiles = (profiles as AlumniProfile[] | undefined)?.filter((profile: AlumniProfile) => 
    profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.batch_year.toString().includes(searchTerm) ||
    profile.occupation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = async (profileId: string, field: 'is_public' | 'show_in_success') => {
    try {
      setError('');
      const profile = (profiles as AlumniProfile[] | undefined)?.find((p: AlumniProfile) => p.id === profileId);
      if (!profile) {
        console.error('Profile not found:', profileId);
        return;
      }

      const newValue = !profile[field];
      console.log(`Attempting to toggle ${field} for profile ${profileId} to ${newValue}`);

      // Update the database without requesting the response data
      const { error } = await supabase
        .from('alumni_profiles')
        .update({ [field]: newValue })
        .eq('id', profileId);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      // Fetch the updated record separately
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('id', profileId)
        .single();

      if (fetchError) {
        console.error('Error fetching updated profile:', fetchError);
        throw fetchError;
      }

      console.log('Updated profile:', updatedProfile);

      // Update local state with the fetched data
      queryClient.setQueryData(['alumniProfiles'], (oldData: AlumniProfile[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(p => 
          p.id === profileId 
            ? updatedProfile
            : p
        );
      });

    } catch (error) {
      console.error('Error updating visibility:', error);
      setError('Failed to update profile visibility');
      // Refresh from server on error
      queryClient.invalidateQueries({ queryKey: ['alumniProfiles'] });
    }
  };

  const handleDelete = async (profileId: string) => {
    try {
      setError('');
      
      const { error } = await supabase
        .from('alumni_profiles')
        .delete()
        .eq('id', profileId);

      if (error) throw error;

      setSuccess('Profile deleted successfully');
      setShowDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ['alumniProfiles'] });
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile');
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-light">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <div className="relative pb-24">
        <Container>
          <div className="max-w-6xl mx-auto">
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
                <span className="text-sm font-semibold">MANAGE ALUMNI</span>
              </motion.div>

              <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
                Alumni <span className="text-green">Directory</span>
              </h1>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/50" />
                <input
                  type="text"
                  placeholder="Search by name, batch year, or occupation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent shadow-sm"
                />
              </div>
            </motion.div>

            {/* Status Messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{success}</span>
                </div>
              </div>
            )}

            {/* Alumni List */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-dark">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-dark">Batch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-dark">Occupation</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-dark">Directory</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-dark">Success</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredProfiles?.map((profile: AlumniProfile, index) => (
                      <motion.tr 
                        key={profile.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-neutral-50"
                      >
                        <td className="px-6 py-4 font-medium">{profile.full_name}</td>
                        <td className="px-6 py-4">{profile.batch_year}</td>
                        <td className="px-6 py-4">{profile.occupation}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleVisibility(profile.id, 'is_public')}
                            className={`p-2 rounded-lg transition-colors hover:bg-neutral-100 ${
                              profile.is_public 
                                ? 'text-green hover:text-green-dark' 
                                : 'text-red-500 hover:text-red-600'
                            }`}
                          >
                            {profile.is_public ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleVisibility(profile.id, 'show_in_success')}
                            className={`p-2 rounded-lg transition-colors hover:bg-neutral-100 ${
                              profile.show_in_success 
                                ? 'text-green hover:text-green-dark' 
                                : 'text-red-500 hover:text-red-600'
                            }`}
                          >
                            {profile.show_in_success ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => setShowDeleteConfirm(profile.id)}
                            variant="delete"
                            className="p-2 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-4">Confirm Delete</h3>
            <p className="text-neutral-600 mb-8">
              Are you sure you want to delete this alumni profile? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                className="flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Cancel
              </Button>
              <Button
                variant="delete"
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ManageAlumni;
