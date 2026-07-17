import { client } from "@/lib/sanity/client";
import {
  projectDetailsQuery,
  projectDetailsWithFallbackQuery,
} from "@/lib/sanity/queries";
import { DEFAULT_LANGUAGE } from "@/sanity/languages";
import type { ProjectDetails } from "@/types/project";

export async function getProjectDetails(
  slug: string,
  locale: string,
  options: { fallback?: boolean } = { fallback: true },
): Promise<ProjectDetails | null> {
  try {
    const query =
      options.fallback !== false
        ? projectDetailsWithFallbackQuery
        : projectDetailsQuery;

    const project = await client.fetch<ProjectDetails | null>(query, {
      slug,
      locale,
      defaultLocale: DEFAULT_LANGUAGE.id,
    });

    return project ?? null;
  } catch (error) {
    console.warn(
      `[getDetails] Failed to fetch project "${slug}" for locale "${locale}":`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

/** @deprecated Prefer `getProjectDetails` — kept for existing call sites. */
export async function getDetailById(
  locale: string,
  id: string,
): Promise<ProjectDetails | null> {
  return getProjectDetails(id, locale);
}

export default getProjectDetails;
