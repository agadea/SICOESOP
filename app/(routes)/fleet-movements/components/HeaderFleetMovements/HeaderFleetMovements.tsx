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

import { FormAddMovement } from "../FormAddMovement";

export function HeaderFleetMovements() {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">List of Fleet Movements</h2>

      <Dialog open={openDialogCreate} onOpenChange={setOpenDialogCreate}>
        <DialogTrigger asChild>
          <Button>Create Fleet Movement</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add Movement</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new fleet movement.
            </DialogDescription>
          </DialogHeader>

          <FormAddMovement setOpenModalAdd={setOpenDialogCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
