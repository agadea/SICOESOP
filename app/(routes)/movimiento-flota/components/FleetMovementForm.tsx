"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePickerField } from "./TimePickerField";

// Esquema de validación con Zod (ajusta los campos requeridos según tu lógica)
export const fleetMovementSchema = z.object({
  day: z.coerce.number().min(1).max(31),
  month: z.string().min(1),
  year: z.coerce.number().min(2020),
  acft: z.string().min(1),
  flight: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  etd: z.string().optional(),
  cpta: z.string().optional(),
  atd: z.string().optional(),
  eta: z.string().optional(),
  ata: z.string().optional(),
  a_pta: z.string().optional(),
  pax: z.coerce.number().optional(),
  flight_time: z.string().optional(),
  block_time: z.string().optional(),
  fob: z.string().optional(),
  fod: z.string().optional(),
  fuel_consumed: z.string().optional(),
  total_min_dly: z.coerce.number().optional(),
  delay_code_1: z.string().optional(),
  delay_code_2: z.string().optional(),
  runway: z.string().optional(),
  ldw: z.coerce.number().optional(),
  tow: z.coerce.number().optional(),
});

export type FleetMovementFormValues = z.infer<typeof fleetMovementSchema>;

export function FleetMovementForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [aeronaves, setAeronaves] = useState<
    { opav_id_avion: number; opav_matricula_avion: string | null }[]
  >([]);
  const [vuelos, setVuelos] = useState<any[]>([]);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  useEffect(() => {
    fetch("/api/aeronaves")
      .then((res) => res.json())
      .then((data) => {
        setAeronaves(data);
      });
    fetch("/api/vuelos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVuelos(data);
        } else {
          setVuelos([]);
        }
      })
      .catch(() => setVuelos([]));
  }, []);

  const form = useForm<FleetMovementFormValues>({
    resolver: zodResolver(fleetMovementSchema),
    defaultValues: {
      // day, month, year se asignan en el submit
      acft: "",
      flight: "",
      origin: origen,
      destination: destino,
      etd: "",
      cpta: "",
      atd: "",
      eta: "",
      ata: "",
      a_pta: "",
      pax: undefined,
      flight_time: "",
      block_time: "",
      fob: "",
      fod: "",
      fuel_consumed: "",
      total_min_dly: undefined,
      delay_code_1: "",
      delay_code_2: "",
      runway: "",
      ldw: undefined,
      tow: undefined,
    },
  });

  // Cuando cambia el vuelo seleccionado, actualiza origen y destino
  useEffect(() => {
    const selectedFlight = form.watch("flight");
    if (!selectedFlight || !Array.isArray(vuelos)) {
      setOrigen("");
      setDestino("");
      return;
    }
    const vueloSel = vuelos.find(
      (v) => String(v.opvu_id_vuelo) === String(selectedFlight)
    );
    if (vueloSel && vueloSel.oper_itinerarios?.length > 0) {
      const iti = vueloSel.oper_itinerarios[0];
      const ruta = iti.oper_ruta;
      setOrigen(
        ruta
          ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_origenTogenr_aeropuertos
          ?.gear_co_iata_aeropuerto || ""
      );
      setDestino(
        ruta
          ?.genr_aeropuertos_oper_ruta_opru_gear_aerop_destinoTogenr_aeropuertos
          ?.gear_co_iata_aeropuerto || ""
      );
    } else {
      setOrigen("");
      setDestino("");
    }
  }, [vuelos, form]);

  // Actualiza los valores de los campos origin y destination en el formulario cuando cambian
  useEffect(() => {
    form.setValue("origin", origen);
    form.setValue("destination", destino);
  }, [origen, destino, form]);

  const onSubmit = async (
    values: Omit<FleetMovementFormValues, "day" | "month" | "year">
  ) => {
    if (!date) {
      alert("Selecciona una fecha");
      return;
    }
    setLoading(true);
    const payload = {
      ...values,
      day: date.getDate(),
      month: String(date.getMonth() + 1).padStart(2, "0"),
      year: date.getFullYear(),
    };
    const res = await fetch("/api/movimiento-flota", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      form.reset();
      setDate(new Date());
      onSuccess?.();
    } else {
      alert("Error al crear el movimiento");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <FormField
              name="fecha"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Fecha</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date ?? undefined}
                        onSelect={(d) => setDate(d ?? null)}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="acft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ACFT</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona matrícula" />
                    </SelectTrigger>
                    <SelectContent>
                      {aeronaves.map((avion) => (
                        <SelectItem
                          key={avion.opav_id_avion}
                          value={String(avion.opav_id_avion)}
                        >
                          {avion.opav_matricula_avion || "Sin matrícula"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vuelo</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona vuelo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(vuelos) && vuelos.length > 0 ? (
                        vuelos.map((vuelo) => (
                          <SelectItem
                            key={vuelo.opvu_id_vuelo}
                            value={String(vuelo.opvu_id_vuelo)}
                          >
                            {vuelo.opvu_co_vuelo || "Sin código"}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No hay vuelos disponibles
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-1">
            <FormItem>
              <FormLabel>Origen</FormLabel>
              <FormControl>
                <Input
                  value={origen}
                  readOnly
                  className="dark:text-gray-500 cursor-not-allowed"
                  tabIndex={-1}
                  aria-readonly="true"
                />
              </FormControl>
            </FormItem>
          </div>
          <div className="md:col-span-1">
            <FormItem>
              <FormLabel>Destino</FormLabel>
              <FormControl>
                <Input
                  value={destino}
                  readOnly
                  className="dark:text-gray-500 cursor-not-allowed"
                  tabIndex={-1}
                  aria-readonly="true"
                />
              </FormControl>
            </FormItem>
          </div>
        </div>
        {/* Campos opcionales, puedes expandir según necesidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="etd"
            render={({ field }) => (
              <TimePickerField
                label="ETD"
                value={field.value || null}
                onChange={field.onChange}
                name="etd"
              />
            )}
          />
          <FormField
            control={form.control}
            name="cpta"
            render={({ field }) => (
              <TimePickerField
                label="C/PTA"
                value={field.value || null}
                onChange={field.onChange}
                name="cpta"
              />
            )}
          />
          <FormField
            control={form.control}
            name="atd"
            render={({ field }) => (
              <TimePickerField
                label="ATD"
                value={field.value || null}
                onChange={field.onChange}
                name="atd"
              />
            )}
          />
          <FormField
            control={form.control}
            name="eta"
            render={({ field }) => (
              <TimePickerField
                label="ETA"
                value={field.value || null}
                onChange={field.onChange}
                name="eta"
              />
            )}
          />
          <FormField
            control={form.control}
            name="ata"
            render={({ field }) => (
              <TimePickerField
                label="ATA"
                value={field.value || null}
                onChange={field.onChange}
                name="ata"
              />
            )}
          />
          <FormField
            control={form.control}
            name="a_pta"
            render={({ field }) => (
              <TimePickerField
                label="A/PTA"
                value={field.value || null}
                onChange={field.onChange}
                name="a_pta"
              />
            )}
          />
          <FormField
            control={form.control}
            name="pax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAX</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="PAX"
                    {...field}
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar movimiento"}
        </Button>
      </form>
    </Form>
  );
}
