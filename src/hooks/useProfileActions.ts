import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { queryClient } from '../lib/queryClient';
import type { Profile } from '../types/alumni';
import type { User } from '@supabase/supabase-js';

export function useProfileActions(user: User | null, profile: Profile | undefined) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile || !user) return;

    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const updatedProfile = {
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    };

    queryClient.setQueryData(['alumniProfile', user.id], updatedProfile);
  }, [profile, user]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await supabase
        .from('alumni_profiles')
        .update(profile)
        .eq('id', user.id);

      if (updateError) throw updateError;


      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  }, [profile, user]);

  const handleProfilePictureChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !user) return;

    setUploading(true);
    setError('');

    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('alumni')
        .upload(`profile-pictures/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('alumni')
        .getPublicUrl(`profile-pictures/${fileName}`);

      await supabase
        .from('alumni_profiles')
        .update({ profile_picture_url: publicUrl })
        .eq('id', user.id);

      queryClient.setQueryData(['alumniProfile', user.id], {
        ...profile,
        profile_picture_url: publicUrl
      });


      setSuccess('Profile picture updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  }, [profile, user]);

  const handleSignOut = useCallback(async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
    }
  }, []);

  return {
    saving,
    uploading,
    error,
    success,
    handleChange,
    handleSubmit,
    handleProfilePictureChange,
    handleSignOut
  };
}
