// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  const isProtected = request.nextUrl.pathname.startsWith('/admin') &&
                      !request.nextUrl.pathname.startsWith('/admin/login');

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
