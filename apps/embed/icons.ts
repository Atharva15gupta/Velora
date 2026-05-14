export const getLogoIcon = (widgetUrl: string) => {
  const logoUrl = `${new URL(widgetUrl).origin}/velora-logo.svg?v=20260514`;

  return `<img src="${logoUrl}" alt="Velora" style="width: 38px; height: 38px; object-fit: contain; display: block;" />`;
};

// Close X icon
export const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;
