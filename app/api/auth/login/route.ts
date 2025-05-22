import { NextRequest, NextResponse } from 'next/server';
import { autenticarUsuario, obtenerPerfiles, obtenerEmpleado, firmarJWT, JwtPayload } from '@/services/auth';

export const POST = async (req: NextRequest) => {
  try {
    const { nacionalidad, documento, password } = await req.json();
    const user = await autenticarUsuario({ nacionalidad, documento, password });
    const perfiles = await obtenerPerfiles(user.tusu_co_usuario);
    const empleadoInfo = await obtenerEmpleado(user.tusu_co_nacionalidad, user.tusu_ci_rif_usuario);
    const payload: JwtPayload = {
      sub: user.tusu_co_usuario,
      nacionalidad: user.tusu_co_nacionalidad,
      documento: user.tusu_ci_rif_usuario,
      nombre: user.tusu_nm_usuario,
      email: user.tusu_email_usuario ?? null,
      empleado: empleadoInfo,
      perfiles,
    };
    const token = await firmarJWT(payload);
    const response = NextResponse.json({ ok: true });
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 15,
      path: '/',
      sameSite: 'lax',
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error de autenticación' }, { status: 401 });
  }
};
