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
import { FleetMovementForm } from "./FleetMovementForm";

export function HeaderFleetMovements({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [openBulkDialog, setOpenBulkDialog] = useState(false);
  const [openIndividual, setOpenIndividual] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Movimientos de Flota</h2>
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
                setTimeout(() => setOpenIndividual(true), 200);
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
      <Dialog open={openIndividual} onOpenChange={setOpenIndividual}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-secondary">
          <DialogHeader>
            <DialogTitle>Movimiento individual</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <FleetMovementForm
            onSuccess={() => {
              setOpenIndividual(false);
              onCreated?.();
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openBulkDialog} onOpenChange={setOpenBulkDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-secondary">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Carga masiva de movimientos de flota
            </DialogTitle>
            <DialogDescription className="sr-only">
              Selecciona o arrastra un archivo Excel (.xlsx) con los movimientos
              de flota a cargar. Solo se permite un archivo por vez.
            </DialogDescription>
          </DialogHeader>
          <BulkUploadFleetMovements
            onSuccess={() => {
              setOpenBulkDialog(false);
              onCreated?.();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
