import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { oper_pacc_estado_enum, oper_pacc_tipo_enum } from "../../../lib/generated/prisma";

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
    const cargaCorreo = await prisma.oper_pax_carga_correo.findMany();
    return NextResponse.json(cargaCorreo);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar rutas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Mapear las propiedades del cuerpo del request al formato esperado
    const bodyMapped = {
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

    // Transformar los valores del cuerpo del request para que coincidan con las claves esperadas
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

    // Aplicar transformación antes de la validación
    bodyMapped.carga.estado = transformEstado(bodyMapped.carga.estado);
    bodyMapped.carga.tipo = transformTipo(bodyMapped.carga.tipo);
    bodyMapped.pax.estado = transformEstado(bodyMapped.pax.estado);
    bodyMapped.pax.tipo = transformTipo(bodyMapped.pax.tipo);
    bodyMapped.correo.estado = transformEstado(bodyMapped.correo.estado);
    bodyMapped.correo.tipo = transformTipo(bodyMapped.correo.tipo);

    // Validar que las propiedades mapeadas sean válidas
    if (!bodyMapped.opmf_id || !bodyMapped.pax.estado || !bodyMapped.pax.tipo || !bodyMapped.pax.valor ||
      !bodyMapped.carga.estado || !bodyMapped.carga.tipo || !bodyMapped.carga.valor ||
      !bodyMapped.correo.estado || !bodyMapped.correo.tipo || !bodyMapped.correo.valor) {
      throw new Error("El cuerpo del request está incompleto o tiene valores inválidos.");
    }

    // Validar los valores de los enums
    if (!Object.keys(estadoEnum).includes(bodyMapped.carga.estado)) {
      throw new Error(`Estado de carga inválido: ${bodyMapped.carga.estado}`);
    }
    if (!Object.keys(tipoEnum).includes(bodyMapped.carga.tipo)) {
      throw new Error(`Tipo de carga inválido: ${bodyMapped.carga.tipo}`);
    }

    // Crear registros en oper_pax_carga_correo con referencias iniciales
    const newPaxCargaCorreo = await prisma.oper_pax_carga_correo.create({
      data: {
        opmf_id: bodyMapped.opmf_id, // Referencia al movimiento de flota
      },
    });

    // Crear registros en oper_pax con cantidad de pasajeros
    const newPax = await prisma.oper_pax.create({
      data: {
        estado: "Embarcada", // Valor exacto del enum
        tipo: "Paga", // Valor exacto del enum
        valor: bodyMapped.pax.valor, // Representa la cantidad de pasajeros
        opcc_id: newPaxCargaCorreo.opcc_id, // Referencia a la tabla central
      },
    });

    // Crear registros en oper_carga
    const newCarga = await prisma.oper_carga.create({
      data: {
        estado: estadoEnum[bodyMapped.carga.estado as keyof typeof estadoEnum],
        tipo: tipoEnum[bodyMapped.carga.tipo as keyof typeof tipoEnum],
        valor: bodyMapped.carga.valor, // Representa el peso de la carga
        opcc_id: newPaxCargaCorreo.opcc_id, // Referencia a la tabla central
      },
    });

    // Crear registros en oper_correo
    const newCorreo = await prisma.oper_correo.create({
      data: {
        estado: "Desembarcada", // Valor exacto del enum
        tipo: "Paga", // Valor exacto del enum
        valor: bodyMapped.correo.valor, // Representa el peso del correo
        opcc_id: newPaxCargaCorreo.opcc_id, // Referencia a la tabla central
      },
    });

    // Actualizar la tabla oper_pax_carga_correo con las referencias completas
    const updatedPaxCargaCorreo = await prisma.oper_pax_carga_correo.update({
      where: { opcc_id: newPaxCargaCorreo.opcc_id },
      data: {
        oppa_id: newPax.opax_id,
        opca_id: newCarga.ocarga_id,
        opco_id: newCorreo.opcorreo_id,
      },
    });

    if (!updatedPaxCargaCorreo) {
      throw new Error("No se pudo actualizar las referencias en oper_pax_carga_correo.");
    }

    // Log para depuración
    console.log("Registro actualizado en oper_pax_carga_correo:", updatedPaxCargaCorreo);

    // Actualizar IDs para movimiento de flota y carga/correo
    const updatedMovFlota = await prisma.oper_mov_flota.update({
      where: { opmf_id: bodyMapped.opmf_id },
      data: {
        opcc_id: newPaxCargaCorreo.opcc_id,
      },
    });

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