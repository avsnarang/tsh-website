import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Star, Search, Filter, User, Quote, Briefcase, Building2 } from 'lucide-react';
import Container from '../../components/ui/Container';
import { useSEO } from '../../lib/seo';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSuccessStories } from '../../lib/queries';

interface SuccessStory {
  id: string;
  full_name: string;
  batch_year: number;
  occupation?: string;
  company?: string;
  bio?: string;
  profile_picture_url?: string;
  show_in_success: boolean;
}

export default function AlumniSuccess() {
  const { data: successStories = [], isLoading } = useSuccessStories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<number | 'all'>('all');

  useSEO({
    title: 'Alumni Success Stories | The Scholars Home',
    description: 'Discover inspiring success stories from The Scholars Home alumni community.'
  });

  // Get unique batch years
  const batchYears = useMemo(() => {
    const years = [...new Set(successStories.map((story: SuccessStory) => story.batch_year))];
    return years.sort((a: number, b: number) => b - a); // Sort in descending order
  }, [successStories]);

  // Filter stories based on search query, selected batch, and visibility
  const filteredStories = useMemo(() => {
    return (successStories as SuccessStory[])?.filter((story: SuccessStory) => {
      const matchesSearch = searchQuery === '' || (
        story.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const matchesBatch = selectedBatch === 'all' || story.batch_year === selectedBatch;
      
      // Only show profiles marked for success stories
      return matchesSearch && matchesBatch && story.show_in_success;
    });
  }, [successStories, searchQuery, selectedBatch]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
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
            <span className="font-semibold">Success Stories</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
            Our <span className="text-green">Alumni</span> Success Stories
          </h1>
          <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
            Inspiring journeys of our alumni making their mark in the world
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
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
            
            <div className="relative flex gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by name, profession, or story..."
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Stories Grid */}
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
              {filteredStories.map((story: SuccessStory, index: number) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden relative group"
                >
                  {/* Decorative Border */}
                  <div className="absolute -top-2 -right-2 w-full h-full border-2 border-orange rounded-2xl transition-all duration-300 group-hover:top-0 group-hover:right-0" />
                  <div className="absolute -bottom-2 -left-2 w-full h-full border-2 border-green rounded-2xl transition-all duration-300 group-hover:bottom-0 group-hover:left-0" />
                  
                  <div className="p-8 relative">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        {story.profile_picture_url ? (
                          <img
                            src={story.profile_picture_url}
                            alt={story.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-light/50 flex items-center justify-center">
                            <User className="h-10 w-10 text-neutral-dark/30" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-display text-2xl text-neutral-dark mb-1">
                          {story.full_name}
                        </h3>
                        <div className="flex items-center gap-2 text-green">
                          <Star className="h-4 w-4" />
                          <span className="font-medium">Class of {story.batch_year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Professional Details */}
                    <div className="space-y-3 mb-6">
                      {story.occupation && (
                        <div className="flex items-center gap-3 text-neutral-dark/70">
                          <Briefcase className="h-5 w-5" />
                          <span>{story.occupation}</span>
                        </div>
                      )}
                      {story.company && (
                        <div className="flex items-center gap-3 text-neutral-dark/70">
                          <Building2 className="h-5 w-5" />
                          <span>{story.company}</span>
                        </div>
                      )}
                    </div>

                    {/* Bio/Success Story */}
                    {story.bio && (
                      <div className="pt-6 border-t border-neutral-light">
                        <div className="flex items-center gap-3 mb-3">
                          <Quote className="h-5 w-5 text-green" />
                          <span className="font-medium text-neutral-dark">Success Story</span>
                        </div>
                        <p className="text-neutral-dark/70 line-clamp-4">
                          {story.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </ScrollReveal>
      </Container>
    </div>
  );
}
