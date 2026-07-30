import type { MetadataRoute } from "next";
import getProjects from "@/lib/getProjects";
import { getPosts } from "@/lib/sanity/posts";
import { SITE_URL } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import { postSlug, projectSlug } from "@/types";

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
  const staticPaths = ["", "/contact", "/projects", "/blog"] as const;

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
  const localesByProjectSlug = new Map<string, string[]>();
  for (const { locale, projects } of projectsByLocale) {
    for (const project of projects) {
      const slug = projectSlug(project);
      const locales = localesByProjectSlug.get(slug) ?? [];
      locales.push(locale);
      localesByProjectSlug.set(slug, locales);
    }
  }

  const projectEntries: MetadataRoute.Sitemap = projectsByLocale.flatMap(
    ({ locale, projects }) =>
      projects.map((project) => {
        const slug = projectSlug(project);
        const pathWithoutLocale = `/projects/${slug}`;
        const availableLocales = localesByProjectSlug.get(slug) ?? [locale];

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

  const postsByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale,
      posts: await getPosts(locale),
    })),
  );

  /**
   * Locales that can render each post slug — mirrors getPosts locale + fallback
   * (a default-locale post appears for every locale that has no translation).
   */
  const localesByPostSlug = new Map<string, string[]>();
  for (const { locale, posts } of postsByLocale) {
    for (const post of posts) {
      const slug = postSlug(post);
      const locales = localesByPostSlug.get(slug) ?? [];
      locales.push(locale);
      localesByPostSlug.set(slug, locales);
    }
  }

  const postEntries: MetadataRoute.Sitemap = postsByLocale.flatMap(
    ({ locale, posts }) =>
      posts.map((post) => {
        const slug = postSlug(post);
        const pathWithoutLocale = `/post/${slug}`;
        const availableLocales = localesByPostSlug.get(slug) ?? [locale];

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

  return [...staticEntries, ...projectEntries, ...postEntries];
}
