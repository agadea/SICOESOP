"use client";

import * as React from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type FleetMovement = {
  id: string;
  vehicle: string;
  driver: string;
  origin: string;
  destination: string;
  date: string;
  status: "en ruta" | "finalizado" | "pendiente";
};

const data: FleetMovement[] = [
  {
    id: "1",
    vehicle: "Camión 01",
    driver: "Juan Pérez",
    origin: "Depósito Central",
    destination: "Sucursal Norte",
    date: "2025-05-21 08:00",
    status: "en ruta",
  },
  {
    id: "2",
    vehicle: "Camión 02",
    driver: "Ana Gómez",
    origin: "Sucursal Sur",
    destination: "Depósito Central",
    date: "2025-05-21 09:30",
    status: "pendiente",
  },
  {
    id: "3",
    vehicle: "Camión 03",
    driver: "Carlos Ruiz",
    origin: "Sucursal Este",
    destination: "Sucursal Oeste",
    date: "2025-05-20 15:00",
    status: "finalizado",
  },
];

export const columns: ColumnDef<FleetMovement>[] = [
  {
    accessorKey: "vehicle",
    header: () => <div>Vehículo</div>,
    cell: ({ row }) => <div>{row.getValue("vehicle")}</div>,
  },
  {
    accessorKey: "driver",
    header: () => <div>Conductor</div>,
    cell: ({ row }) => <div>{row.getValue("driver")}</div>,
  },
  {
    accessorKey: "origin",
    header: () => <div>Origen</div>,
    cell: ({ row }) => <div>{row.getValue("origin")}</div>,
  },
  {
    accessorKey: "destination",
    header: () => <div>Destino</div>,
    cell: ({ row }) => <div>{row.getValue("destination")}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div>Fecha/Hora</div>,
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div>Estatus</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let color = "";
      if (status === "en ruta") color = "text-blue-600";
      else if (status === "finalizado") color = "text-green-600";
      else color = "text-yellow-600";
      return <span className={color + " font-semibold"}>{status}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const movement = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(movement.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalle</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function FleetMovementsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div className="w-full max-w-full overflow-x-auto">
      <div className="mb-4 shadow-sm bg-background rounded-lg p-4 w-full xl:w-[900px] mx-auto hover:shadow-lg transition">
        <div className="flex flex-col md:flex-row md:items-center py-4 gap-2">
          <Input
            placeholder="Filtrar por vehículo..."
            value={
              (table.getColumn("vehicle")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("vehicle")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:ml-auto">
                Columnas <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="min-w-[120px]">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="break-words">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
