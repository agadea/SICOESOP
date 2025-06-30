import { CardSummary } from "./components/CardSummary/CardSummary";
import { BookOpenCheck, List, UsersRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";
import { SalesDistributor } from "./components/SalesDistributor";
import { TotalSuscribers } from "./components/TotalSuscribers";
import { ListIntegrations } from "./components/ListIntegrations";
import { dataCardsSummary } from "./components/CardSummary/CardSummary.data";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-x-20">
        {dataCardsSummary.map(
          ({ icon, total, average, title, tooltipText }) => (
            <CardSummary
              key={title}
              icon={icon}
              total={total}
              average={average}
              title={title}
              tooltipText={tooltipText}
            />
          )
        )}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
        <LastCustomers />
        <SalesDistributor />
      </div>
      <div className=" flex-col md:gap-x-10 xl:flex xl:flex-row gap-y-4 sm:gap-y-0 mt-12 md:mb-10 justify-center">
        <TotalSuscribers />
        <ListIntegrations />
      </div>
      {/* Se eliminó la tabla de movimientos de flota demo */}
    </div>
  );
}
