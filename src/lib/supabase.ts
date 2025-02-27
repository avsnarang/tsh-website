import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with enhanced error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Keep user logged in after page refresh
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'tsh-auth-token',
    flowType: 'pkce'
  },
  global: {
    fetch: async (...args) => {
      const maxRetries = 3;
      let lastError;
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
          const response = await fetch(...args);
          if (!response.ok) {
            const error = new Error(`HTTP error! status: ${response.status}`);
            console.error('Supabase request failed', {
              url: args[0],
              status: response.status,
              body: await response.text()
            });
            throw error;
          }
          return response;
        } catch (err) {
          lastError = err;
          attempt++;
          
          if (attempt === maxRetries) {
            throw new Error('Failed to connect to database. Please try again later.');
          }
          
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
      throw lastError;
    }
  }
});

// Add error handling for failed connections
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Clear any cached data
    supabase.removeAllChannels();
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Auth token refreshed successfully');
  }
});

// Add connection health check
export const checkSupabaseConnection = async () => {
  try {
    // Try a simple query to check connection
    const { data, error } = await supabase
      .from('management_users')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase connection check failed:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Supabase connection check failed:', err);
    return false;
  }
};

// Add retry mechanism for failed requests
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};