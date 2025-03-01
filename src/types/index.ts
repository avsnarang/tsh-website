export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  event_id: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  campus: string;
  primary_image_id?: string;
  images?: GalleryImage[];
}

export interface Student {
  id: string;
  admission_number: string;
  full_name: string;
  class: string;
}

export interface Testimonial {
  id: string;
  name: string;
  batch: string;
  content: string;
  image_url: string;
  source_type: 'alumni' | 'student' | 'parent';
}

export interface EventRSVP {
  id: string;
  event_id: string;
  admission_number: string;
  status: 'attending' | 'not_attending';
  guests: number;
}