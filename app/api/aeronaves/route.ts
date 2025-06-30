import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const aviones = await prisma.oper_aviones.findMany({
      select: {
        opav_id_avion: true,
        opav_matricula_avion: true,
      },
      orderBy: { opav_matricula_avion: "asc" },
    });
    return NextResponse.json(aviones);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar aeronaves" }, { status: 500 });
  }
}