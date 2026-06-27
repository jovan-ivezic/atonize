import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Brišemo cookie postavljanjem datuma u prošlost
  response.cookies.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });

  return response;
}
