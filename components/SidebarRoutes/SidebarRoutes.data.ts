import {
  BarChart4,
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  Printer,
  Truck
} from 'lucide-react'

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "Panel Principal",
    href: "/"
  },
  {
    icon: Building2,
    label: "Carga y Correo",
    href: "/cargo-mail"
  },
  // {
  //   icon: Calendar,
  //   label: "Demoras",
  //   href: "/demora"
  // },
  {
    icon: Truck,
    label: "Movimiento de Flota",
    href: "/movimiento-flota"
  }
]

export const dataToolsSidebar = [
  {
    icon: Printer,
    label: "Reportes",
    href: "/reports"
  },
  {
    icon: BarChart4,
    label: "Analiticas",
    href: "/analytics"
  }
]

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: "Ajustes",
    href: "/settings"
  },
  {
    icon: ShieldCheck,
    label: "Seguridad",
    href: "/security"
  }
]