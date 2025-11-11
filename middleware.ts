import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route requires authentication
  const isAdminRoute = pathname.startsWith('/admin');
  const isAlumniRoute = pathname.startsWith('/alumni/directory') || pathname.startsWith('/alumni/profile');
  const isLoginPage = pathname === '/login';

  // If it's a protected route, check authentication
  if (isAdminRoute || isAlumniRoute) {
    try {
      // Get session token from cookies
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Get session from cookies
      const sessionCookie = request.cookies.get('sb-access-token');
      const refreshCookie = request.cookies.get('sb-refresh-token');

      if (!sessionCookie && !refreshCookie) {
        // No session, redirect to login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
      }

      // For admin routes, we could add additional role checking here
      // but we'll handle that in the components for now

    } catch (error) {
      console.error('Auth middleware error:', error);
      // On error, redirect to login
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If user is logged in and trying to access login page, redirect to home
  if (isLoginPage) {
    const sessionCookie = request.cookies.get('sb-access-token');
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/alumni/directory',
    '/alumni/profile',
    '/login'
  ]
};

