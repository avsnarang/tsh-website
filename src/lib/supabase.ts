import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file:\n' +
    `VITE_SUPABASE_URL: ${supabaseUrl ? 'set' : 'missing'}\n` +
    `VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'set' : 'missing'}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'tsh-auth-token',
    flowType: 'pkce'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

// Add connection health check with timeout
export const checkSupabaseConnection = async (timeoutMs = 5000): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const { data, error } = await supabase
      .from('gallery_events')
      .select('count', { count: 'exact', head: true })
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

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

// Initialize connection check
checkSupabaseConnection().then(isConnected => {
  if (!isConnected) {
    console.error('Failed to establish initial connection to Supabase');
  } else {
    console.log('Successfully connected to Supabase');
  }
});
