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
import { BulkUploadFleetMovements } from "./BulkUploadFleetMovements";

export function HeaderFleetMovements() {
  const [openModal, setOpenModal] = useState(false);
  const [openBulkDialog, setOpenBulkDialog] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl">Movimiento de Flota</h2>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>Agregar Movimiento</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              ¿Cómo deseas agregar movimientos de flota?
            </DialogTitle>
            <DialogDescription>
              Selecciona si deseas agregar un movimiento individual o realizar
              una carga masiva.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setOpenModal(false);
                // Aquí lógica para individual
              }}
            >
              Movimiento individual
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpenModal(false);
                setTimeout(() => setOpenBulkDialog(true), 200);
              }}
            >
              Carga masiva
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openBulkDialog} onOpenChange={setOpenBulkDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-secondary">
          <BulkUploadFleetMovements />
        </DialogContent>
      </Dialog>
    </div>
  );
}
