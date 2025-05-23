// Tipos compartidos para movimiento de flota

export type FleetMovement = {
  id: number;
  created_at: string;
  day: number;
  month: string;
  year: number;
  acft: string;
  flight: string;
  origin: string;
  destination: string;
  etd: string;
  cpta: string;
  atd: string;
  eta: string;
  ata: string;
  a_pta: string;
  pax: number;
  flight_time: string;
  block_time: string;
  fob: string;
  fod: string;
  fuel_consumed: string;
  total_min_dly: number;
  delay_code_1: string;
  delay_code_2: string;
  runway: string;
  ldw: number;
  tow: number;
};
