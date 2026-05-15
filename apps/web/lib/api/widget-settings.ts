import { axiosInstance } from "../axios";

const BRAND_BLUE = "#406AAF";
const LEGACY_THEME_COLOR = "#047857";

const normalizeThemeColor = (value: string | null) =>
  value?.trim().toLowerCase() === LEGACY_THEME_COLOR ? BRAND_BLUE : value;

export type WidgetSectionItem = {
  title: string;
  description?: string;
  linkLabel: string;
  linkUrl: string;
};

export type WidgetSection = {
  enabled: boolean;
  title: string;
  items: WidgetSectionItem[];
};

export type WidgetSettings = {
  brandName: string;
  companyLogoUrl: string | null;
  greetMessage: string | null;
  themeMode: "light" | "dark";
  gradientFrom: string | null;
  themeColor: string | null;
  defaultSuggestions: {
    suggestion1: string | null;
    suggestion2: string | null;
    suggestion3: string | null;
  } | null;
  whatsNewSection: WidgetSection | null;
  featuredArticlesSection: WidgetSection | null;
};

export type WidgetSettingsPayload = Omit<
  WidgetSettings,
  "defaultSuggestions"
> & {
  defaultSuggestions?: WidgetSettings["defaultSuggestions"];
};

export const getWidgetSettings = async (workspaceId: string) => {
  const { data } = await axiosInstance.get(`/workspace/${workspaceId}/widget-setting`);
  const widgetSettings = data.widgetSettings as WidgetSettings;

  return {
    ...widgetSettings,
    themeColor: normalizeThemeColor(widgetSettings.themeColor),
  };
};

export const updateWidgetSettings = async (
  workspaceId: string,
  payload: WidgetSettingsPayload
) => {
  const { data } = await axiosInstance.post(
    `/workspace/${workspaceId}/widget-setting`,
    payload
  );
  return data as { message: string };
};
