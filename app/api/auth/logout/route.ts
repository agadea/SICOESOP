import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Limpiar cookie de token
  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', '', { maxAge: 0, path: '/' });
  return res;
}
