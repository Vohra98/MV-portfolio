import MaintenanceMode from "@/components/MaintenanceMode";
import PortfolioContent from "@/components/PortfolioContent";

// Toggle maintenance mode here
const MAINTENANCE_MODE = true;

export default function Home() {
  if (MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }

  return (
    <main className="min-h-screen">
      <PortfolioContent />
    </main>
  );
}
