import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Archivo para la API cargo-mail

export async function GET() {
  try {
    const cargaCorreo = await prisma.oper_mov_flota.findMany(
      {
        where: {
          // opcc_id: null, // Filtrar por opcc_id nulo
          opcc_id: null
        }
      }
    );
    return NextResponse.json(cargaCorreo);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar rutas" }, { status: 500 });
  }
}