import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cargaCorreo = (await prisma.oper_mov_flota.findMany(
      {
        where: {
          opcc_id: null
        },
        orderBy: {
          opmf_date: "desc"
        },
        select: {
          opmf_id: true,
          opmf_date: true,
          oper_aviones: {
            select: {
              opav_matricula_avion: true
            }
          },
          oper_vuelos: {
            select: {
              opvu_co_vuelo: true,
              oper_ruta: {
                select: {
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
            }
          }
        }
      }
    )).map((movement) => ({
      opmf_id: movement.opmf_id,
      opmf_date: movement.opmf_date,
      opav_matricula_avion: movement.oper_aviones.opav_matricula_avion || null,
      opvu_co_vuelo: movement.oper_vuelos.opvu_co_vuelo || null,
      gear_co_iata_aeropuerto_origin: movement.oper_vuelos.oper_ruta
        ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos
        ?.gear_co_iata_aeropuerto || null,
      gear_co_iata_aeropuerto_destination: movement.oper_vuelos.oper_ruta
        ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos
        ?.gear_co_iata_aeropuerto || null
    }))
    return NextResponse.json(cargaCorreo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar rutas" }, { status: 500 });
  }
}