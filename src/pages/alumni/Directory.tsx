import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Container from '../../components/ui/Container';
import { useSEO } from '../../lib/seo';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useAlumniProfiles } from '../../lib/queries';
import { 
  User, 
  Star, 
  Search, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  MapPin, 
  LinkedinIcon,
  Filter
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import AlumniDetailModal from '../../components/alumni/AlumniDetailModal';

export default function Directory() {
  const { data: alumniProfiles, isLoading } = useAlumniProfiles();
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<number | 'all'>('all');

  useSEO({
    title: 'Alumni Directory | The Scholars Home',
    description: 'Browse through our distinguished alumni network and connect with fellow graduates.'
  });

  // Get unique batch years
  const batchYears = useMemo(() => {
    if (!alumniProfiles) return [];
    const years = [...new Set(alumniProfiles.map(alumni => alumni.batch_year))];
    return years.sort((a, b) => b - a); // Sort in descending order
  }, [alumniProfiles]);

  // Filter alumni based on search query, selected batch, and visibility
  const filteredAlumni = useMemo(() => {
    if (!alumniProfiles) return [];
    
    return alumniProfiles.filter(alumni => {
      const matchesSearch = 
        alumni.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.current_location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBatch = selectedBatch === 'all' || alumni.batch_year === selectedBatch;
      
      // Only show public profiles
      const isVisible = alumni.is_public === true;
      
      return matchesSearch && matchesBatch && isVisible;
    });
  }, [alumniProfiles, searchQuery, selectedBatch]);

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

      <Container className="relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8">
            <Star className="h-4 w-4" />
            <span className="font-semibold">Alumni Directory</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
            Our <span className="text-green">Global Alumni</span> Network
          </h1>
          <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
            Connect with accomplished graduates who are making their mark across the globe
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
            
            <div className="relative flex gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by name, occupation, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-neutral-dark/10 
                    focus:ring-2 focus:ring-green/20 focus:border-green
                    text-neutral-dark placeholder:text-neutral-dark/50"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-green" />
              </div>

              {/* Batch Filter Dropdown */}
              <div className="relative min-w-[200px]">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="w-full px-6 py-4 pl-12 appearance-none rounded-xl border-2 border-neutral-dark/10 
                    focus:ring-2 focus:ring-green/20 focus:border-green
                    text-neutral-dark bg-white cursor-pointer"
                >
                  <option value="all">All Batches</option>
                  {batchYears.map(year => (
                    <option key={year} value={year}>
                      Batch {year}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-neutral-dark/50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-neutral-dark/70">
            Showing {filteredAlumni.length} {filteredAlumni.length === 1 ? 'alumnus' : 'alumni'}
            {selectedBatch !== 'all' && ` from batch ${selectedBatch}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Alumni Grid */}
        <ScrollReveal>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto" />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredAlumni.map((alumni, index) => (
                <motion.div
                  key={alumni.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="relative bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform-gpu will-change-transform"
                  onClick={() => setSelectedAlumni(alumni)}
                >
                  {/* Geometric Background with hover effect */}
                  <div className="absolute inset-0 bg-[#f8fafc] transition-opacity duration-300 group-hover:opacity-90">
                    <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" style={{
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
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative w-24 h-24 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                        {alumni.profile_picture_url ? (
                          <img
                            src={alumni.profile_picture_url}
                            alt={alumni.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-light to-primary flex items-center justify-center">
                            <User className="h-10 w-10 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-display text-2xl text-neutral-dark mb-1">
                          {alumni.full_name}
                        </h3>
                        <div className="flex items-center gap-2 text-green">
                          <GraduationCap className="h-4 w-4" />
                          <span className="font-medium">Class of {alumni.batch_year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      {alumni.occupation && (
                        <div className="flex items-center gap-3 text-neutral-dark/70">
                          <Briefcase className="h-5 w-5" />
                          <span>{alumni.occupation}</span>
                        </div>
                      )}
                      {alumni.company && (
                        <div className="flex items-center gap-3 text-neutral-dark/70">
                          <Building2 className="h-5 w-5" />
                          <span>{alumni.company}</span>
                        </div>
                      )}
                      {alumni.current_location && (
                        <div className="flex items-center gap-3 text-neutral-dark/70">
                          <MapPin className="h-5 w-5" />
                          <span>{alumni.current_location}</span>
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    {(alumni.linkedin_url || alumni.facebook_url || alumni.instagram_url) && (
                      <div className="mt-6 pt-6 border-t border-neutral-light/30">
                        <div className="flex items-center gap-4">
                          {alumni.linkedin_url && (
                            <a
                              href={alumni.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-dark/70 hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <LinkedinIcon className="h-5 w-5" />
                            </a>
                          )}
                          {alumni.facebook_url && (
                            <a
                              href={alumni.facebook_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-dark/70 hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaFacebook className="h-5 w-5" />
                            </a>
                          )}
                          {alumni.instagram_url && (
                            <a
                              href={alumni.instagram_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-dark/70 hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaInstagram className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </ScrollReveal>

        {/* Alumni Detail Modal */}
        {selectedAlumni && (
          <AlumniDetailModal
            alumni={selectedAlumni}
            onClose={() => setSelectedAlumni(null)}
          />
        )}
      </Container>
    </div>
  );
}
