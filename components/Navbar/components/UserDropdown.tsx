import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserDropdownProps {
  nombre: string;
  codigoEmpleado: string;
  onLogout: () => void;
}

export function UserDropdown({
  nombre,
  codigoEmpleado,
  onLogout,
}: UserDropdownProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/sign-in");
    } catch {
      router.push("/sign-in");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title={nombre}
          aria-label="Menú de usuario"
        >
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{nombre}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Código empleado: {codigoEmpleado}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
