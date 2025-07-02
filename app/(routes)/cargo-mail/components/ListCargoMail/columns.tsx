"use client";

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Simplificación de las columnas eliminando lógica de formateo adicional
export const columns: ColumnDef<{
  id: number;
  date: string;
  acft: string | null;
  flight: string;
  route: string;
  origin: string | null;
  destination: string | null;
  // pax values
  pax_embarcada: string;
  pax_desembarcada: string;
  pax_transito: string;
  // carga values
  carga_embarcada: string;
  carga_desembarcada: string;
  carga_transito: string;
  // correo values
  correo_embarcada: string;
  correo_desembarcada: string;
  correo_transito: string;
}>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
  },
  { accessorKey: "acft", header: "ACFT" },
  { accessorKey: "flight", header: "Vuelo" },
  { accessorKey: "route", header: "Ruta" },
  {
    header: "Pasajeros",
    columns: [
      {
        header: "Embarcada",
        accessorKey: "pax_embarcada",
      },
      {
        header: "Desembarcada",
        accessorKey: "pax_desembarcada",
      },
      {
        header: "En tránsito",
        accessorKey: "pax_transito",
      },
    ],
  },
  {
    header: "Carga (Kg.)",
    columns: [
      {
        header: "Embarcada",
        accessorKey: "carga_embarcada",
      },
      {
        header: "Desembarcada",
        accessorKey: "carga_desembarcada",
      },
      {
        header: "En tránsito",
        accessorKey: "carga_transito",
      },
    ],
  },
  {
    header: "Correo (Kg.)",
    columns: [
      {
        header: "Embarcada",
        accessorKey: "correo_embarcada",
      },
      {
        header: "Desembarcada",
        accessorKey: "correo_desembarcada",
      },
      {
        header: "En tránsito",
        accessorKey: "correo_transito",
      },
    ],
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-4 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/cargo-mail/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
