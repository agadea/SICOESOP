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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { FleetMovementsActions } from "./FleetMovementsActions";
import { FleetMovement } from "./FleetMovementsTable.types";

export function FleetMovementsTable() {
  const [data, setData] = useState<FleetMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/movimiento-flota?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener movimientos");
        return res.json();
      })
      .then((result) => {
        const data: FleetMovement[] = result.data;
        setTotal(result.total || 0);
        // Mapear los datos para agregar día, mes, año, matrícula y código de vuelo
        const mapped = data.map((mov: FleetMovement) => {
          const fecha = mov.opmf_date ? new Date(mov.opmf_date) : null;
          const monthNames = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ];
          // Extraer origen y destino desde oper_ruta del vuelo relacionado
          const ruta = mov.oper_vuelos?.oper_ruta;
          const origin =
            ruta
              ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos
              ?.gear_co_iata_aeropuerto || "";
          const destination =
            ruta
              ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos
              ?.gear_co_iata_aeropuerto || "";
          return {
            ...mov,
            day: fecha ? fecha.getDate().toString().padStart(2, "0") : "",
            month: fecha ? monthNames[fecha.getMonth()] : "",
            year: fecha ? fecha.getFullYear().toString() : "",
            acft: mov.oper_aviones?.opav_matricula_avion || "",
            flight: mov.oper_vuelos?.opvu_co_vuelo || "",
            origin,
            destination,
          };
        });
        setData(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page, pageSize]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este movimiento?")) return;
    const res = await fetch(`/api/movimiento-flota/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setData((prev) => prev.filter((mov) => mov.opmf_id !== id));
    } else {
      alert("Error al eliminar el movimiento");
    }
  };

  const columns = useMemo<ColumnDef<FleetMovement>[]>(
    () => [
      { accessorKey: "day", header: () => <div>Día</div> },
      { accessorKey: "month", header: () => <div>Mes</div> },
      { accessorKey: "year", header: () => <div>Año</div> },
      { accessorKey: "acft", header: () => <div>ACFT</div> },
      { accessorKey: "flight", header: () => <div>Vuelo</div> },
      { accessorKey: "origin", header: () => <div>Origen</div> },
      { accessorKey: "destination", header: () => <div>Destino</div> },
      { accessorKey: "etd", header: () => <div>ETD</div> },
      { accessorKey: "cpta", header: () => <div>C/PTA</div> },
      { accessorKey: "atd", header: () => <div>ATD</div> },
      { accessorKey: "eta", header: () => <div>ETA</div> },
      { accessorKey: "ata", header: () => <div>ATA</div> },
      { accessorKey: "a_pta", header: () => <div>A/PTA</div> },
      { accessorKey: "pax", header: () => <div>PAX</div> },
      { accessorKey: "flight_time", header: () => <div>Hora de Vuelo</div> },
      { accessorKey: "block_time", header: () => <div>Hora Bloque</div> },
      { accessorKey: "fob", header: () => <div>FOB</div> },
      { accessorKey: "fod", header: () => <div>FOD</div> },
      { accessorKey: "fuel_consumed", header: () => <div>Consumo</div> },
      { accessorKey: "total_min_dly", header: () => <div>Total Min DLY</div> },
      { accessorKey: "delay_code_1", header: () => <div>Cod. DLY 1</div> },
      { accessorKey: "delay_code_2", header: () => <div>Cod. DLY 2</div> },
      { accessorKey: "runway", header: () => <div>RWY</div> },
      { accessorKey: "ldw", header: () => <div>LDW</div> },
      { accessorKey: "tow", header: () => <div>TOW</div> },
      {
        id: "actions",
        header: () => <div>Acciones</div>,
        cell: ({ row }) => (
          <FleetMovementsActions
            id={row.original.opmf_id}
            onDelete={handleDelete}
          />
        ),
        enableHiding: false,
      },
    ],
    []
  );

  const defaultVisible = ["day", "month", "year", "acft", "flight", "actions"];
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      const all: VisibilityState = {};
      columns.forEach((col) => {
        if (
          typeof col === "object" &&
          "accessorKey" in col &&
          col.accessorKey
        ) {
          all[col.accessorKey as string] = defaultVisible.includes(
            col.accessorKey as string
          );
        }
        if (typeof col === "object" && "id" in col && col.id) {
          all[col.id as string] = defaultVisible.includes(col.id as string);
        }
      });
      return all;
    });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  // Controles de paginación
  const totalPages = Math.ceil(total / pageSize);

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // Eliminamos getPaginationRowModel para evitar paginación local
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true, // Activar paginación manual
    pageCount: totalPages, // Total de páginas según el backend
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Mapeo de IDs de columna a cabeceras en español
  const columnLabels: Record<string, string> = {
    day: "Día",
    month: "Mes",
    year: "Año",
    acft: "ACFT",
    flight: "Vuelo",
    origin: "Origen",
    destination: "Destino",
    etd: "ETD",
    cpta: "C/PTA",
    atd: "ATD",
    eta: "ETA",
    ata: "ATA",
    a_pta: "A/PTA",
    pax: "PAX",
    flight_time: "Hora de Vuelo",
    block_time: "Hora Bloque",
    fob: "FOB",
    fod: "FOD",
    fuel_consumed: "Consumo",
    total_min_dly: "Total Min DLY",
    delay_code_1: "Cod. DLY 1",
    delay_code_2: "Cod. DLY 2",
    runway: "RWY",
    ldw: "LDW",
    tow: "TOW",
    actions: "Acciones",
  };

  if (loading) return <div>Cargando movimientos...</div>;
  if (error) return <div>Error al cargar movimientos: {error}</div>;

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <div className="mb-4 shadow-sm bg-background rounded-lg p-4 w-full xl:w-full mx-auto hover:shadow-lg transition">
        <div className="flex flex-col md:flex-row md:items-center py-4 gap-2">
          <Input
            placeholder="Filtrar por matrícula (ACFT)..."
            value={(table.getColumn("acft")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("acft")?.setFilterValue(event.target.value)
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
                      {columnLabels[column.id] || column.id}
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
        <div className="flex items-center justify-between py-2">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span className="mx-2">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente
            </Button>
          </div>
          <div>
            <label className="mr-2">Filas por página:</label>
            <select
              title="Filas por página"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
