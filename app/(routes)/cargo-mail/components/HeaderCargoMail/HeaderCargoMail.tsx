"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormAssignCargo } from "../FormAssignCargo";

export function HeaderCargoMail() {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Carga y Correo</h2>

      <Dialog open={openDialogCreate} onOpenChange={setOpenDialogCreate}>
        <DialogTrigger asChild>
          <Button>Asignar Carga y Correo</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Asignar Cargar y Correo</DialogTitle>
            <DialogDescription>
              Asigna carga y correo a un movimiento existente. Completa los
              detalles necesarios para la asignación.
            </DialogDescription>
          </DialogHeader>

          <FormAssignCargo setOpenModalAdd={setOpenDialogCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
