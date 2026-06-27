import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const session = req.cookies.get('admin_session');
    
    if (session?.value === 'authenticated') {
      return NextResponse.next();
    }
    
    // Redirect unauthenticated users to login page
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  // Match internationalized pathnames and admin
  matcher: ['/', '/(sr|en)/:path*', '/admin/:path*', '/admin']
};
