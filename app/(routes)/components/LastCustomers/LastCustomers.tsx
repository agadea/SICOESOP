import { PlaneTakeoff } from "lucide-react";
import { CustomIcon } from "@/components/CustomIcon";
import { CustomersTable } from "../CustomersTable";

export function LastCustomers() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5">
      <div className="flex gap-x-2 items-center">
        <CustomIcon icon={PlaneTakeoff} />
        <p className="text-xl">Últimos Movimientos y Demoras</p>
      </div>
      <div>
        <CustomersTable />
      </div>
    </div>
  );
}
