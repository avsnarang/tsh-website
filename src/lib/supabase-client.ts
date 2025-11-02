import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    // In browser, show helpful error
    console.error(
      'Missing Supabase environment variables!\n\n' +
      'Please create a .env.local file in the root directory with:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n' +
      'See .env.example for all required variables.'
    );
  }
  throw new Error(
    'Missing required Supabase environment variables. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

// Client-side Supabase client (for use in client components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  }
});

// Server-side Supabase client (for use in server components and API routes)
export const createServerClient = () => {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    }
  );
};

