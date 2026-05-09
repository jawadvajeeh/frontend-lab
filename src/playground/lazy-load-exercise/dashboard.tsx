import ActivityTable from "./activity-table";
import HeavyChart from "./heavy-chart";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Imagine this page is expensive to load.</p>

      <HeavyChart />
      <ActivityTable />
    </div>
  );
}
