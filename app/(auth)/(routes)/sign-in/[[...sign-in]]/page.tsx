"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function SignInPage() {
  const [nacionalidad, setNacionalidad] = useState("VE");
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true); // Nuevo estado para verificar token
  const router = useRouter();

  useEffect(() => {
    // Validar sesión al cargar la página
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace("/");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nacionalidad, documento, password }),
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) {
      // Forzar seteo de cookie sin secure en desarrollo
      // (Asegúrate de que en el backend esté: secure: false en desarrollo)
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.push("/");
    } else {
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Si la respuesta no es JSON válido
        setError("Error de autenticación");
        return;
      }
      setError(data.error || "Error de autenticación");
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-1/2 max-w-xs">
          <Progress value={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-8 rounded shadow-md w-full max-w-sm space-y-4 border border-border"
      >
        <h1 className="text-2xl font-bold mb-4 text-foreground">
          Iniciar sesión
        </h1>
        <div className="flex gap-2">
          <div className="w-1/3">
            <label
              className="block mb-1 text-foreground"
              htmlFor="nacionalidad"
            >
              Doc.
            </label>
            <Select
              value={nacionalidad}
              onValueChange={setNacionalidad}
              name="nacionalidad"
            >
              <SelectTrigger id="nacionalidad">
                <SelectValue placeholder="Doc." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VE">VE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-2/3">
            <label className="block mb-1 text-foreground" htmlFor="documento">
              N° de documento
            </label>
            <Input
              id="documento"
              value={documento}
              onChange={(e) => {
                // Solo permitir números
                const val = e.target.value.replace(/\D/g, "");
                setDocumento(val);
              }}
              required
              placeholder="Ej: 12345678"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="username"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-foreground" htmlFor="password">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Tu contraseña"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </div>
  );
}
