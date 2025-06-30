import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Carga masiva de movimientos de flota
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'El cuerpo debe ser un arreglo de movimientos.' }, { status: 400 });
    }
    const errores: any[] = [];
    const movimientosValidos: any[] = [];
    data.forEach((mov, idx) => {
      const filaErrores = [];
      if (!mov.opmf_opav_id_avion) filaErrores.push('Falta id de aeronave');
      if (!mov.opmf_opvu_id_vuelo) filaErrores.push('Falta id de vuelo');
      if (!mov.opmf_date) filaErrores.push('Falta fecha');
      // Puedes agregar más validaciones aquí
      if (filaErrores.length > 0) {
        errores.push({ fila: idx + 1, errores: filaErrores });
      } else {
        movimientosValidos.push(mov);
      }
    });
    if (errores.length > 0) {
      return NextResponse.json({ error: 'Errores de validación', detalles: errores }, { status: 400 });
    }
    // Guardar en lote
    const result = await prisma.oper_mov_flota.createMany({
      data: movimientosValidos.map(mov => ({
        ...mov,
        opmf_opav_id_avion: Number(mov.opmf_opav_id_avion),
        opmf_opvu_id_vuelo: Number(mov.opmf_opvu_id_vuelo),
        opmf_date: mov.opmf_date ? new Date(mov.opmf_date) : new Date(),
      })),
      skipDuplicates: true,
    });
    return NextResponse.json({ ok: true, count: result.count });
  } catch (error) {
    let detalles = '';
    if (error && typeof error === 'object' && 'message' in error) {
      detalles = (error as any).message;
    } else {
      detalles = String(error);
    }
    return NextResponse.json({ error: 'Error en la carga masiva', detalles }, { status: 500 });
  }
}
