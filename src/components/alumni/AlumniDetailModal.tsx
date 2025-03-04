import { 
  X, Mail, Phone, LinkedinIcon, Instagram, Facebook, 
  Globe, MapPin, Briefcase, User, Quote,
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
        className="fixed inset-0 bg-neutral-dark/90 backdrop-blur-md flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-3xl" />
          <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-3xl" />

          {/* Header Section */}
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative p-8 pb-0">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-white hover:bg-neutral-light rounded-xl 
                  transition-all duration-300 z-10 text-neutral-dark group"
              >
                <X className="h-5 w-5 group-hover:rotate-90 transition-transform" />
              </button>

              <div className="flex items-center gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
                >
                  {alumni.profile_picture_url ? (
                    <img 
                      src={alumni.profile_picture_url} 
                      alt={alumni.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-light flex items-center justify-center">
                      <User className="h-12 w-12 text-neutral-dark/30" />
                    </div>
                  )}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1.5 bg-green-light/20 rounded-full flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-green" />
                      <span className="text-green font-medium">Class of {alumni.batch_year}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-display text-neutral-dark mb-2">
                    {alumni.full_name}
                  </h2>
                  {alumni.occupation && (
                    <p className="text-neutral-dark/70 text-lg">
                      {alumni.occupation} {alumni.company && `at ${alumni.company}`}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="relative p-8 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                {/* Bio Section */}
                {alumni.bio && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-neutral-light/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-light to-orange rounded-full flex items-center justify-center">
                        <Quote className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-dark">About Me</h3>
                    </div>
                    <p className="text-neutral-dark/70 whitespace-pre-wrap leading-relaxed">
                      {alumni.bio}
                    </p>
                  </motion.div>
                )}

                {/* Professional Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-neutral-light/30 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-dark">Professional Information</h3>
                  </div>
                  <div className="space-y-4">
                    {alumni.occupation && (
                      <div className="group">
                        <p className="font-medium text-neutral-dark mb-1">{alumni.occupation}</p>
                        {alumni.company && (
                          <p className="text-neutral-dark/70">{alumni.company}</p>
                        )}
                      </div>
                    )}
                    {alumni.current_location && (
                      <div className="flex items-center gap-3 text-neutral-dark/70">
                        <MapPin className="h-5 w-5 text-orange" />
                        <span>{alumni.current_location}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="space-y-8">
                {/* Contact Information */}
                {alumni.show_contact_info && (alumni.email || alumni.phone) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-neutral-light/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-light to-orange rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-dark">Contact Information</h3>
                    </div>
                    <div className="space-y-4">
                      {alumni.email && (
                        <a 
                          href={`mailto:${alumni.email}`}
                          className="flex items-center gap-3 text-neutral-dark/70 hover:text-orange transition-colors group"
                        >
                          <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>{alumni.email}</span>
                        </a>
                      )}
                      {alumni.phone && (
                        <a 
                          href={`tel:${alumni.phone}`}
                          className="flex items-center gap-3 text-neutral-dark/70 hover:text-orange transition-colors group"
                        >
                          <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>{alumni.phone}</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Social Links */}
                {(alumni.linkedin_url || alumni.facebook_url || alumni.instagram_url) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-neutral-light/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-dark">Connect</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      {alumni.linkedin_url && (
                        <a 
                          href={alumni.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-white hover:bg-[#0077B5]/10 text-neutral-dark 
                            hover:text-[#0077B5] transition-all duration-300 group hover:scale-105"
                        >
                          <LinkedinIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                      {alumni.facebook_url && (
                        <a 
                          href={alumni.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-white hover:bg-[#1877F2]/10 text-neutral-dark 
                            hover:text-[#1877F2] transition-all duration-300 group hover:scale-105"
                        >
                          <Facebook className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                      {alumni.instagram_url && (
                        <a 
                          href={alumni.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-white hover:bg-[#E4405F]/10 text-neutral-dark 
                            hover:text-[#E4405F] transition-all duration-300 group hover:scale-105"
                        >
                          <Instagram className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
