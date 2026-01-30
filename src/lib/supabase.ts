import { supabase as clientSupabase } from './supabase-client'

// Re-export the client for backward compatibility
export const supabase = clientSupabase

// Define valid table names as a const to prevent typos
export const VALID_TABLES = {
  ADMIN_USERS: 'admin_users',
  AUTH_USER_ROLES: 'auth_user_roles',
  ALUMNI_PROFILES: 'alumni_profiles',
  BLOG_CATEGORIES: 'blog_categories',
  BLOG_POSTS: 'blog_posts',
  EVENTS: 'events',
  EVENT_RSVPS: 'event_rsvps',
  FEATURED_TESTIMONIALS: 'featured_testimonials',
  GALLERY_EVENTS: 'gallery_events',
  GALLERY_IMAGES: 'gallery_images',
  LATEST_UPDATES: 'latest_updates',
  LEADERSHIP_MESSAGES: 'leadership_messages',
  STUDENTS: 'students',
  TESTIMONIALS: 'testimonials'
} as const;

// Type for valid table names
export type ValidTable = typeof VALID_TABLES[keyof typeof VALID_TABLES];

// Initialize function is no longer needed in Next.js but kept for compatibility
const initializeSupabase = async () => {
  try {
    await supabase.auth.getSession();
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return false;
  }
}

// Helper function to validate table name
export const isValidTable = (tableName: string): tableName is ValidTable => {
  return Object.values(VALID_TABLES).includes(tableName as ValidTable);
}

export { initializeSupabase }
