// import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { formatDecimalValue, formatDateSimple } from "@/lib/formatters";
import { transformEnumValue } from "@/lib/utils/transformEnumValue";

export async function ListCargoMail() {
  const cargoCorreo = (
    await prisma.oper_pax_carga_correo.findMany({
      orderBy: {
        oper_mov_flota: {
          opmf_date: "desc",
        },
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
              },
            },
            oper_vuelos: {
              select: {
                opvu_co_vuelo: true,
                oper_ruta: {
                  select: {
                    genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos:
                      {
                        select: {
                          gear_co_iata_aeropuerto: true,
                        },
                      },
                    genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos:
                      {
                        select: {
                          gear_co_iata_aeropuerto: true,
                        },
                      },
                  },
                },
              },
            },
          },
        },
        oper_carga: {
          select: {
            valor: true,
            estado: true,
            tipo: true,
          },
        },
        oper_correo: {
          select: {
            valor: true,
            estado: true,
            tipo: true,
          },
        },
        oper_pax: {
          select: {
            valor: true,
            estado: true,
            tipo: true,
          },
        },
      },
    })
  ).map((cargo) => {
    const movimiento = cargo.oper_mov_flota;
    const vuelo = cargo.oper_mov_flota?.oper_vuelos;
    const origen =
      vuelo?.oper_ruta
        ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos
        ?.gear_co_iata_aeropuerto;
    const destino =
      vuelo?.oper_ruta
        ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos
        ?.gear_co_iata_aeropuerto;
    const avion = cargo.oper_mov_flota.oper_aviones;
    const carga = cargo.oper_carga;
    const correo = cargo.oper_correo;
    const pax = cargo.oper_pax;

    return {
      id: cargo.opcc_id,
      flight: vuelo?.opvu_co_vuelo || "-",
      date: formatDateSimple(movimiento?.opmf_date || new Date()),
      acft: avion?.opav_matricula_avion || null,
      route: origen && destino ? `${origen} - ${destino}` : "-",
      origin: origen || null,
      destination: destino || null,
      // pax values
      pax_embarcada:
        pax?.estado === "Embarcada"
          ? `${transformEnumValue(pax?.tipo)} - ${formatDecimalValue(
              pax?.valor
            )}`
          : "-",
      pax_desembarcada:
        pax?.estado === "Desembarcada"
          ? `${transformEnumValue(pax?.tipo)} - ${formatDecimalValue(
              pax?.valor
            )}`
          : "-",
      pax_transito:
        transformEnumValue(pax?.estado ?? "") === "En tránsito"
          ? `${transformEnumValue(pax?.tipo ?? "")} - ${formatDecimalValue(
              pax?.valor ?? 0
            )}`
          : "-",
      // carga values
      carga_embarcada:
        carga?.estado === "Embarcada"
          ? `${transformEnumValue(carga?.tipo)} - ${formatDecimalValue(
              carga?.valor
            )}`
          : "-",
      carga_desembarcada:
        carga?.estado === "Desembarcada"
          ? `${transformEnumValue(carga?.tipo)} - ${formatDecimalValue(
              carga?.valor
            )}`
          : "-",
      carga_transito:
        transformEnumValue(carga?.estado ?? "") === "En tránsito"
          ? `${transformEnumValue(carga?.tipo ?? "")} - ${formatDecimalValue(
              carga?.valor ?? 0
            )}`
          : "-",
      // correo values
      correo_embarcada:
        correo?.estado === "Embarcada"
          ? `${transformEnumValue(correo?.tipo)} - ${formatDecimalValue(
              correo?.valor
            )}`
          : "-",
      correo_desembarcada:
        correo?.estado === "Desembarcada"
          ? `${transformEnumValue(correo?.tipo)} - ${formatDecimalValue(
              correo?.valor
            )}`
          : "-",
      correo_transito:
        transformEnumValue(correo?.estado ?? "") === "En tránsito"
          ? `${transformEnumValue(correo?.tipo ?? "")} - ${formatDecimalValue(
              correo?.valor ?? 0
            )}`
          : "-",
    };
  });

  return <DataTable columns={columns} data={cargoCorreo} />;
}
