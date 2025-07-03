"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormAssignCargoFleetMovementValues,
  FormAssignCargoProps,
} from "./FormAssignCargo.types";
import { useRouter } from "next/navigation";
import { formatDateSimple } from "@/lib/formatters";

const formSchema = z.object({
  opmf_id: z.number().min(1, "Fleet movement is required"),
  pax_estado: z.string().min(1, "Estado de pasajero es requerido"),
  pax_tipo: z.string().min(1, "Tipo de pasajero es requerido"),
  pax_cantidad: z.number().min(1, "Cantidad de pasajeros es requerida"),
  carga_estado: z.string().min(1, "Estado de carga es requerido"),
  carga_tipo: z.string().min(1, "Tipo de carga es requerido"),
  carga_peso: z.number().min(0, "Peso de carga es requerido"),
  correo_estado: z.string().min(1, "Estado de correo es requerido"),
  correo_tipo: z.string().min(1, "Tipo de correo es requerido"),
  correo_peso: z.number().min(0, "Peso de correo es requerido"),
});

const estadoOptions = ["Embarcada", "Desembarcada", "En tránsito"];
const tipoOptions = ["Paga", "Cortesía"];

export function FormAssignCargo(props: FormAssignCargoProps) {
  const { setOpenModalAdd } = props;
  const router = useRouter();
  const [fleetMovements, setFleetMovements] = useState<
    FormAssignCargoFleetMovementValues[]
  >([]);

  useEffect(() => {
    async function fetchFleetMovements() {
      try {
        const response = await fetch("/api/fleet-movement/without-cargo-mail");
        if (!response.ok) {
          throw new Error("Failed to fetch fleet movements");
        }
        const data = await response.json();
        setFleetMovements(data);
      } catch (error) {
        console.error("Error fetching fleet movements:", error);
      }
    }

    fetchFleetMovements();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opmf_id: undefined,
      pax_estado: undefined,
      pax_tipo: undefined,
      pax_cantidad: undefined,
      carga_estado: undefined,
      carga_tipo: undefined,
      carga_peso: undefined,
      correo_estado: undefined,
      correo_tipo: undefined,
      correo_peso: undefined,
    },
  });

  const { isValid } = form.formState;

  const sendFormData = async (formData: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/cargo-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const result = await response.json();
    } catch (error) {
      console.error("Error al enviar los datos del formulario:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...values,
        opmf_id: Number(values.opmf_id),
      };

      await sendFormData(payload);
      router.refresh();
      setOpenModalAdd(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      return;
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-3">
            {/* Campo para Movimiento de Flota */}
            <FormField
              control={form.control}
              name="opmf_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movimiento de Flota</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el movimiento de flota" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fleetMovements.map((movement) => (
                        <SelectItem
                          key={movement.opmf_id}
                          value={movement.opmf_id.toString()}
                        >
                          {`
                          ${formatDateSimple(movement.opmf_date)} - 
                          ${movement.opav_matricula_avion} - 
                          ${movement.opvu_co_vuelo}
                          | ${movement.gear_co_iata_aeropuerto_origin} - ${
                            movement.gear_co_iata_aeropuerto_destination
                          } 
                          `}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona un movimiento de flota sin correo de carga
                    asignado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agrupación de campos en un grid de tres columnas */}
            <div className="grid grid-cols-3 gap-6">
              {/* Datos de Pasajeros */}
              <div className="space-y-4">
                <FormLabel>Datos de Pasajeros</FormLabel>
                <FormField
                  control={form.control}
                  name="pax_estado"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange} // Mantener el valor tal cual
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estadoOptions.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pax_tipo"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange} // Mantener el valor tal cual
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tipoOptions.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pax_cantidad"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        type="number"
                        placeholder="Cantidad"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convertir a número
                      />
                      <FormDescription>
                        Información relacionada con los pasajeros.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Datos de Carga */}
              <div className="space-y-4">
                <FormLabel>Datos de Carga</FormLabel>
                <FormField
                  control={form.control}
                  name="carga_estado"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange} // Mantener el valor tal cual
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estadoOptions.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carga_tipo"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange} // Mantener el valor tal cual
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tipoOptions.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carga_peso"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        type="number"
                        placeholder="Peso"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convertir a número
                      />
                      <FormDescription>
                        Información relacionada con la carga.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Datos de Correo */}
              <div className="space-y-4">
                <FormLabel>Datos de Correo</FormLabel>
                <FormField
                  control={form.control}
                  name="correo_estado"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange} // Mantener el valor tal cual
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estadoOptions.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="correo_tipo"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange} // Mantener el valor tal cual
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tipoOptions.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="correo_peso"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        type="number"
                        placeholder="Peso"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convertir a número
                      />
                      <FormDescription>
                        Información relacionada con el correo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={!isValid}>
            Asignar
          </Button>
        </form>
      </Form>
    </div>
  );
}
