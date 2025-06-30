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
  route: string | null;
  origin: string | null;
  destination: string | null;
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
        columns: [
          { accessorKey: "embarcada_paga", header: "Paga" },
          { accessorKey: "embarcada_cortesia", header: "Cortesía" },
        ],
      },
      {
        header: "Desembarcada",
        columns: [
          { accessorKey: "desembarcada_paga", header: "Paga" },
          { accessorKey: "desembarcada_cortesia", header: "Cortesía" },
        ],
      },
      {
        header: "En tránsito",
        columns: [
          { accessorKey: "en_transito_paga", header: "Paga" },
          { accessorKey: "en_transito_cortesia", header: "Cortesía" },
        ],
      },
    ],
  },
  // {
  //   id: "pax",
  //   header: () => <div className="text-right w-full">Pasajeros</div>,
  //   accessorKey: "pax",
  //   columns: [
  //     {
  //       id: "embarcada",
  //       header: () => <div className="text-[8px]">Embarcada</div>,
  //     },
  //     {
  //       id: "desembarcada",
  //       header: () => <div className="text-[8px]">Desembarcada</div>,
  //     },
  //     {
  //       id: "en_transito",
  //       header: () => <div className="text-[8px]">En Transito</div>,
  //     },
  //   ],
  // },
  // {
  //   id: "pax",
  //   header: () => <div className="text-right w-full">Carga</div>,
  //   accessorKey: "pax",
  //   columns: [
  //     {
  //       id: "embarcada",
  //       header: () => <div className="text-[8px]">Embarcada</div>,
  //     },
  //     {
  //       id: "desembarcada",
  //       header: () => <div className="text-[8px]">Desembarcada</div>,
  //     },
  //     {
  //       id: "en_transito",
  //       header: () => <div className="text-[8px]">En Transito</div>,
  //     },
  //   ],
  // },
  // {
  //   id: "pax",
  //   header: () => <div className="text-right w-full">Correo</div>,
  //   accessorKey: "pax",
  //   columns: [
  //     {
  //       id: "embarcada",
  //       header: () => <div className="text-[8px]">Embarcada</div>,
  //     },
  //     {
  //       id: "desembarcada",
  //       header: () => <div className="text-[8px]">Desembarcada</div>,
  //     },
  //     {
  //       id: "en_transito",
  //       header: () => <div className="text-[8px]">En Transito</div>,
  //     },
  //   ],
  // },
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
