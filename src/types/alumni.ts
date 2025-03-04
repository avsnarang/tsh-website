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