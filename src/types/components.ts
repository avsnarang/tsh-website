export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface LeaderMessage {
  id: string;
  name: string;
  role: string;
  preview: string;
  full_message: string;
  profile_image?: string;
}

export interface Achievement {
  title: string;
  value: string;
  icon: string;
  description: string;
}

export interface CampusActivity {
  title: string;
  image: string;
  description: string;
  link: string;
}

export interface CampusHighlight {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  photo_url?: string;
}
