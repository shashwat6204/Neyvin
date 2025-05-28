import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const { pathname } = request.nextUrl;

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();

  // If user is not logged in and trying to access protected route
  if (!session && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is logged in, verify they are an admin
  if (session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    // If not an admin, redirect to login
    if (profile?.role !== 'admin' && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If admin trying to access login page, redirect to jobs
    if (profile?.role === 'admin' && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/jobs', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};
