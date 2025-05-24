// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = 'mock-jwt-token'; // Replace with real JWT in production
    cookies().set('admin_token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ message: 'Login successful' });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
