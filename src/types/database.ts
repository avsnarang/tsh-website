export interface Database {
  public: {
    Tables: {
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