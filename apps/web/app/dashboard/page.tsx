import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "View your AI agent's performance and conversations.",
};

// We will implement DashboardView in the next step
import { DashboardView } from "@/views/dashboard/dashboard-view";

const DashboardPage = () => {
  return <DashboardView />;
};

export default DashboardPage;
