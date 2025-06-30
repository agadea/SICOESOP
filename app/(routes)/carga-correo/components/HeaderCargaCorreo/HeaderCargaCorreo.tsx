"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CirclePlus } from "lucide-react";

import { useState } from "react";
import { FormCreateCargaCorreo } from "./FormCreateCargaCorreo";

export function HeaderCargaCorreo() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">List of Carga y Correo</h2>
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Create Carga y Correo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create Carga y Correo</DialogTitle>
            <DialogDescription>
              Create and configure your Carga y Correo
            </DialogDescription>
          </DialogHeader>

          <FormCreateCargaCorreo setOpenModalCreate={setOpenModalCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
