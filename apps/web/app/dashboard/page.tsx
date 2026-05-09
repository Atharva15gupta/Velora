import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "View your AI agent's performance and conversations.",
};

import { GetStartedView } from "@/views/dashboard/get-started-view";

const DashboardPage = () => {
  return <GetStartedView />;
};

export default DashboardPage;
