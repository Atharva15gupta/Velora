import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://velora-web-blond.vercel.app";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/', 
        '/billing/', 
        '/create-workspace', 
        '/payment',
        '/inbox/',
        '/settings/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}