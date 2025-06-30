import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { formatDecimalValue, formatDate, formatTime } from "@/lib/formatters";

export async function ListCargoMail() {
  // const {userId}
  // const movements = (
  //   await prisma.oper_mov_flota.findMany({
  //     orderBy: {
  //       opmf_date: "desc",
  //     },
  //     include: {
  //       oper_aviones: {
  //         select: { opav_matricula_avion: true },
  //       },
  //       oper_vuelos: {
  //         select: {
  //           opvu_co_vuelo: true,
  //           oper_ruta: {
  //             select: {
  //               genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos:
  //                 {
  //                   select: {
  //                     gear_co_iata_aeropuerto: true,
  //                     gear_nm_aeropuerto: true,
  //                   },
  //                 },
  //               genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos:
  //                 {
  //                   select: {
  //                     gear_co_iata_aeropuerto: true,
  //                     gear_nm_aeropuerto: true,
  //                   },
  //                 },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   })
  // ).map((movement) => ({
  //   ...movement,
  //   id: movement.opmf_id,
  //   date: movement.opmf_date
  //     ? formatDate(movement.opmf_date)
  //     : movement.opmf_date,
  //   acft: movement.oper_aviones.opav_matricula_avion,
  //   flight: movement.oper_vuelos.opvu_co_vuelo,
  //   origin:
  //     movement.oper_vuelos.oper_ruta
  //       ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos
  //       ?.gear_co_iata_aeropuerto,
  //   destination:
  //     movement.oper_vuelos.oper_ruta
  //       ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos
  //       ?.gear_co_iata_aeropuerto,
  //   etd: movement.etd ? formatTime(movement.etd) : "N/A",
  //   // cpta: movement ? formatTime(movement.etd) : "N/A",
  //   fob: movement.fob ? formatDecimalValue(movement.fob) : "N/A",
  //   fod: movement.fod ? formatDecimalValue(movement.fod) : "N/A",
  //   fuel_consumed: movement.fuel_consumed
  //     ? formatDecimalValue(movement.fuel_consumed)
  //     : "N/A",
  //   fuel_supplied: movement.fuel_supplied
  //     ? formatDecimalValue(movement.fuel_supplied)
  //     : "N/A",
  //   ldw: movement.ldw ? formatDecimalValue(movement.ldw) : "N/A",
  //   tow: movement.tow ? formatDecimalValue(movement.tow) : "N/A",
  // }));
  // return <DataTable columns={columns} data={movements} />; // Add your columns definition here

  const cargoCorreo = await prisma.oper_pax_carga_correo.findMany({
    orderBy: {
      opcc_id: "desc",
    },
  });
  console.log("🚀 ~ ListCargoMail ~ cargoCorreo:", cargoCorreo);

  return (
    <DataTable classname="max-w-[500px]" columns={columns} data={cargoCorreo} />
  );
}
