import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";

interface FleetMovementsActionsProps {
  id: number;
  onDelete: (id: number) => void;
}

export const FleetMovementsActions: React.FC<FleetMovementsActionsProps> = ({
  id,
  onDelete,
}) => (
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
        onClick={() => navigator.clipboard.writeText(id.toString())}
      >
        Copiar ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem /* onClick={...} */>Editar</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-600">
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
