import { MetadataRoute } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio-agnieszka26.vercel.app/';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}