import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/platform', '/formateur', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('access_token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérification du rôle pour les routes admin/formateur
  // Le JWT est décodé côté client — pour le middleware on vérifie juste la présence du token
  // La vraie vérif de rôle est faite dans les API calls (backend NestJS)
  return NextResponse.next();
}

export const config = {
  matcher: ['/platform/:path*', '/formateur/:path*', '/admin/:path*'],
};
