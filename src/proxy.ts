import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === (process.env.ADMIN_PASSWORD || 'secret123')) {
        return NextResponse.next();
      }
    }
    
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return intlMiddleware(req);
}

export const config = {
  // Match internationalized pathnames and admin
  matcher: ['/', '/(sr|en)/:path*', '/admin/:path*', '/admin']
};
