import { unstable_cache } from "next/cache";
import { cache } from "react";

import { client } from "@/lib/sanity/client";
import {
  allPostsQuery,
  postGroupSlugsQuery,
  postRouteQuery,
  postSitemapQuery,
  postsQuery,
} from "@/lib/sanity/queries";
import { isSupportedLocale, type Locale } from "@/sanity/languages";
import type { Post, PostDetails } from "@/types/post";

const REVALIDATE_SECONDS = 3600;

function postsListTags(locale: string): string[] {
  return ["posts", `posts:${locale}`];
}

function postDetailTags(slugs: string[]): string[] {
  return ["posts", ...slugs.map((slug) => `post:${slug}`)];
}

async function fetchPostsList(locale: string): Promise<Post[]> {
  return client.fetch<Post[]>(postsQuery, { locale });
}

async function fetchAllPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(allPostsQuery);
}

type TranslationRow = {
  locale?: string | null;
  slug?: string | null;
};

type RoutedPost = PostDetails & {
  translations?: TranslationRow[] | null;
};

type PostRoutePayload = {
  current: RoutedPost | null;
  source: { translations?: TranslationRow[] | null } | null;
};

export type PostLocaleAlternate = {
  locale: Locale;
  slug: string;
};

export type ResolvedPost =
  | {
      kind: "found";
      post: PostDetails;
      alternates: PostLocaleAlternate[];
    }
  | {
      kind: "redirect";
      href: string;
      locale: Locale;
    }
  | {
      kind: "listing";
      href: "/blog/";
      locale: Locale;
    }
  | {
      kind: "missing";
    };

export type PostSitemapRecord = {
  language: Locale;
  slug: string;
  translationId: string | null;
};

/**
 * Published blog posts for a locale only (no cross-locale fallback).
 * Omit `locale` to fetch all published posts across languages.
 *
 * Cross-request cache via `unstable_cache` (tags: `posts`, `posts:{locale}`).
 * Returns `[]` only when the query succeeds with no published posts; fetch
 * failures are logged and re-thrown so they are not treated as empty results.
 */
export async function getPosts(locale?: string): Promise<Post[]> {
  try {
    if (!locale) {
      return await unstable_cache(fetchAllPosts, ["posts", "all"], {
        tags: ["posts"],
        revalidate: REVALIDATE_SECONDS,
      })();
    }

    return await unstable_cache(
      () => fetchPostsList(locale),
      ["posts", "locale-strict", locale],
      {
        tags: postsListTags(locale),
        revalidate: REVALIDATE_SECONDS,
      },
    )();
  } catch (error) {
    console.warn(
      `[getPosts] Failed to fetch posts${locale ? ` for locale "${locale}"` : ""}:`,
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}

function publishedAlternates(
  rows: TranslationRow[] | null | undefined,
  fallback?: { locale: string; slug: string },
): PostLocaleAlternate[] {
  const map = new Map<Locale, string>();

  if (fallback && isSupportedLocale(fallback.locale) && fallback.slug) {
    map.set(fallback.locale, fallback.slug);
  }

  for (const row of rows ?? []) {
    const locale = row.locale?.trim();
    const slug = row.slug?.trim();
    if (!locale || !slug || !isSupportedLocale(locale)) continue;
    map.set(locale, slug);
  }

  return Array.from(map.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([locale, slug]) => ({ locale, slug }));
}

function withoutTranslations(document: RoutedPost): PostDetails {
  const { translations: _translations, ...post } = document;
  return post;
}

function interpretPostRoute(
  payload: PostRoutePayload | null,
  slug: string,
  locale: string,
): ResolvedPost {
  if (!isSupportedLocale(locale)) {
    return { kind: "missing" };
  }

  const current = payload?.current ?? null;
  if (current) {
    return {
      kind: "found",
      post: withoutTranslations(current),
      alternates: publishedAlternates(current.translations, {
        locale,
        slug: current.slug || slug,
      }),
    };
  }

  const alternates = publishedAlternates(payload?.source?.translations);
  const target = alternates.find((item) => item.locale === locale);
  if (target && target.slug !== slug) {
    return {
      kind: "redirect",
      href: `/post/${target.slug}/`,
      locale,
    };
  }

  if (payload?.source) {
    return { kind: "listing", href: "/blog/", locale };
  }

  return { kind: "missing" };
}

async function fetchPostGroupSlugs(slug: string): Promise<string[]> {
  const rows = await client.fetch<
    Array<{ slugs?: Array<string | null> | null }>
  >(postGroupSlugsQuery, { slug });

  const slugs = new Set<string>([slug]);
  for (const row of rows ?? []) {
    for (const value of row?.slugs ?? []) {
      if (value) slugs.add(value);
    }
  }

  return Array.from(slugs).sort();
}

async function fetchPostRoutePayload(
  slug: string,
  locale: string,
): Promise<PostRoutePayload> {
  const payload = await client.fetch<PostRoutePayload | null>(postRouteQuery, {
    slug,
    locale,
  });

  return payload ?? { current: null, source: null };
}

/**
 * Published post for this slug and locale, or the instruction to redirect.
 *
 * A matching document in the requested locale is returned as `found`.
 * The same slug on another locale redirects to that locale's published
 * sibling from `translation.metadata` when one exists, and to the blog
 * index when the group has no published translation. Unknown slugs are
 * `missing`.
 *
 * Request-deduped with React `cache` (metadata + page). The Sanity payload
 * is cached per slug, locale, and translation-group membership. Cache tags
 * include every slug in the group (`post:{slug}`) plus `posts`.
 */
export const resolvePublishedPost = cache(
  async (slug: string, locale: string): Promise<ResolvedPost> => {
    try {
      const groupSlugs = await fetchPostGroupSlugs(slug);
      const payload = await unstable_cache(
        () => fetchPostRoutePayload(slug, locale),
        ["post-route", slug, locale, JSON.stringify(groupSlugs)],
        {
          tags: postDetailTags(groupSlugs),
          revalidate: REVALIDATE_SECONDS,
        },
      )();

      return interpretPostRoute(payload, slug, locale);
    } catch (error) {
      console.warn(
        `[resolvePublishedPost] Failed to resolve post "${slug}" for locale "${locale}":`,
        error instanceof Error ? error.message : error,
      );
      throw error;
    }
  },
);

async function fetchPostSitemapRecords(): Promise<PostSitemapRecord[]> {
  const rows = await client.fetch<
    Array<{
      language?: string | null;
      slug?: string | null;
      translationId?: string | null;
    }>
  >(postSitemapQuery);

  return (rows ?? []).flatMap((row) => {
    if (!row.language || !row.slug || !isSupportedLocale(row.language)) {
      return [];
    }

    return [
      {
        language: row.language,
        slug: row.slug,
        translationId: row.translationId ?? null,
      },
    ];
  });
}

/** Published posts with the translation-group id used to pair hreflang URLs. */
export async function getPostSitemapRecords(): Promise<PostSitemapRecord[]> {
  try {
    return await unstable_cache(
      fetchPostSitemapRecords,
      ["posts", "sitemap"],
      {
        tags: ["posts"],
        revalidate: REVALIDATE_SECONDS,
      },
    )();
  } catch (error) {
    console.warn(
      "[getPostSitemapRecords] Failed to fetch posts for the sitemap:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}
