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
import { FormAssignCargoProps } from "./FormAssignCargo.types";
import { useRouter } from "next/navigation";
import { oper_mov_flota } from "@/lib/generated/prisma";
import { formatDateSimple } from "@/lib/formatters";

const formSchema = z.object({
  fleetMovement_id: z.number().min(1, "Fleet movement is required"),
  name: z.string().min(3, "Name is required"),
  date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
  description: z.string().optional(),
});

export function FormAssignCargo(props: FormAssignCargoProps) {
  const { setOpenModalAdd } = props;
  const router = useRouter();
  const [fleetMovements, setFleetMovements] = useState<oper_mov_flota[]>([]);

  useEffect(() => {
    async function fetchFleetMovements() {
      try {
        const response = await fetch("/api/cargo-mail/without-cargo-mail");
        if (!response.ok) {
          throw new Error("Failed to fetch fleet movements");
        }
        const data = await response.json();
        console.log("🚀 ~ fetchFleetMovements ~ data:", data);
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
      name: "",
      date: new Date(),
      description: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await fetch("/api/cargo-mail", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify(values),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to submit form");
      // }

      // const data = await response.json();
      // console.log("Form submitted successfully:", data);

      // Close the modal after successful submission
      console.log("Form submitted with values:", values);
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
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the fleet movement.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? (field.value instanceof Date
                              ? field.value
                              : new Date(field.value)
                            )
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Select the date of the fleet movement.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide an optional description for the fleet movement.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fleetMovement_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movimiento de Flota</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el movimiento de flota" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fleetMovements.map((movement) => (
                        <SelectItem
                          key={movement.opmf_id}
                          value={movement.opmf_id.toString()} // Convertir a cadena
                        >
                          {`
                          ${formatDateSimple(movement.opmf_date)} - 
                          ${movement.opmf_opav_id_avion} - 
                          ${movement.opmf_opvu_id_vuelo} 
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
          </div>
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
