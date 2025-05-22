import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { laravelBcryptToNode } from '@/lib/utils';
import { jwtVerify, SignJWT } from 'jose';

// Tipos reutilizables
export interface Perfil {
  id: number | null;
  nombre: string | null;
}

export interface EmpleadoInfo {
  nacionalidad: string;
  documento: string;
  nombre: string;
  email: string | null;
}

export interface JwtPayload {
  sub: string;
  nacionalidad: string;
  documento: string;
  nombre: string;
  email: string | null;
  empleado: EmpleadoInfo | null;
  perfiles: Perfil[];
}

export async function autenticarUsuario({ nacionalidad, documento, password }: { nacionalidad: string; documento: string; password: string }) {
  if (!nacionalidad || !documento || !password) {
    throw new Error('Datos incompletos');
  }
  const user = await prisma.tecn_usuarios.findFirst({
    where: {
      tusu_co_nacionalidad: nacionalidad,
      tusu_ci_rif_usuario: documento,
    },
  });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const hash = laravelBcryptToNode(user.tusu_de_contrasena);
  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    throw new Error('Usuario o contraseña incorrectos');
  }
  return user;
}

export async function obtenerPerfiles(userId: string) {
  const perfilesDb = await prisma.tecn_usu_perfiles.findMany({
    where: { tsup_tusu_co_usuario: userId },
    include: { tecn_perfiles: true }
  });
  return perfilesDb.map(p => ({
    id: p.tecn_perfiles?.tepf_id_perfil ?? null,
    nombre: p.tecn_perfiles?.tepf_de_perfil ?? null
  }));
}

export async function obtenerEmpleado(nacionalidad: string, documento: string) {
  const empleado = await prisma.rrhh_empleados.findFirst({
    where: {
      rrem_co_nacionalidad_empl: nacionalidad,
      rrem_ci_rif_empl: documento
    },
    select: {
      rrem_co_nacionalidad_empl: true,
      rrem_ci_rif_empl: true,
      rrem_nm_empl: true,
      rrem_email_empl: true
    }
  });
  if (!empleado) return null;
  return {
    nacionalidad: empleado.rrem_co_nacionalidad_empl,
    documento: empleado.rrem_ci_rif_empl,
    nombre: empleado.rrem_nm_empl,
    email: empleado.rrem_email_empl ?? null
  };
}

export async function firmarJWT(payload: JwtPayload) {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET!);
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(secret);
  return token;
}

export async function verificarJWT(token: string): Promise<JwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    // Extraer solo las propiedades esperadas
    const {
      sub,
      nacionalidad,
      documento,
      nombre,
      email,
      empleado,
      perfiles
    } = payload as any;
    if (!sub) return null;
    return {
      sub: sub as string,
      nacionalidad: nacionalidad as string,
      documento: documento as string,
      nombre: nombre as string,
      email: email as string | null,
      empleado: empleado as EmpleadoInfo | null,
      perfiles: perfiles as Perfil[],
    };
  } catch (e) {
    console.error('verificarJWT error:', e);
    return null;
  }
}
