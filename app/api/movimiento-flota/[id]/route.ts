import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET movimiento individual
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const movimiento = await prisma.oper_mov_flota.findUnique({
      where: { opmf_id: Number(params.id) },
    });
    if (!movimiento) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(movimiento);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener movimiento' }, { status: 500 });
  }
}

// PUT: Editar movimiento
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const movimiento = await prisma.oper_mov_flota.update({
      where: { opmf_id: Number(params.id) },
      data,
    });
    return NextResponse.json(movimiento);
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar movimiento' }, { status: 500 });
  }
}

// DELETE: Eliminar movimiento
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.oper_mov_flota.delete({
      where: { opmf_id: Number(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar movimiento' }, { status: 500 });
  }
}
