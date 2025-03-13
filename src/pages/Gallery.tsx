import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/ui/Container';
import { Calendar, ArrowRight, MapPin, Camera, Image, Search, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useSEO } from '../lib/seo';
import { motion } from 'framer-motion';
import GalleryCardSkeleton from '../components/gallery/GalleryCardSkeleton';
import NotionDropdown from '../components/ui/NotionDropdown';

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
}

interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  campus: string;
  primary_image_url?: string;
  primary_image_id?: string;
  gallery_images: GalleryImage[];
}

interface EventsByYear {
  [key: number]: GalleryEvent[];
}

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedCampus, setSelectedCampus] = useState<string>('All Campuses');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [campuses, setCampuses] = useState<string[]>(['All Campuses']);
  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`/gallery/event/${eventId}`);
  };

  useEffect(() => {
    fetchGalleryEvents();
  }, []);

  useSEO({
    title: "Photo Gallery | The Scholars' Home",
    description: "Browse through our photo gallery showcasing school events, activities, and memorable moments at The Scholars' Home.",
    url: "https://tsh.edu.in/gallery"
  });

  const fetchGalleryEvents = async () => {
    try {
      setLoading(true);
      setError('');

      // First fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('gallery_events')
        .select('*')
        .order('date', { ascending: false });

      if (eventsError) throw eventsError;

      // Then fetch images for all events using the correct column name 'eventID'
      const { data: imagesData, error: imagesError } = await supabase
        .from('gallery_images')
        .select('*')
        .in('eventID', eventsData.map(event => event.id));

      if (imagesError) throw imagesError;

      // Combine the data
      const combinedData = eventsData.map(event => ({
        ...event,
        gallery_images: imagesData.filter(img => img.eventID === event.id)
      }));

      const uniqueCampuses = ['All Campuses', ...new Set(combinedData.map(event => event.campus))];
      setCampuses(uniqueCampuses);
      setEvents(combinedData);
    } catch (err) {
      console.error('Error fetching gallery events:', err);
      setError('Failed to load gallery events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const eventYear = new Date(event.date).getFullYear();
    const yearMatch = selectedYear === 'all' || eventYear === selectedYear;
    const campusMatch = selectedCampus === 'All Campuses' || event.campus === selectedCampus;
    const searchMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatch && campusMatch && searchMatch;
  });

  const groupedEvents = filteredEvents.reduce<EventsByYear>((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  const years = Object.keys(groupedEvents)
    .map(Number)
    .sort((a, b) => b - a);

  const getEventImage = (event: GalleryEvent) => {
    if (event.primary_image_url) {
      return event.primary_image_url;
    }
    
    if (event.primary_image_id && event.gallery_images) {
      const primaryImage = event.gallery_images.find(img => img.id === event.primary_image_id);
      if (primaryImage) return primaryImage.image_url;
    }
    
    if (event.gallery_images && event.gallery_images.length > 0) {
      return event.gallery_images[0].image_url;
    }
    
    return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80';
  };

  const yearOptions = [
    { 
      value: 'all', 
      label: 'All Years',
      icon: <Calendar className="h-5 w-5 text-green" />
    },
    ...years.map((year) => ({
      value: year.toString(),
      label: `Year ${year}`,
      icon: <Calendar className="h-5 w-5 text-green" />
    }))
  ];

  const campusOptions = campuses.map((campus) => ({
    value: campus,
    label: campus,
    icon: <MapPin className="h-5 w-5 text-green" />
  }));

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
        <Container>
          <div className="text-center text-red-600">{error}</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light w-full">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30 animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30 animate-pulse" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col w-full pt-24 pb-24">
        <Container className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <ScrollReveal>
            <div className="flex-1 text-center mb-16">
              <motion.div
                className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-8 mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">CAPTURED MOMENTS</span>
              </motion.div>

              <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
                <span className="text-green">Memories</span> in{" "}
                <span className="text-orange">Motion</span>
              </h1>

              <p className="text-lg text-neutral-dark/70 mb-8 max-w-2xl mx-auto">
                Journey through our visual storytelling, where every photograph captures the essence of life at The Scholars' Home.
              </p>
            </div>
          </ScrollReveal>

          {/* Filters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-visible">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl z-[1]" />
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl z-[1]" />
                
                <div className="relative z-[2]">
                  {/* Filters content */}
                  <div className="relative flex flex-col md:flex-row gap-4">
                    {/* Year Filter */}
                    <div className="relative flex-1 z-[30]">
                      <NotionDropdown
                        value={selectedYear.toString()}
                        onChange={(value) => setSelectedYear(value === 'all' ? 'all' : Number(value))}
                        options={yearOptions}
                        placeholder="Select Year"
                        searchable={false}
                        className="w-full"
                      />
                    </div>

                    {/* Campus Filter */}
                    <div className="relative flex-1 z-[20]">
                      <NotionDropdown
                        value={selectedCampus}
                        onChange={(value) => setSelectedCampus(value)}
                        options={campusOptions}
                        placeholder="Select Campus"
                        searchable={false}
                        className="w-full"
                      />
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 z-[10]">
                      <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-4 pl-12 rounded-lg border-2 border-neutral-dark/10 
                          focus:ring-2 focus:ring-green/20 focus:border-green
                          text-neutral-dark placeholder:text-neutral-dark/50
                          transition-all duration-200"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-green" />
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(selectedYear !== 'all' || selectedCampus !== 'All Campuses' || searchQuery) && (
                    <div className="mt-4 flex flex-wrap gap-2 relative z-[5]">
                      {selectedYear !== 'all' && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-light/20 text-green text-sm relative">
                          Year: {selectedYear}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedYear('all');
                            }}
                            className="p-1 hover:text-green-dark transition-colors cursor-pointer z-30"
                            aria-label="Clear year filter"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      )}
                      {selectedCampus !== 'All Campuses' && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-light/20 text-orange text-sm relative">
                          Campus: {selectedCampus}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCampus('All Campuses');
                            }}
                            className="p-1 hover:text-orange-dark transition-colors cursor-pointer z-30"
                            aria-label="Clear campus filter"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-dark/10 text-neutral-dark text-sm relative">
                          Search: {searchQuery}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery('');
                            }}
                            className="p-1 hover:text-neutral-dark/70 transition-colors cursor-pointer z-30"
                            aria-label="Clear search filter"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Show skeleton cards while loading
              [...Array(9)].map((_, index) => (
                <ScrollReveal key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <GalleryCardSkeleton />
                  </motion.div>
                </ScrollReveal>
              ))
            ) : filteredEvents.length === 0 ? (
              <ScrollReveal className="col-span-full">
                <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
                  <Image className="h-16 w-16 text-neutral-dark/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-dark mb-2">No Events Found</h3>
                  <p className="text-neutral-dark/70">Try adjusting your filters or search terms</p>
                </div>
              </ScrollReveal>
            ) : (
              filteredEvents.map((event) => (
                <ScrollReveal key={event.id}>
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl transform transition-all duration-300 hover:scale-[1.02] group">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
                    <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
                    
                    {/* Content */}
                    <div className="relative">
                      <div className="h-64 overflow-hidden">
                        <img
                          src={getEventImage(event)}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-4 text-sm text-primary mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.campus}</span>
                          </div>
                        </div>
                      
                        <h3 className="text-2xl font-display text-neutral-dark mb-3 group-hover:text-green transition-colors">
                          {event.title}
                        </h3>
                      
                        <p className="text-neutral-dark/70 mb-6 line-clamp-2">
                          {event.description}
                        </p>

                        <button
                          onClick={() => handleEventClick(event.id)}
                          className="group flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl border-2 border-green text-green hover:bg-green-light/10 transition-all duration-300"
                        >
                          View Gallery
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
