import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import type { Profile as AlumniProfile } from '../../types/alumni';

export function ProfileFormSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl p-8 shadow-lg"
    >
      <div className="space-y-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/4" />
            <div className="h-10 bg-neutral-200 rounded animate-pulse w-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface ProfileFormProps {
  profile: AlumniProfile;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
  section: 'basic' | 'professional' | 'contact' | 'social';
}

export function ProfileForm({ profile, onChange, onSubmit, saving, section }: ProfileFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl p-8 shadow-lg h-full"
    >
      <form onSubmit={onSubmit} className="space-y-6 h-full flex flex-col">
        <div className="grow">
          {section === 'basic' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Batch Year
                </label>
                <input
                  type="number"
                  name="batch_year"
                  value={profile.batch_year}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Current Location
                </label>
                <input
                  type="text"
                  name="current_location"
                  value={profile.current_location}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {section === 'professional' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={profile.occupation}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={profile.company || ''}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio || ''}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>
            </div>
          )}

          {section === 'contact' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone || ''}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="show_contact_info"
                  checked={profile.show_contact_info}
                  onChange={onChange}
                  className="rounded border-neutral-200 text-green focus:ring-green"
                />
                <label className="text-sm text-neutral-dark">
                  Show contact information to other alumni
                </label>
              </div>
            </div>
          )}

          {section === 'social' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={profile.linkedin_url || ''}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Facebook URL
                </label>
                <input
                  type="url"
                  name="facebook_url"
                  value={profile.facebook_url || ''}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-dark">
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="instagram_url"
                  value={profile.instagram_url || ''}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_public"
                  checked={profile.is_public}
                  onChange={onChange}
                  className="rounded border-neutral-200 text-green focus:ring-green"
                />
                <label className="text-sm text-neutral-dark">
                  Make my profile visible in the alumni directory
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 mt-auto border-t border-neutral-200">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-green text-white rounded-lg hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
