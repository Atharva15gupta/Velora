import {
  BarsIcon,
  FolderIcon,
  InboxIcon,
  IntegrationIcon,
  // PluginsIcon,
  RocketIcon,
  SettingsIcon,
  Sparkles2Icon,
  SupportIcon,
  UsersIcon,
  WebIcon,
} from "@workspace/ui/components/icons";

export const SIDEBAR_ITEMS = {
  primary: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: RocketIcon,
    },
    {
      title: "Conversations",
      url: "/dashboard/conversations",
      icon: InboxIcon,
    },
  ],
  insights: [
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarsIcon,
    },
  ],
  sources: [
    {
      title: "Web Content",
      url: "/dashboard/knowledge-base/web-content",
      icon: WebIcon,
    },
    {
      title: "Data Importer",
      url: "/dashboard/knowledge-base/data-importer",
      icon: FolderIcon,
    },
  ],
  configuration: [
    {
      title: "AI Agent",
      url: "/dashboard/agent",
      icon: Sparkles2Icon,
    },
    {
      title: "Integrations",
      url: "/dashboard/integrations",
      icon: IntegrationIcon,
    },
    {
      title: "Billing",
      url: "/dashboard/billing",
      icon: SettingsIcon,
    },
  ],
  footer: [
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: SupportIcon,
    },
  ],
};
