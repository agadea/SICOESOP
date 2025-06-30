import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const itinerarios = await prisma.oper_itinerarios.findMany();
    return NextResponse.json(itinerarios);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar itinerarios" }, { status: 500 });
  }
}
