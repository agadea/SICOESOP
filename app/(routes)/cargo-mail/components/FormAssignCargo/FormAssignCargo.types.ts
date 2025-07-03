import { Dispatch, SetStateAction } from "react";

export type FormAssignCargoProps = {
  setOpenModalAdd: Dispatch<SetStateAction<boolean>>;
}

export type FormAssignCargoFleetMovementValues = {
  opmf_id: number;
  opmf_date: Date;
  opav_matricula_avion: string | null;
  opvu_co_vuelo: number;
  gear_co_iata_aeropuerto_origin: string | null;
  gear_co_iata_aeropuerto_destination: string | null;
}