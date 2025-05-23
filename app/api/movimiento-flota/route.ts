import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar movimientos de flota
export async function GET() {
  try {
    const movimientos = await prisma.oper_mov_flota.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(movimientos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener movimientos' }, { status: 500 });
  }
}

// POST: Crear movimiento de flota
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const movimiento = await prisma.oper_mov_flota.create({ data });
    return NextResponse.json(movimiento, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear movimiento' }, { status: 500 });
  }
}
