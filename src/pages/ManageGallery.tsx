import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';

interface Image {
  id?: string;
  url: string;
  caption: string;
  image_url?: string;
}

interface FormData {
  title: string;
  description: string;
  date: string;
  campus: string;
  primary_image_id?: string;
  images: Image[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  campus: string;
  primary_image_id?: string;
  gallery_images?: Image[];
}

export default function ManageGallery() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    campus: '',
    primary_image_id: undefined,
    images: [{ url: '', caption: '' }]
  });

  const [editingEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string>('');

  const updateImageField = (index: number, field: keyof Image, value: string) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages[index] = { ...newImages[index], [field]: value };
      return { ...prev, images: newImages };
    });
  };

  const handleImageUploads = async (eventData: Event) => {
    const imagePromises = formData.images.map(async (image) => {
      const { error } = await supabase
        .from('gallery_images')
        .insert({
          event_id: eventData.id,
          image_url: image.url,
          caption: image.caption
        });
      return error;
    });

    await Promise.all(imagePromises);
    return { error: null };
  };

  const handleSubmit = async () => {
    try {
      if (editingEvent) {
        const { error: updateError } = await supabase
          .from('gallery_events')
          .update({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            campus: formData.campus,
            primary_image_id: formData.primary_image_id
          })
          .eq('id', editingEvent.id);

        if (updateError) throw updateError;
      } else {
        const { data: eventData, error: eventError } = await supabase
          .from('gallery_events')
          .insert({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            campus: formData.campus,
            primary_image_id: null
          })
          .select()
          .single();

        if (eventError) throw eventError;

        const { error: imagesError } = await handleImageUploads(eventData);
        if (imagesError) throw imagesError;
        
        if (eventData) {
          const { data: imageData } = await supabase
            .from('gallery_images')
            .select('id')
            .eq('event_id', eventData.id)
            .order('created_at', { ascending: true })
            .limit(1)
            .single();

          if (imageData) {
            const { error: updateError } = await supabase
              .from('gallery_events')
              .update({ primary_image_id: imageData.id })
              .eq('id', eventData.id);

            if (updateError) throw updateError;
          }
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="space-y-4">
      {editingEvent?.gallery_images?.map((image) => (
        <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={image.image_url}
            alt={image.caption || ''}
            className="w-14 h-14 object-cover"
          />
          {editingEvent.primary_image_id === image.id && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <span className="text-xs text-white bg-primary/80 px-2 py-1 rounded-full">Primary</span>
            </div>
          )}
          {image.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-neutral-dark/60 text-neutral-light p-2 text-sm">
              {image.caption}
            </div>
          )}
        </div>
      ))}

      {formData.images.map((image, index) => (
        <div key={index}>
          <label className="block text-neutral-dark mb-2">Image URL</label>
          <div className="flex gap-4">
            <input
              type="url"
              value={image.url}
              onChange={(e) => updateImageField(index, 'url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-grow px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              onBlur={(e) => {
                const url = e.target.value.trim();
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                  setError('Please enter a valid URL starting with http:// or https://');
                }
              }}
            />
            <Button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, primary_image_id: image.url ? index.toString() : undefined }))}
              variant={formData.primary_image_id === index.toString() ? 'primary' : 'outline'}
              className="shrink-0"
            >
              Set as Primary
            </Button>
          </div>
          {image.url && (
            <img src={image.url} alt="" className="mt-2 w-14 h-14 object-cover rounded" />
          )}
        </div>
      ))}
    </div>
  );
}
