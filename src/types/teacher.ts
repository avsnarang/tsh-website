export type Teacher = {
  id: string;
  full_name: string;
  profile_picture_url?: string;
  qualifications: string[];
  experience_years: number;
  designation: string;
  subject: string;
  class_level: 'NTT' | 'PRT' | 'TGT' | 'PGT';
  bio?: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};
