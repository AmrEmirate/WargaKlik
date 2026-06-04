import { NextResponse } from 'next/server';

/**
 * Next.js Edge Middleware — Route Guard
 * FIX: Protects /dashboard routes at the server level, not just client-side.
 * This prevents unauthenticated direct URL access before React loads.
 */

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard'];

// Routes only for guests (redirect to dashboard if already logged in)
const GUEST_ONLY_ROUTES = ['/login', '/activate', '/reset-password'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isGuestOnly = GUEST_ONLY_ROUTES.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/activate pages
  if (isGuestOnly && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Role-Based Access Control (RBAC) for Admin pages
  if (pathname.startsWith('/dashboard/admin') && token) {
    try {
      // Decode JWT payload (part 2 of header.payload.signature)
      const payloadBase64 = token.split('.')[1];
      // base64url to base64
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const payloadString = Buffer.from(base64, 'base64').toString('utf8');
      const payload = JSON.parse(payloadString);

      if (payload.role === 'warga') {
        // Warga cannot access admin pages
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (err) {
      console.error('Failed to parse token in middleware:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and API routes:
     * - _next/static (Next.js assets)
     * - _next/image (Next.js image optimization)
     * - favicon.ico
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
