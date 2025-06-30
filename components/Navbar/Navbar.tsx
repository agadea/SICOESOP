import { Menu, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarRoutes } from "../SidebarRoutes";
import { useEffect, useState } from "react";
import { UserDropdown } from "./components/UserDropdown";

interface NavbarUser {
  nombre: string;
  codigoEmpleado: string;
}

export function Navbar() {
  const [user, setUser] = useState<NavbarUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      });
  }, []);

  const nombre = user?.nombre?.trim() || "Usuario";
  const codigoEmpleado = user?.codigoEmpleado || "-";
  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative w-[300px]">
        <Input placeholder="Search..." className="rounded-lg" />
        <Search strokeWidth={1} className="absolute top-2 right-2" />
      </div>
      <div className="flex gap-x-2 items-center">
        <ToggleTheme />
        <UserDropdown
          nombre={nombre}
          codigoEmpleado={codigoEmpleado}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
