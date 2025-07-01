// import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { formatDecimalValue, formatDateSimple } from "@/lib/formatters";

export async function ListCargoMail() {
  const cargoCorreo = (
    await prisma.oper_pax_carga_correo.findMany({
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
                  },
                },
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
    const modelo = avion?.oper_modelo_aeronaves?.opar_nm_mod_aeronave;
    const carga = cargo.oper_carga;
    const correo = cargo.oper_correo;
    const pax = cargo.oper_pax;

    return {
      id: cargo.opcc_id,
      flight: vuelo.opvu_co_vuelo,
      date: formatDateSimple(movimiento.opmf_date),
      acft: avion.opav_matricula_avion,
      route: vuelo.oper_ruta ? `${origen} - ${destino}` : null,
      origin: origen ?? null,
      destination: destino ?? null,
      // pax values
      pax_embarcada:
        pax?.estado === "Embarcada"
          ? `${pax?.tipo} - ${formatDecimalValue(pax?.valor)}`
          : "-",
      pax_desembarcada:
        pax?.estado === "Desembarcada"
          ? `${pax?.tipo} - ${formatDecimalValue(pax?.valor)}`
          : "-",
      pax_transito:
        pax?.estado === "En_tr_nsito"
          ? `${pax?.tipo} - ${formatDecimalValue(pax?.valor)}`
          : "-",
      // carga values
      carga_embarcada:
        carga?.estado === "Embarcada"
          ? `${carga?.tipo} - ${formatDecimalValue(carga?.valor)}`
          : "-",
      carga_desembarcada:
        carga?.estado === "Desembarcada"
          ? `${carga?.tipo} - ${formatDecimalValue(carga?.valor)}`
          : "-",
      carga_transito:
        carga?.estado === "En_tr_nsito"
          ? `${carga?.tipo} - ${formatDecimalValue(carga?.valor)}`
          : "-",
      // correo values
      correo_embarcada:
        correo?.estado === "Embarcada"
          ? `${correo?.tipo} - ${formatDecimalValue(correo?.valor)}`
          : "-",
      correo_desembarcada:
        correo?.estado === "Desembarcada"
          ? `${correo?.tipo} - ${formatDecimalValue(correo?.valor)}`
          : "-",
      correo_transito:
        correo?.estado === "En_tr_nsito"
          ? `${correo?.tipo} - ${formatDecimalValue(correo?.valor)}`
          : "-",
    };
  });

  return <DataTable columns={columns} data={cargoCorreo} />;
}
