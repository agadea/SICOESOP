
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { oper_pacc_estado_enum, oper_pacc_tipo_enum } from "@/lib/generated/prisma";

// Archivo para la API cargo-mail

// Ajustar los valores para que coincidan con los tipos esperados por Prisma
const estadoEnum: Record<string, oper_pacc_estado_enum> = {
  embarcada: "Embarcada",
  desembarcada: "Desembarcada",
  enTransito: "En_tr_nsito",
};

const tipoEnum: Record<string, oper_pacc_tipo_enum> = {
  paga: "Paga",
  cortesia: "Cortes_a",
};

export async function GET() {
  try {
    const cargaCorreo = await prisma.oper_pax_carga_correo.findMany(
      {
        orderBy: {
          opcc_id: "desc",
        },
        select: {
          opcc_id: true,
          oper_mov_flota: {
            select: {
              opmf_date: true,
              oper_aviones: {
                select: {
                  opav_matricula_avion: true,
                  opav_tipo_fuel_avion: true,
                  opav_ca_passenger: true,
                  oper_modelo_aeronaves: {
                    select: {
                      opar_nm_mod_aeronave: true,
                    }
                  }
                },
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
                      },
                    }
                  },
                }
              }
            }
          },
          oper_carga: {
            select: {
              valor: true,
              estado: true,
              tipo: true,
            }
          },
          oper_correo: {
            select: {
              valor: true,
              estado: true,
              tipo: true,
            }
          },
          oper_pax: {
            select: {
              valor: true,
              estado: true,
              tipo: true,
            }
          },
        }
      }
    );
    return NextResponse.json(cargaCorreo);
  } catch (error) {
    return NextResponse.json({ error: `Error al consultar rutas, ${error}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const bodyMapped = mapRequestBody(data);

    validateRequestBody(bodyMapped);

    // Validar que el opmf_id no se esté repitiendo
    const existingMovFlota = await prisma.oper_mov_flota.findUnique({
      where: { opmf_id: bodyMapped.opmf_id },
    });

    if (existingMovFlota && existingMovFlota.opcc_id) {
      return NextResponse.json({
        error: "El movimiento de flota ya tiene una carga y correo asociados.",
        code: "MOV_FLOTA_DUPLICADO"
      }, { status: 400 });
    }

    const newPaxCargaCorreo = await createPaxCargaCorreo(bodyMapped);

    const newPax = await createPax(bodyMapped, newPaxCargaCorreo.opcc_id);
    const newCarga = await createCarga(bodyMapped, newPaxCargaCorreo.opcc_id);
    const newCorreo = await createCorreo(bodyMapped, newPaxCargaCorreo.opcc_id);

    const updatedPaxCargaCorreo = await updatePaxCargaCorreo(newPaxCargaCorreo.opcc_id, newPax.opax_id, newCarga.ocarga_id, newCorreo.opcorreo_id);

    if (!updatedPaxCargaCorreo) {
      throw new Error("No se pudo actualizar las referencias en oper_pax_carga_correo.");
    }

    const updatedMovFlota = await updateMovFlota(bodyMapped.opmf_id, newPaxCargaCorreo.opcc_id);

    return NextResponse.json({
      newPax,
      newCarga,
      newCorreo,
      newPaxCargaCorreo,
      updatedMovFlota,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error al crear el cargo-mail: ${error.message}` }, { status: 500 });
  }
}

function mapRequestBody(data: any) {
  return {
    pax: {
      estado: data.pax_estado,
      tipo: data.pax_tipo,
      valor: data.pax_cantidad,
    },
    carga: {
      estado: data.carga_estado,
      tipo: data.carga_tipo,
      valor: data.carga_peso,
    },
    correo: {
      estado: data.correo_estado,
      tipo: data.correo_tipo,
      valor: data.correo_peso,
    },
    opmf_id: data.opmf_id,
  };
}

function validateRequestBody(bodyMapped: any) {
  const transformEstado = (estado: string): string => {
    const estadoTransformado: Record<string, string> = {
      "Embarcada": "embarcada",
      "Desembarcada": "desembarcada",
      "En tránsito": "enTransito",
    };
    return estadoTransformado[estado] || estado;
  };

  const transformTipo = (tipo: string): string => {
    const tipoTransformado: Record<string, string> = {
      "Paga": "paga",
      "Cortesía": "cortesia",
    };
    return tipoTransformado[tipo] || tipo;
  };

  bodyMapped.carga.estado = transformEstado(bodyMapped.carga.estado);
  bodyMapped.carga.tipo = transformTipo(bodyMapped.carga.tipo);
  bodyMapped.pax.estado = transformEstado(bodyMapped.pax.estado);
  bodyMapped.pax.tipo = transformTipo(bodyMapped.pax.tipo);
  bodyMapped.correo.estado = transformEstado(bodyMapped.correo.estado);
  bodyMapped.correo.tipo = transformTipo(bodyMapped.correo.tipo);

  if (!bodyMapped.opmf_id || !bodyMapped.pax.estado || !bodyMapped.pax.tipo || !bodyMapped.pax.valor ||
    !bodyMapped.carga.estado || !bodyMapped.carga.tipo || !bodyMapped.carga.valor ||
    !bodyMapped.correo.estado || !bodyMapped.correo.tipo || !bodyMapped.correo.valor) {
    throw new Error("El cuerpo del request está incompleto o tiene valores inválidos.");
  }

  if (!Object.keys(estadoEnum).includes(bodyMapped.carga.estado)) {
    throw new Error(`Estado de carga inválido: ${bodyMapped.carga.estado}`);
  }
  if (!Object.keys(tipoEnum).includes(bodyMapped.carga.tipo)) {
    throw new Error(`Tipo de carga inválido: ${bodyMapped.carga.tipo}`);
  }
}

async function createPaxCargaCorreo(bodyMapped: any) {
  return await prisma.oper_pax_carga_correo.create({
    data: {
      opmf_id: bodyMapped.opmf_id,
    },
  });
}

async function createPax(bodyMapped: any, opcc_id: number) {
  return await prisma.oper_pax.create({
    data: {
      estado: "Embarcada",
      tipo: "Paga",
      valor: bodyMapped.pax.valor,
      opcc_id,
    },
  });
}

async function createCarga(bodyMapped: any, opcc_id: number) {
  return await prisma.oper_carga.create({
    data: {
      estado: estadoEnum[bodyMapped.carga.estado as keyof typeof estadoEnum],
      tipo: tipoEnum[bodyMapped.carga.tipo as keyof typeof tipoEnum],
      valor: bodyMapped.carga.valor,
      opcc_id,
    },
  });
}

async function createCorreo(bodyMapped: any, opcc_id: number) {
  return await prisma.oper_correo.create({
    data: {
      estado: "Desembarcada",
      tipo: "Paga",
      valor: bodyMapped.correo.valor,
      opcc_id,
    },
  });
}

async function updatePaxCargaCorreo(opcc_id: number, oppa_id: number, opca_id: number, opco_id: number) {
  return await prisma.oper_pax_carga_correo.update({
    where: { opcc_id },
    data: {
      oppa_id,
      opca_id,
      opco_id,
    },
  });
}

async function updateMovFlota(opmf_id: number, opcc_id: number) {
  return await prisma.oper_mov_flota.update({
    where: { opmf_id },
    data: {
      opcc_id,
    },
  });
}