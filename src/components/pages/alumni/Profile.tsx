'use client';

import { useRef } from 'react';
import { useAlumniProfile } from '@/lib/queries';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/ui/Container';
import { ProfileCard, ProfileCardSkeleton } from '@/components/alumni/ProfileCard';
import { ProfileForm } from '@/components/alumni/ProfileForm';
import { motion } from 'framer-motion';
import { useProfileActions } from '@/hooks/useProfileActions';
import { Star } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Link from 'next/link';

export default function Profile() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    data: profile, 
    isLoading: loading,
  } = useAlumniProfile(user?.id);

  const {
    saving,
    uploading,
    error,
    success,
    handleChange,
    handleSubmit,
    handleProfilePictureChange,
    handleSignOut
  } = useProfileActions(user, profile);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8">
        {/* Header Section */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
              >
                <Star className="h-4 w-4" />
                <span className="font-semibold">My Profile</span>
              </motion.div>
            </div>
            
            <TextReveal>
              <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                Welcome <span className="text-green">{profile?.full_name || 'Alumni'}!</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                Update your information or <Link href="/alumni/directory" className="text-primary hover:text-primary-dark underline underline-offset-2 decoration-primary/30 hover:decoration-primary font-medium">browse the alumni directory →</Link>
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-8">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-8">
            {success}
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />

        {/* Profile Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side - Profile Card and Social Links */}
            <div className="lg:col-span-4">
              <div className="space-y-8 sticky top-32 z-20">
                {/* Profile Card */}
                {loading ? (
                  <ProfileCardSkeleton />
                ) : profile && (
                  <ProfileCard
                    profile={profile}
                    onUploadClick={handleUploadClick}
                    uploading={uploading}
                    onSignOut={handleSignOut}
                  />
                )}

                {/* Social Links Card */}
                {!loading && profile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-8">
                      <h2 className="text-2xl font-display text-neutral-dark mb-6">Social Links</h2>
                      <ProfileForm
                        profile={profile}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        saving={saving}
                        section="social"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Side - Forms */}
            <div className="lg:col-span-8 space-y-8">
              {/* Basic Info */}
              {!loading && profile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-8">
                    <h2 className="text-2xl font-display text-neutral-dark mb-6">Basic Information</h2>
                    <ProfileForm
                      profile={profile}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      saving={saving}
                      section="basic"
                    />
                  </div>
                </motion.div>
              )}

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Professional Info Card */}
                {!loading && profile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-8">
                      <h2 className="text-2xl font-display text-neutral-dark mb-6">Professional Information</h2>
                      <ProfileForm
                        profile={profile}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        saving={saving}
                        section="professional"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Contact Card */}
                {!loading && profile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-8">
                      <h2 className="text-2xl font-display text-neutral-dark mb-6">Contact Information</h2>
                      <ProfileForm
                        profile={profile}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        saving={saving}
                        section="contact"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
