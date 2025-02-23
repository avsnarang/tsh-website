export interface Profile {
  full_name: string;
  batch_year: number;
  current_location: string;
  occupation: string;
  company: string;
  bio: string;
  linkedin_url: string;
  is_public: boolean;
  profile_picture_url?: string;
  phone?: string;
  email?: string;
  instagram_url?: string;
  facebook_url?: string;
  show_contact_info: boolean;
  testimonial?: string;
  show_testimonial: boolean;
}

export interface CampusInfo {
  name: string;
  tagline: string;
  description: string;
  registrationUrl: string;
  features: {
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  facilities: {
    title: string;
    description: string;
    image: string;
  }[];
  achievements: {
    title: string;
    description: string;
    year: string;
  }[];
}