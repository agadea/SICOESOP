import { NextRequest, NextResponse } from 'next/server';
import { verificarJWT, firmarJWT, JwtPayload } from '@/services/auth';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  const payload = await verificarJWT(token);
  if (!payload) {
    const res = NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    res.cookies.set('token', '', { maxAge: 0, path: '/' });
    return res;
  }
  // Renovar el token (sin cambiar los datos, solo refrescar expiración)
  const newToken = await firmarJWT(payload);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', newToken, {
    httpOnly: true,
    maxAge: 60 * 15,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}
