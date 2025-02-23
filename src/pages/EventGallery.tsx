import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<GalleryEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId);
    }
  }, [eventId]);

  const fetchEvent = async (id: string) => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('gallery_events')
        .select(`
          *,
          gallery_images (
            id,
            image_url,
            caption
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Failed to load gallery event');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center">Loading gallery...</div>
        </Container>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl text-neutral-dark mb-4">Event Not Found</h1>
            <Link to="/gallery" className="text-primary hover:text-primary-dark">
              Return to Gallery
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="mb-12">
          <Link
            to="/gallery"
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl text-neutral-dark mb-4">{event.title}</h1>
            <div className="flex items-center gap-4 text-primary mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.campus}</span>
              </div>
            </div>
            <p className="text-xl text-neutral-dark/80">{event.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {event.gallery_images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.image_url}
                alt={image.caption || `${event.title} - Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {image.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-dark/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-neutral-light">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}