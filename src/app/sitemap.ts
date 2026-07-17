import type { MetadataRoute } from "next";
import getProjects from "@/lib/getProjects";
import { SITE_URL } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import { projectSlug } from "@/types";

/** Absolute URL matching `trailingSlash: true` in next.config.js */
function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized.replace(/\/+$/, "")}/`;
}

function localeAlternates(pathWithoutLocale: string): Record<string, string> {
  const path =
    !pathWithoutLocale || pathWithoutLocale === "/"
      ? ""
      : pathWithoutLocale.replace(/\/+$/, "");

  return Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)]),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/contact", "/projects"] as const;

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${page}`),    
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: localeAlternates(page || "/"),
      },
    })),
  );

  const projectsByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale,
      projects: await getProjects(locale),
    })),
  );

  /** Locales that publish each project slug — used for accurate hreflang. */
  const localesBySlug = new Map<string, string[]>();
  for (const { locale, projects } of projectsByLocale) {
    for (const project of projects) {
      const slug = projectSlug(project);
      const locales = localesBySlug.get(slug) ?? [];
      locales.push(locale);
      localesBySlug.set(slug, locales);
    }
  }

  const projectEntries: MetadataRoute.Sitemap = projectsByLocale.flatMap(
    ({ locale, projects }) =>
      projects.map((project) => {
        const slug = projectSlug(project);
        const pathWithoutLocale = `/projects/${slug}`;
        const availableLocales = localesBySlug.get(slug) ?? [locale];

        return {
          url: absoluteUrl(`/${locale}${pathWithoutLocale}`),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              availableLocales.map((availableLocale) => [
                availableLocale,
                absoluteUrl(`/${availableLocale}${pathWithoutLocale}`),
              ]),
            ),
          },
        };
      }),
  );

  return [...staticEntries, ...projectEntries];
}
