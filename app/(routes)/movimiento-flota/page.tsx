"use client";
import React from "react";
import { HeaderFleetMovements, FleetMovementsTable } from "./components";

export default function MovimientoFlotaPage() {
  return (
    <div>
      <HeaderFleetMovements />
      <FleetMovementsTable />
    </div>
  );
}
