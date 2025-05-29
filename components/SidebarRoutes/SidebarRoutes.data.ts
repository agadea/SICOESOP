import {
  BarChart4,
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
  Truck
} from 'lucide-react'

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: Building2,
    label: "Carga y Correo",
    href: "/companies"
  },
  {
    icon: Calendar,
    label: "Demoras",
    href: "/task"
  },
  {
    icon: Truck,
    label: "Movimiento de Flota",
    href: "/movimiento-flota"
  }
]

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Faqs",
    href: "/faqs"
  },
  {
    icon: BarChart4,
    label: "Analytics",
    href: "/analytics"
  }
]

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: "Settings",
    href: "/settings"
  },
  {
    icon: ShieldCheck,
    label: "Security",
    href: "/security"
  }
]