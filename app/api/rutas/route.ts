import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const rutas = await prisma.oper_ruta.findMany();
    return NextResponse.json(rutas);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar rutas" }, { status: 500 });
  }
}
