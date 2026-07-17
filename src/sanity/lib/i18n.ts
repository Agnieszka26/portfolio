import { client } from "@/lib/sanity/client";
import {
  projectDetailsQuery,
  projectDetailsWithFallbackQuery,
  projectsQuery,
} from "@/lib/sanity/queries";
import { DEFAULT_LANGUAGE, type Locale } from "../languages";

const DEFAULT_LOCALE = DEFAULT_LANGUAGE.id;

type FetchParams = Record<string, string | undefined>;

export async function fetchByLocale<T>(
  query: string,
  locale: Locale | string,
  params: FetchParams = {},
): Promise<T[]> {
  return client.fetch<T[]>(query, { locale, ...params });
}

export async function fetchDocumentByLocale<T>(
  query: string,
  locale: Locale | string,
  params: FetchParams = {},
  defaultLocale: Locale | string = DEFAULT_LOCALE,
): Promise<T | null> {
  return client.fetch<T | null>(query, {
    locale,
    defaultLocale,
    ...params,
  });
}

export async function getProjectBySlug<T>(
  slug: string,
  locale: Locale | string,
  options: { fallback?: boolean } = { fallback: true },
): Promise<T | null> {
  const query =
    options.fallback !== false
      ? projectDetailsWithFallbackQuery
      : projectDetailsQuery;

  return fetchDocumentByLocale<T>(query, locale, { slug });
}

export async function getProjects<T>(locale: Locale | string): Promise<T[]> {
  return fetchByLocale<T>(projectsQuery, locale);
}

export {
  projectDetailsQuery,
  projectDetailsWithFallbackQuery,
  projectsQuery,
} from "@/lib/sanity/queries";
