export interface SuccessStory {
  id: string;
  title: string;
  content: string;
  created_at: string;
  alumni_profiles: {
    id: string;
    full_name: string;
    occupation?: string;
    company?: string;
    profile_picture_url?: string;
  };
}

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
  show_in_success: boolean;
  created_at?: string;
  updated_at?: string;
}
