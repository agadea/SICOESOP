import { NextRequest, NextResponse } from 'next/server';
import { verificarJWT } from '@/services/auth';

const PUBLIC_PATHS = [
  '/api/auth/login',
  '/api/auth/session',
  '/sign-in',
  '/sign-up',
  '/favicon.ico',
  '/robots.txt',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Permitir acceso a rutas públicas
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p)) || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const payload = await verificarJWT(token);
  if (payload) {
    return NextResponse.next();
  } else {
    // Solo redirigir, no limpiar cookie aquí
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/.*|public|robots.txt).*)',
  ],
};