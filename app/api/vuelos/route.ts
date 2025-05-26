import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const vuelos = await prisma.oper_vuelos.findMany({
      select: {
        opvu_co_vuelo: true,
        opvu_id_vuelo: true,
        opvu_fe_modif: true,
        oper_itinerarios: {
          select: {
            opit_opru_id_ruta: true,
            oper_ruta: {
              select: {
                opru_gear_aerop_origen: true,
                opru_gear_aerop_destino: true,
                genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos: {
                  select: {
                    gear_co_iata_aeropuerto: true,
                  }
                },
                genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos: {
                  select: {
                    gear_co_iata_aeropuerto: true,
                  }
                }
              }
            }
          },
        },
      },
      where: {
        opvu_co_status: {
          not: 0,
        },
      },
      orderBy: { opvu_fe_modif: "asc" },
    });
    return NextResponse.json(vuelos);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar vuelos" }, { status: 500 });
  }
}
