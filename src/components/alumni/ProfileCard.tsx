'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, LinkedinIcon, LogOut, Camera, Instagram, Facebook } from 'lucide-react';
import type { Profile } from '../../types/alumni';
import Button from '../ui/Button';

export function ProfileCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl p-8 shadow-lg"
    >
      <div className="w-32 h-32 rounded-full bg-neutral-200 animate-pulse mx-auto mb-6" />
      <div className="h-8 bg-neutral-200 rounded animate-pulse w-3/4 mx-auto mb-4" />
      <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2 mx-auto mb-8" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 bg-neutral-200 rounded animate-pulse w-2/3" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface ProfileCardProps {
  profile: Profile;
  onUploadClick: () => void;
  uploading: boolean;
  onSignOut: () => void;
}

export function ProfileCard({ profile, onUploadClick, uploading, onSignOut }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Unique geometric background */}
      <div className="absolute inset-0 bg-[#f8fafc]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(166, 212, 180, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(255, 162, 86, 0.4) 0%, transparent 50%)
          `,
        }} />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23374151' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 p-8">
        {/* Profile Picture with Upload Button */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="w-full h-full rounded-full ring-4 ring-white shadow-xl overflow-hidden relative">
            {profile.profile_picture_url ? (
              <img
                src={profile.profile_picture_url}
                alt={profile.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                <User className="w-12 h-12 text-neutral-400" />
              </div>
            )}
            <button
              onClick={onUploadClick}
              disabled={uploading}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display text-neutral-dark mb-2">
            {profile.full_name}
          </h2>
          <p className="text-green font-semibold">Class of {profile.batch_year}</p>
          {profile.occupation && (
            <p className="text-neutral-dark/70 mt-2">
              {profile.occupation} {profile.company ? `at ${profile.company}` : ''}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          {profile.email && (
            <div className="flex items-center gap-3 text-neutral-dark/70">
              <Mail className="w-5 h-5" />
              <span>{profile.email}</span>
            </div>
          )}
          {profile.phone && (
            <div className="flex items-center gap-3 text-neutral-dark/70">
              <Phone className="w-5 h-5" />
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.current_location && (
            <div className="flex items-center gap-3 text-neutral-dark/70">
              <MapPin className="w-5 h-5" />
              <span>{profile.current_location}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8 mb-6">
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-dark/70 hover:text-primary transition-colors"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
          )}
          {profile.instagram_url && (
            <a
              href={profile.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-dark/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          )}
          {profile.facebook_url && (
            <a
              href={profile.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-dark/70 hover:text-primary transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
          )}
        </div>

        {/* Sign Out Button */}
        <div className="mt-8">
          <Button
            variant="redOutline"
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Add this CSS animation to your global styles
// @keyframes wave {
//   from { background-position-x: 0; }
//   to { background-position-x: -80px; }
// }
