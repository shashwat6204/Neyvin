import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin/jobs)
  const path = request.nextUrl.pathname;

  // If it's the admin login page, allow access
  if (path === '/admin/login') {
    return NextResponse.next();
  }

  // Check if it's an admin path that should be protected
  const isAdminPath = path.startsWith('/admin');
  if (!isAdminPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  // Validate the token
  if (!token) {
    // Redirect to login if there's no token
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify the token
    verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/jobs/:path*',
  ],
} 