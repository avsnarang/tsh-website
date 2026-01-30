import { 
  X, Mail, Phone, LinkedinIcon, Instagram, Facebook, 
  MapPin, User,
  GraduationCap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlumniDetailModalProps {
  alumni: any; // Replace with your Alumni type
  onClose: () => void;
}

export default function AlumniDetailModal({ alumni, onClose }: AlumniDetailModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-neutral-dark/90 backdrop-blur-md flex items-center justify-center p-4 z-[100]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Geometric Background */}
          <div className="absolute inset-0 bg-[#f8fafc] z-0">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 0% 0%, rgba(166, 212, 180, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(255, 162, 86, 0.4) 0%, transparent 50%)
              `,
            }} />
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23374151' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Close Button - increased z-index */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-neutral-dark hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content - adjusted z-index */}
          <div className="relative z-10 p-8">
            {/* Header Section */}
            <div className="flex items-center gap-8 mb-8">
              <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                {alumni.profile_picture_url ? (
                  <img
                    src={alumni.profile_picture_url}
                    alt={alumni.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-light to-primary flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="font-display text-3xl text-neutral-dark mb-2">
                  {alumni.full_name}
                </h2>
                <div className="flex items-center gap-2 text-green mb-2">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium text-lg">Class of {alumni.batch_year}</span>
                </div>
                {alumni.occupation && (
                  <p className="text-neutral-dark/70 text-lg">
                    {alumni.occupation} {alumni.company ? `at ${alumni.company}` : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="font-display text-xl text-neutral-dark mb-4">Contact Information</h3>
                {alumni.email && (
                  <div className="flex items-center gap-3 text-neutral-dark/70">
                    <Mail className="h-5 w-5" />
                    <a href={`mailto:${alumni.email}`} className="hover:text-primary transition-colors">
                      {alumni.email}
                    </a>
                  </div>
                )}
                {alumni.phone && (
                  <div className="flex items-center gap-3 text-neutral-dark/70">
                    <Phone className="h-5 w-5" />
                    <a href={`tel:${alumni.phone}`} className="hover:text-primary transition-colors">
                      {alumni.phone}
                    </a>
                  </div>
                )}
                {alumni.current_location && (
                  <div className="flex items-center gap-3 text-neutral-dark/70">
                    <MapPin className="h-5 w-5" />
                    <span>{alumni.current_location}</span>
                  </div>
                )}
              </div>

              {/* Only render social links section if at least one social link exists */}
              {(alumni.linkedin_url?.trim() || 
                alumni.facebook_url?.trim() || 
                alumni.instagram_url?.trim()) && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl text-neutral-dark mb-4">Social Links</h3>
                  <div className="flex gap-4">
                    {alumni.linkedin_url && (
                      <a
                        href={alumni.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-neutral-light hover:bg-primary hover:text-white transition-colors"
                      >
                        <LinkedinIcon className="h-6 w-6" />
                      </a>
                    )}
                    {alumni.instagram_url && (
                      <a
                        href={alumni.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-neutral-light hover:bg-primary hover:text-white transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                    )}
                    {alumni.facebook_url && (
                      <a
                        href={alumni.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-neutral-light hover:bg-primary hover:text-white transition-colors"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bio or Additional Information */}
            {alumni.bio && (
              <div className="mt-8 pt-8 border-t border-neutral-light">
                <h3 className="font-display text-xl text-neutral-dark mb-4">About</h3>
                <p className="text-neutral-dark/70 leading-relaxed">{alumni.bio}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
