export interface Profile {
  id: string;
  full_name: string;
  batch_year: number;
  occupation: string;
  company?: string;
  current_location: string;
  bio?: string;
  email: string;
  phone?: string;
  profile_picture_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  show_contact_info: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
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
