import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// alternos


// GET: Listar movimientos de flota paginados
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
    const skip = (page - 1) * pageSize;
    // Ajuste en la consulta para incluir los datos necesarios
    const [movimientos, total] = await Promise.all([
      prisma.oper_mov_flota.findMany({
        orderBy: { created_at: "desc" },
        skip,
        take: pageSize,
        include: {
          oper_aviones: {
            select: { opav_matricula_avion: true },
          },
          oper_vuelos: {
            select: {
              opvu_co_vuelo: true,
              oper_ruta: {
                select: {
                  genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos: {
                    select: {
                      gear_co_iata_aeropuerto: true,
                      gear_nm_aeropuerto: true,
                    },
                  },
                  genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos: {
                    select: {
                      gear_co_iata_aeropuerto: true,
                      gear_nm_aeropuerto: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.oper_mov_flota.count(),
    ]);
    return NextResponse.json({ data: movimientos, total });
  } catch (error) {
    return NextResponse.json({ error: `Error al obtener movimientos, e: ${error}` }, { status: 500 });
  }
}

// POST: Crear movimiento de flota
export async function POST(req: NextRequest) {
  try {
    // extrae el jwt del header de la solicitud
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Token de autorización no proporcionado' }, { status: 401 });
    }

    // Verifica el token (aquí deberías implementar tu lógica de verificación)
    // Por ejemplo, podrías usar una función de verificación de JWT



    const data = await req.json();
    // Mapear los datos del frontend a los campos del modelo Prisma
    const movimiento = await prisma.oper_mov_flota.create({
      data: {
        opmf_opav_id_avion: Number(data.opmf_opav_id_avion),
        opmf_opvu_id_vuelo: Number(data.opmf_opvu_id_vuelo),
        etd: data.etd ?? null,
        // cpta: data.cpta ?? null,
        atd: data.atd ?? null,
        eta: data.eta ?? null,
        ata: data.ata ?? null,
        // a_pta: data.a_pta ?? null,
        pax: data.pax ?? null,
        // flight_time: data.flight_time ?? null,
        // block_time: data.block_time ?? null,
        fob: data.fob ?? null,
        fod: data.fod ?? null,
        fuel_consumed: data.fuel_consumed ?? null,
        // total_min_dly: data.total_min_dly ?? null,
        // delay_code_1: data.delay_code_1 ?? null,
        // delay_code_2: data.delay_code_2 ?? null,
        runway: data.runway ?? null,
        ldw: data.ldw ?? null,
        tow: data.tow ?? null,
        opmf_date: data.opmf_date ? new Date(data.opmf_date) : new Date(),
      },
    });
    return NextResponse.json(movimiento, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error al crear movimiento, e: ${error}` }, { status: 500 });
  }
}
