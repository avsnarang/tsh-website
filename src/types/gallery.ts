export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  year: number;
  campus: string;
  description: string;
  thumbnail: string;
  images: string[];
}

export interface GalleryEventProps {
  event: GalleryEvent;
}

export interface EventsByYear {
  [key: number]: GalleryEvent[];
}