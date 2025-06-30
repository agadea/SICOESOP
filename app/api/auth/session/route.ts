import { NextRequest, NextResponse } from 'next/server';
import { verificarJWT } from '@/services/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  const payload = await verificarJWT(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  // Solo enviar datos mínimos necesarios
  const nombre = payload.nombre || "";
  const codigoEmpleado = payload.empleado?.documento || payload.documento || payload.sub || "-";
  return NextResponse.json({
    authenticated: true,
    user: {
      nombre,
      codigoEmpleado
    }
  }, { status: 200 });
}

export async function POST(req: NextRequest) {
  // ...si aplica, implementar POST para session...
}
