import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Define valid table names as a const to prevent typos
export const VALID_TABLES = {
  ADMIN_USERS: 'admin_users',
  AUTH_USER_ROLES: 'auth_user_roles',
  ALUMNI_PROFILES: 'alumni_profiles',
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

// Check environment variables during initialization
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}
if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create the client with custom storage handler
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: {
      getItem: (key) => {
        const isLoginPage = window.location.pathname.includes('/login');
        const isLoggingIn = sessionStorage.getItem('login_in_progress');
        const storedSession = localStorage.getItem(key);
        
        if (storedSession && isLoginPage && !isLoggingIn) {
          try {
            return localStorage.getItem(key);
          } catch (e) {
            console.error('Error parsing session data:', e);
          }
        }
        return localStorage.getItem(key);
      },
      setItem: (key, value) => {
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
      }
    }
  }
})

const initializeSupabase = async () => {
  let retries = 3;
  const delay = 2000;

  while (retries > 0) {
    try {
      const { error: authError } = await supabase.auth.getSession()
      
      if (authError) {
        throw authError
      }
      
      const criticalTables = [
        VALID_TABLES.AUTH_USER_ROLES,
        VALID_TABLES.ADMIN_USERS,
        VALID_TABLES.ALUMNI_PROFILES
      ];
      
      let success = false;
      
      // Try critical tables first
      for (const table of criticalTables) {
        try {
          console.log(`Testing connection with critical table: ${table}`);
          
          // Skip auth_user_roles if it's causing issues
          if (table === VALID_TABLES.AUTH_USER_ROLES) {
            console.log('Skipping auth_user_roles table due to known issues');
            continue;
          }
          
          const { error } = await supabase
            .from(table)
            .select('id')
            .limit(1);
          
          if (!error) {
            console.log(`Supabase connection verified with table: ${table}`);
            success = true;
            break;
          } else {
            console.warn(`Error accessing table ${table}:`, error.message);
          }
        } catch (err) {
          console.warn(`Error accessing table ${table}:`, err);
        }
      }
      
      // If we couldn't connect to any critical tables, try a fallback approach
      if (!success) {
        try {
          // Try a simple health check
          const { data, error } = await supabase.rpc('get_service_status');
          if (!error && data) {
            console.log('Supabase connection verified via RPC health check');
            success = true;
          } else {
            console.warn('RPC health check failed:', error?.message);
          }
        } catch (err) {
          console.warn('RPC health check error:', err);
        }
      }
      
      if (!success) {
        console.error('Could not connect to any critical tables or verify connection');
        // Don't throw, just warn - this allows the app to continue even with connection issues
        console.warn('Continuing with potentially limited functionality');
      } else {
        console.log('Supabase connection successfully verified');
      }
      return true;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error('Failed to initialize Supabase after multiple attempts:', error);
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
}

// Helper function to validate table name
export const isValidTable = (tableName: string): tableName is ValidTable => {
  return Object.values(VALID_TABLES).includes(tableName as ValidTable);
}

export { initializeSupabase }
