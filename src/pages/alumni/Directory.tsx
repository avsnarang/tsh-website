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
  MapPin, 
  ChevronRight,
  Filter
} from 'lucide-react';
import AlumniDetailModal from '../../components/alumni/AlumniDetailModal';
import NotionDropdown from '../../components/ui/NotionDropdown';
import { Profile } from '../../types/alumni';

export default function Directory() {
  const { data: alumniProfiles, isLoading } = useAlumniProfiles();
  const [selectedAlumni, setSelectedAlumni] = useState<Profile | null>(null);
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

  const batchOptions = useMemo(() => {
    if (!batchYears.length) return [{ 
      value: 'all', 
      label: 'All Batches',
      icon: <Filter className="h-5 w-5 text-green" />
    }];
    
    return [
      { 
        value: 'all', 
        label: 'All Batches',
        icon: <Filter className="h-5 w-5 text-green" />
      },
      ...batchYears.map(year => ({
        value: year.toString(),
        label: `Batch ${year}`
      }))
    ];
  }, [batchYears]);

  // Filter alumni based on search query, selected batch, and visibility
  const filteredAlumni = useMemo(() => {
    if (!alumniProfiles) return [];
    
    return alumniProfiles.filter(alumni => {
      const matchesSearch = 
        alumni.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ((alumni as Profile).company?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        ((alumni as Profile).current_location?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      
      const matchesBatch = selectedBatch === 'all' || alumni.batch_year === selectedBatch;
      
      return matchesSearch && matchesBatch && alumni.is_public;
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
          <div className="flex flex-col gap-4">
            {/* Search Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
              
              <div className="relative">
                {/* Search Bar and Filter Layout */}
                <div className="flex items-center gap-4">
                  {/* Search Bar */}
                  <div className="relative flex-1">
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
                  <div className="w-[200px]">
                    <NotionDropdown
                      value={selectedBatch.toString()}
                      onChange={(value) => setSelectedBatch(value === 'all' ? 'all' : Number(value))}
                      options={batchOptions}
                      placeholder="Select Batch"
                      searchable={false}
                    />
                  </div>
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

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlumni.map((alumni) => (
            <motion.div
              key={alumni.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedAlumni(alumni)}
              className="bg-white rounded-2xl p-8 shadow-lg cursor-pointer relative group"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  {alumni.profile_picture_url ? (
                    <img
                      src={alumni.profile_picture_url}
                      alt={alumni.full_name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-neutral-light/50 flex items-center justify-center">
                      <User className="h-8 w-8 text-neutral-dark/30" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-green text-white p-1 rounded-full">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display text-xl text-neutral-dark">{alumni.full_name}</h3>
                  <p className="text-neutral-dark/70">Batch of {alumni.batch_year}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {alumni.occupation && (
                  <div className="flex items-center gap-3 text-neutral-dark/70">
                    <Briefcase className="h-5 w-5" />
                    <span>
                      {alumni.occupation}
                      {alumni.company && ` at ${alumni.company}`}
                    </span>
                  </div>
                )}
                {alumni.current_location && (
                  <div className="flex items-center gap-3 text-neutral-dark/70">
                    <MapPin className="h-5 w-5" />
                    <span>{alumni.current_location}</span>
                  </div>
                )}
              </div>

              {/* Details Link */}
              <div className="mt-6 pt-6 border-t border-neutral-light/30">
                <button
                  onClick={() => setSelectedAlumni(alumni)}
                  className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-2 group"
                >
                  <span>View Details</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

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
