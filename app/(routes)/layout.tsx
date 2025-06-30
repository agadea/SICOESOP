"use client";
import { Navbar } from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useSessionManager } from "@/components/ui/useSessionManager";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hook de sesión avanzada
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { warning, logout } = useSessionManager({
    onWarning: () => setShowDialog(true),
    onLogout: () => {
      setShowDialog(false);
      router.push("/sign-in");
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <Sidebar />
      </div>
      <div className="w-full xl:ml-80">
        <Navbar />
        <div className="p-6 bg-[#fafbfc] dark:bg-secondary">{children}</div>
      </div>
      <Dialog open={showDialog}>
        <DialogContent hideClose>
          <DialogHeader>
            <DialogTitle>Expiración de sesión</DialogTitle>
            <DialogDescription>
              Tu sesión está por expirar por inactividad.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Button
              variant="default"
              className="px-4 py-2"
              onClick={() => setShowDialog(false)}
            >
              Seguir conectado
            </Button>
            <Button
              variant="destructive"
              className="px-4 py-2"
              onClick={() => setShowDialog(false)}
            >
              Cerrar sesión
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
