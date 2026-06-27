import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json({ error: 'Server misconfiguration: ADMIN_PASSWORD is not set' }, { status: 500 });
    }

    if (username === 'admin' && password === expectedPassword) {
      // Uspešan login
      const response = NextResponse.json({ success: true });
      
      // Postavljamo secure HTTP-Only cookie koji middleware proverava
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 dana
      });

      return response;
    }

    return NextResponse.json({ error: 'Nevažeći kredencijali' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Došlo je do greške' }, { status: 500 });
  }
}
