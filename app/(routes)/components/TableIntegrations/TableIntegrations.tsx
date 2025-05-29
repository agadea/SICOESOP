"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableIntegrationsProps } from "./TableIntegrations.types";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/formatPrice";

// Datos demo de vuelos para la tabla de integraciones
const data: any[] = [
  {
    vuelo: "VY1234",
    origen: "CCS",
    destino: "MIA",
    fecha: "2025-05-27",
    pax: 120,
    combustibleConsumido: "3.200 kg",
    combustibleCargado: "3.500 kg",
    demoras: "0 min",
  },
  {
    vuelo: "VY5678",
    origen: "MIA",
    destino: "CCS",
    fecha: "2025-05-28",
    pax: 110,
    combustibleConsumido: "3.100 kg",
    combustibleCargado: "3.400 kg",
    demoras: "15 min",
  },
  {
    vuelo: "VY9101",
    origen: "CCS",
    destino: "BOG",
    fecha: "2025-05-28",
    pax: 98,
    combustibleConsumido: "2.800 kg",
    combustibleCargado: "3.000 kg",
    demoras: "5 min",
  },
];

const columns = [
  { header: "Vuelo", accessor: "vuelo" },
  { header: "Origen", accessor: "origen" },
  { header: "Destino", accessor: "destino" },
  { header: "Fecha", accessor: "fecha" },
  { header: "PAX", accessor: "pax" },
  { header: "Comb. Consumido", accessor: "combustibleConsumido" },
  { header: "Comb. Cargado", accessor: "combustibleCargado" },
  { header: "Demoras", accessor: "demoras" },
];

export function TableIntegrations() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full mt-5">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.accessor}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col.accessor}>{row[col.accessor]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
