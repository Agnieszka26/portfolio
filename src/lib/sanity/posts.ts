import { unstable_cache } from "next/cache";
import { cache } from "react";

import { client } from "@/lib/sanity/client";
import {
  allPostsQuery,
  postDetailsQuery,
  postDetailsWithFallbackQuery,
  postsQuery,
} from "@/lib/sanity/queries";
import { DEFAULT_LANGUAGE } from "@/sanity/languages";
import type { Post, PostDetails } from "@/types/post";

const DEFAULT_LOCALE = DEFAULT_LANGUAGE.id;
const REVALIDATE_SECONDS = 3600;

function postsListTags(locale: string): string[] {
  return ["posts", `posts:${locale}`];
}

function postDetailTags(slug: string): string[] {
  return ["posts", `post:${slug}`];
}

async function fetchPostsList(locale: string): Promise<Post[]> {
  return client.fetch<Post[]>(postsQuery, { locale });
}

async function fetchAllPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(allPostsQuery);
}

async function fetchPostDetails(
  slug: string,
  locale: string,
  useFallback: boolean,
): Promise<PostDetails | null> {
  const query = useFallback
    ? postDetailsWithFallbackQuery
    : postDetailsQuery;

  const post = await client.fetch<PostDetails | null>(query, {
    slug,
    locale,
    defaultLocale: DEFAULT_LOCALE,
  });

  return post ?? null;
}

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

/**
 * Single published post by slug. Prefers requested locale, then default (`en`).
 * Returns `null` when no published document matches.
 *
 * Request-deduped with React `cache` (metadata + page) and cross-request
 * `unstable_cache` (tags: `posts`, `post:{slug}`).
 * Returns `null` only when the query succeeds with no match; fetch failures
 * are logged and re-thrown so they are not treated as missing posts.
 */
export const getPostDetails = cache(
  async (
    slug: string,
    locale: string = DEFAULT_LOCALE,
    options?: { fallback?: boolean },
  ): Promise<PostDetails | null> => {
    const useFallback = options?.fallback !== false;

    try {
      return await unstable_cache(
        () => fetchPostDetails(slug, locale, useFallback),
        ["post", slug, locale, String(useFallback)],
        {
          tags: postDetailTags(slug),
          revalidate: REVALIDATE_SECONDS,
        },
      )();
    } catch (error) {
      console.warn(
        `[getPostDetails] Failed to fetch post "${slug}" for locale "${locale}":`,
        error instanceof Error ? error.message : error,
      );
      throw error;
    }
  },
);
