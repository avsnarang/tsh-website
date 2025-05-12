export type Schedule = {
  type: 'Weekday' | 'Weekend' | 'Summer' | 'Winter';
  timings: string[];
  notes?: string;
}

export interface Sport {
  id: string;
  name: string;
  category: string;
  description: string;
  coach: string;
  achievements: string;
  age_groups: string[];
  schedules: any;
  images: SportImages;
  is_published: boolean;
}

export interface Database {
  public: {
    Tables: {
      sports_programs: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          coach: string;
          schedules: Schedule[];
          achievements: string;
          image: string;
          levels: string[];
          facilities: SportFacility[];
          training_schedule: Record<string, string[]>;
          images: SportImages;
          created_at: string;
        };
        Insert: Omit<Tables['sports_programs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Tables['sports_programs']['Row'], 'id' | 'created_at'>>;
      };
      leadership_messages: {
        Row: {
          id: string
          role: string
          name: string
          preview: string
          full_message: string
          order: number
          created_at: string
        }
      }
      featured_testimonials: {
        Row: {
          id: string
          alumni_profile_id: string
          is_visible: boolean
          created_at: string
        }
      }
      gallery_events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          campus: string
          created_at: string
        }
      }
      management_users: {
        Row: {
          id: string
          role: string
          created_at: string
        }
      }
    }
  }
}
