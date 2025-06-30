import { BookOpenCheck, List, UsersRound, Waypoints } from "lucide-react";

export const dataCardsSummary = [
  {
    icon: UsersRound,
    total: "32 vuelos",
    average: 92,
    title: "Vuelos realizados",
    tooltipText: "Cantidad de vuelos en el periodo",
  },
  {
    icon: Waypoints,
    total: "12.500 kg",
    average: 80,
    title: "Combustible consumido",
    tooltipText: "Total de combustible consumido (kg)",
  },
  {
    icon: BookOpenCheck,
    total: "13.200 kg",
    average: 85,
    title: "Combustible cargado",
    tooltipText: "Total de combustible cargado (kg)",
  },
  {
    icon: List,
    total: "5 demoras",
    average: 16,
    title: "Demoras registradas",
    tooltipText: "Cantidad de vuelos con demoras",
  },
];
