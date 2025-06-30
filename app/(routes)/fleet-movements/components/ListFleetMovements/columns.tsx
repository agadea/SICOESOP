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
  acft: string;
  flight: string;
  origin: string | null;
  destination: string | null;
  etd: string;
  fob: number | string;
  fod: number | string;
  fuel_consumed: number | string;
  fuel_supplied: number | string;

  pax: number | null;
  runway: string | null;
  atd: Date | null;
  eta: Date | null;
  ata: Date | null;
  flight_time_min: number | null;
  block_time_min: number | null;
  ldw: number | string;
  tow: number | string;
}>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
  },
  { accessorKey: "acft", header: "ACFT" },
  { accessorKey: "flight", header: "Vuelo" },
  { accessorKey: "origin", header: "Origen" },
  { accessorKey: "destination", header: "Destino" },
  { accessorKey: "etd", header: "ETD" },
  { accessorKey: "cpta", header: "C/PTA" },
  { accessorKey: "atd", header: "ATD" },
  { accessorKey: "eta", header: "ETA" },
  { accessorKey: "ata", header: "ATA" },
  { accessorKey: "apta", header: "A/PTA" },
  { accessorKey: "pax", header: "PAX" },
  { accessorKey: "fob", header: "FOB" },
  { accessorKey: "fod", header: "FOD" },
  { accessorKey: "fuel_consumed", header: "Consumo" },
  // Uncomment the following lines if you want to include actions in the table
  { accessorKey: "fuel_supplied", header: "Suministro" },
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
            <Link href={`/fleet-movements/${id}`}>
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
