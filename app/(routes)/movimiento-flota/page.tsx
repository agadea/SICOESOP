"use client";
import React, { useState } from "react";
import { HeaderFleetMovements } from "./components/HeaderFleetMovements";
import { FleetMovementsTable } from "./components/FleetMovementsTable";

export default function MovimientoFlotaPage() {
  const [reload, setReload] = useState(0);
  return (
    <div>
      <HeaderFleetMovements onCreated={() => setReload((r) => r + 1)} />
      <FleetMovementsTable key={reload} />
    </div>
  );
}
