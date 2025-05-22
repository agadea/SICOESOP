import { Logo } from "@/components/Logo";
import React from "react";

export default function layoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <Logo />
      <h1 className="text-3xl my-2">Bienvenido al Dashboard!</h1>
      <h2 className="text-2xl mb-3">Esta es una aplicacion de ejemplo.</h2>
      {children}
    </div>
  );
}
