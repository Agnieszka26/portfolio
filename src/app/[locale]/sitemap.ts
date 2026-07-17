import { MetadataRoute } from "next";
import getProjects from "../../lib/getProjects";
import { projectSlug } from "@/types";
import { routing } from "@/i18n/routing";

const BASE_URL =
(process.env.NEXT_PUBLIC_BASE_URL ||
     "https://portfolio-agnieszka26.vercel.app").replace(/\/+$/, "");



const locales = routing.locales;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/contact", "/projects"];

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
    })),
  );

  const projectUrls = (
    await Promise.all(
      locales.map(async (locale) => {
        const projects = await getProjects(locale);
        return projects.map((project) => ({
          url: `${BASE_URL}/${locale}/projects/${projectSlug(project)}`,
          lastModified: new Date(),
        }));
      }),
    )
  ).flat();

  return [...staticUrls, ...projectUrls];
}
