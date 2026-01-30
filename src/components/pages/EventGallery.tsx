'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Masonry from 'react-masonry-css';
import { usePostHog } from 'posthog-js/react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';

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
  gallery_images: GalleryImage[];
}

export default function EventGallery() {
  const posthog = usePostHog();
  const params = useParams();
  const eventId = params?.eventId as string | undefined;
  const [event, setEvent] = useState<GalleryEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add these breakpoint values for the Masonry grid
  const breakpointColumnsObj = {
    default: 4, // 4 columns by default for larger screens
    1536: 4,    // 4 columns at 1536px
    1280: 3,    // 3 columns at 1280px
    1024: 2,    // 2 columns at 1024px
    640: 1      // 1 column at 640px
  };

  // Add this CSS at the top of your file or in your styles
  const masonryStyles = `
    .my-masonry-grid {
      display: flex;
      width: auto;
      padding: 0 1rem;
      gap: 1rem;
    }
    .my-masonry-grid_column {
      background-clip: padding-box;
    }
    @media (min-width: 768px) {
      .my-masonry-grid {
        padding: 0 2rem;
        gap: 2rem;
      }
    }
  `;

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId);
    }
  }, [eventId]);

  // Update breadcrumb label when event title is loaded
  useEffect(() => {
    if (event?.title) {
      BreadcrumbNav.setDynamicLabel(event.title);
    }
    return () => {
      // Reset the label when component unmounts
      BreadcrumbNav.setDynamicLabel('');
    };
  }, [event?.title]);

  const fetchEvent = async (id: string) => {
    try {
      setLoading(true);
      setError('');

      // First, fetch the event details
      const { data: eventData, error: eventError } = await supabase
        .from('gallery_events')
        .select(`
          id,
          title,
          description,
          date,
          campus,
          primary_image_url,
          primary_image_id
        `)
        .eq('id', id)
        .single();

      if (eventError) {
        console.error('Supabase error fetching event:', eventError);
        throw eventError;
      }

      if (!eventData) {
        throw new Error('Event not found');
      }

      // Then, fetch the associated images
      const { data: imagesData, error: imagesError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('eventID', id);

      if (imagesError) {
        console.error('Supabase error fetching images:', imagesError);
        throw imagesError;
      }

      // Combine the data without duplicating the primary image
      const completeEventData = {
        ...eventData,
        gallery_images: imagesData || []
      };

      setEvent(completeEventData);

      // Capture event view
      posthog?.capture('gallery_event_viewed', {
        event_id: id,
        event_title: eventData.title,
        event_campus: eventData.campus,
        event_date: eventData.date,
        image_count: imagesData?.length || 0,
      });
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  // Set SEO data when event is loaded

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <style>{masonryStyles}</style>
      
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
      <div className="relative flex-1 flex flex-col">
        {loading ? (
          // Loading State
          <div className="flex-1 pt-24">
            <Container>
              <div className="text-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 w-48 bg-neutral-200 rounded mx-auto"/>
                  <div className="h-4 w-64 bg-neutral-200 rounded mx-auto"/>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-neutral-200 rounded-2xl"/>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        ) : error || !event ? (
          // Error State
          <div className="flex-1 pt-24">
            <Container>
              <div className="text-center">
                <h1 className="text-4xl font-display text-neutral-dark mb-4">Event Not Found</h1>
                <p className="text-neutral-dark/70 mb-8">
                  The event you're looking for doesn't exist or has been removed.
                </p>
                <Link 
                  href="/gallery" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-lg 
                    hover:bg-green-dark transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Return to Gallery
                </Link>
              </div>
            </Container>
          </div>
        ) : (
          // Event Content
          <>
            {/* Header Section */}
            <div className="pb-12 relative z-10">
              <Container className="relative z-20">
                <div className="max-w-7xl mx-auto"> {/* Changed from max-w-3xl to max-w-4xl */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
                    <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
                    
                    <div className="relative">
                      <Link
                        href="/gallery"
                        className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-8 
                          px-4 py-2 rounded-lg hover:bg-primary/5"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Gallery
                      </Link>

                      <div className="text-center">
                        <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                          {event?.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-primary mb-4">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-light/20 text-green">
                            <Calendar className="h-5 w-5" />
                            <span className="text-sm"> {/* Added text-sm */}
                              {event && new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-light/20 text-orange">
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm"> {/* Added text-sm */}
                              {event?.campus}
                            </span>
                          </div>
                        </div>
                        <p className="text-base text-neutral-dark/80"> {/* Changed from text-xl to text-base */}
                          {event?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            {/* Gallery Section */}
            <div className="flex-1 pb-12">
              <Container>

                {event && (
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {[...event.gallery_images]
                      .sort(() => Math.random() - 0.5)
                      .map((image: GalleryImage) => (
                        <div 
                          key={image.id}
                          className="relative rounded-2xl overflow-hidden bg-white shadow-xl 
                            transform transition-all duration-300 hover:scale-[1.02] mb-8 last:mb-0"
                        >
                          {/* Decorative elements */}
                          <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
                          <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />

                          <div className="relative">
                            <Image
                              src={image.image_url}
                              alt={image.caption || event.title}
                              width={600}
                              height={400}
                              className="w-full h-auto"
                            />
                            {image.caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-neutral-dark/60 backdrop-blur-sm 
                                text-white p-4 text-sm" /* Added text-sm */
                              >
                                {image.caption}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </Masonry>
                )}
              </Container>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
