export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  year: number;
  campus: string;
  description: string;
  primary_image_url?: string;
  primary_image_id?: string;
  thumbnail: string;
  images: string[];
  gallery_images: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
}

export interface GalleryEventProps {
  event: GalleryEvent;
}

export interface EventsByYear {
  [key: number]: GalleryEvent[];
}
