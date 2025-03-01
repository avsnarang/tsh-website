import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { GalleryEvent, GalleryImage } from '@/types';

export default function Gallery(): JSX.Element {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('gallery_events')
        .select('*, images(*)');
      
      if (error) throw error;
      setEvents(data as GalleryEvent[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEventCard = (event: GalleryEvent): JSX.Element => {
    return (
      <div key={event.id} className="event-card">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <span>{event.campus}</span>
      </div>
    );
  };

  const renderGalleryImages = (img: GalleryImage): JSX.Element => {
    return (
      <div key={img.id} className="gallery-image">
        <img src={img.url} alt={img.caption || 'Gallery image'} />
        {img.caption && <p>{img.caption}</p>}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="gallery-container">
      {events.map(renderEventCard)}
    </div>
  );
}
