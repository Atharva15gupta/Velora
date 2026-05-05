import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics & Insights",
  description: "Track conversation volume, resolution progress, and queue health across your Velora workspaces.",
};

import { AnalyticsView } from "@/views/dashboard/analytics-view";

export default function AnalyticsPage() {
    return <AnalyticsView />;
}
