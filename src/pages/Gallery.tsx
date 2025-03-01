import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Title from '../components/utils/Title';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { useSEO } from '../lib/seo';

interface GalleryImage {
  id: string;
  url: string;
  // add other properties as needed
}

interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  // add other properties as needed
}

interface EventsByYear {
  [key: number]: GalleryEvent[];
}

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedCampus, setSelectedCampus] = useState<string>('All Campuses');
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [campuses, setCampuses] = useState<string[]>(['All Campuses']);

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

      const { data, error } = await supabase
        .from('gallery_events')
        .select(`
          id,
          title,
          description,
          date,
          campus,
          primary_image_id,
          gallery_images!gallery_images_event_id_fkey (
            id,
            image_url,
            caption
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;

      // Extract unique campuses
      const uniqueCampuses = ['All Campuses', ...new Set(data?.map(event => event.campus) || [])];
      setCampuses(uniqueCampuses);

      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching gallery events:', err);
      setError('Failed to load gallery events');
    } finally {
      setLoading(false);
    }
  };

  // Group events by year
  const eventsByYear = events.reduce<EventsByYear>((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  // Get unique years for filter
  const years = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Filter events based on selected year and campus
  const filteredEvents = events.filter(event => {
    const eventYear = new Date(event.date).getFullYear();
    const yearMatch = selectedYear === 'all' || eventYear === selectedYear;
    const campusMatch = selectedCampus === 'All Campuses' || event.campus === selectedCampus;
    return yearMatch && campusMatch;
  });

  // Group filtered events by year
  const groupedEvents = filteredEvents.reduce<EventsByYear>((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
        <Container>
          <div className="text-center text-red-600">
            {error}
          </div>
        </Container>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
        <Container>
          <div className="text-center">
            Loading gallery...
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Title title="Photo Gallery" description="Capturing Moments and Memories" />
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-6">Photo Gallery</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body max-w-2xl mx-auto mb-12">
                Relive the memorable moments from our school events and activities
              </p>
            </TextReveal>

            {/* Filters */}
            <div className="space-y-8">
              {/* Year Filter */}
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setSelectedYear('all')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedYear === 'all'
                      ? 'bg-primary text-neutral-light'
                      : 'bg-white text-primary hover:bg-primary/10'
                  }`}
                >
                  All Years
                </button>
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      selectedYear === year
                        ? 'bg-primary text-neutral-light'
                        : 'bg-white text-primary hover:bg-primary/10'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Campus Filter */}
              <div className="flex justify-center gap-4 flex-wrap">
                {campuses.map(campus => (
                  <button
                    key={campus}
                    onClick={() => setSelectedCampus(campus)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      selectedCampus === campus
                        ? 'bg-primary text-neutral-light'
                        : 'bg-white text-primary hover:bg-primary/10'
                    }`}
                  >
                    {campus}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-16">
          {Object.entries(groupedEvents)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, yearEvents]) => (
              <div key={year}>
                <h2 className="text-3xl text-neutral-dark mb-8 border-b border-primary/20 pb-4">
                  {year}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {yearEvents.map((event) => (
                    <Link
                      key={event.id}
                      to={`/gallery/${event.id}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            event.primary_image_url || // First try primary_image_url
                            (event.primary_image_id ? // Then try to find image by primary_image_id
                              event.gallery_images.find(img => img.id === event.primary_image_id)?.image_url
                            : event.gallery_images[0]?.image_url) || // Fall back to first image
                            'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80' // Default fallback
                          }
                          alt={event.title}
                          className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl text-neutral-light mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-primary-light">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{event.campus}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-neutral-dark/80 mb-4">{event.description}</p>
                        <div className="flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors">
                          View Gallery
                          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-2" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          {Object.keys(groupedEvents).length === 0 && (
            <div className="text-center text-neutral-dark/60">
              No gallery events found for the selected filters.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
