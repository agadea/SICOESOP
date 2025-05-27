// Tipos compartidos para movimiento de flota

export type FleetMovement = {
  opmf_id: number;
  created_at: string;
  opmf_opav_id_avion: number;
  opmf_opvu_id_vuelo: number;
  etd: string | null;
  cpta: string | null;
  atd: string | null;
  eta: string | null;
  ata: string | null;
  a_pta: string | null;
  pax: number | null;
  flight_time: string | null;
  block_time: string | null;
  fob: string | null;
  fod: string | null;
  fuel_consumed: string | null;
  total_min_dly: number | null;
  delay_code_1: string | null;
  delay_code_2: string | null;
  runway: string | null;
  ldw: number | null;
  tow: number | null;
  opmf_date: string;
  // Relaciones opcionales si se usan en la UI
  oper_aviones?: any;
  oper_vuelos?: any;
};
