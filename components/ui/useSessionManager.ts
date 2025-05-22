import { useEffect, useRef, useState } from "react";

/**
 * Hook para manejo avanzado de sesión:
 * - Detecta inactividad (mouse/teclado) y expira sesión tras X minutos.
 * - Advierte antes de expirar (ej: 1 min antes).
 * - Refresca el token automáticamente si el usuario está activo.
 * - Permite logout manual.
 */
export function useSessionManager({
  warningMinutes = 1, // 1 minuto antes de expirar
  sessionMinutes = 15, // 15 minutos de sesión
  onLogout,
  onWarning,
}: {
  warningMinutes?: number;
  sessionMinutes?: number;
  onLogout?: () => void;
  onWarning?: () => void;
}) {
  const [warning, setWarning] = useState(false);
  const lastActivity = useRef(Date.now());
  const warningTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoutTimeout = useRef<NodeJS.Timeout | null>(null);

  // Refresca el token si el usuario está activo
  const refreshToken = async () => {
    await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
  };

  // Logout manual
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    if (onLogout) onLogout();
  };

  // Maneja actividad del usuario
  const handleActivity = () => {
    lastActivity.current = Date.now();
    setWarning(false);
    if (warningTimeout.current) clearTimeout(warningTimeout.current);
    if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
    // Programar advertencia (modal)
    warningTimeout.current = setTimeout(() => {
      setWarning(true);
      if (onWarning) onWarning();
    }, (sessionMinutes - warningMinutes) * 60 * 1000);
    // Programar logout automático
    logoutTimeout.current = setTimeout(() => {
      logout();
    }, sessionMinutes * 60 * 1000);
    // Refrescar token justo antes de expirar
    setTimeout(() => {
      refreshToken();
    }, (sessionMinutes - 1) * 60 * 1000);
  };

  useEffect(() => {
    // Escuchar eventos de actividad
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, handleActivity));
    handleActivity(); // Inicializa timers
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
      if (warningTimeout.current) clearTimeout(warningTimeout.current);
      if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
    };
    // eslint-disable-next-line
  }, []);

  return { warning, logout };
}
