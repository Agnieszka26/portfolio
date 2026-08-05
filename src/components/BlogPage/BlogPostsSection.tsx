"use client";

import { Link } from "@/i18n/navigation";
import type { Post } from "@/types/post";
import { postSlug, toRemoteCoverImage } from "@/types";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import pageStyles from "./BlogPage.module.scss";
import Button from "@/atoms/Button/Button";

const ALL_CATEGORY = "__all__";

function formatPublishedDate(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat(locale.startsWith("pl") ? "pl-PL" : "en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .toUpperCase();
}

function estimateReadingMinutes(excerpt: string | null | undefined): number {
  const words = (excerpt ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 40) || 3);
}

function uniqueTags(posts: Post[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const normalized = tag.trim();
      if (!normalized) continue;
      const key = normalized.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      tags.push(normalized);
    }
  }

  return tags;
}

function postMatchesCategory(post: Post, category: string): boolean {
  if (category === ALL_CATEGORY) return true;
  const target = category.toLowerCase();
  return (post.tags ?? []).some((tag) => tag.trim().toLowerCase() === target);
}

type BlogPostsSectionProps = {
  posts: Post[];
  locale: string;
};

export default function BlogPostsSection({
  posts,
  locale,
}: BlogPostsSectionProps) {
  const t = useTranslations("BlogPage");
  const categories = useMemo(() => uniqueTags(posts), [posts]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);

  const visiblePosts = useMemo(
    () => posts.filter((post) => postMatchesCategory(post, selectedCategory)),
    [posts, selectedCategory],
  );

  return (
    <>
      {categories.length > 0 ? (
        <ul
          className={pageStyles.categories}
          aria-label={t("categoriesLabel")}
        >
          <li>
            <Button
              text={t("allCategories")}
              color={selectedCategory === ALL_CATEGORY ? "dark" : "light"}
              onClick={() => setSelectedCategory(ALL_CATEGORY)}
            />
          </li>
          {categories.map((category) => {
            const isActive =
              selectedCategory.toLowerCase() === category.toLowerCase();

            return (
              <li key={category}>
                <Button
                  text={category}
                  color={isActive ? "dark" : "light"}
                  onClick={() => setSelectedCategory(category)}
                />
              </li>
            );
          })}
        </ul>
      ) : null}

      {visiblePosts.length === 0 ? (
        <p className={pageStyles.empty} role="status">
          {t("empty")}
        </p>
      ) : (
        <ul className={pageStyles.list}>
          {visiblePosts.map((post) => {
            const slug = postSlug(post);
            const cover = toRemoteCoverImage(post.coverImage);
            const primaryTag = post.tags?.find((tag) => tag.trim())?.trim();
            const readingMinutes = estimateReadingMinutes(post.excerpt);

            return (
              <li key={post._id} className={pageStyles.item}>
                <article>
                  <Link
                    href={`/post/${slug}`}
                    className={pageStyles.link}
                    aria-label={`${t("readMore")}: ${post.title}`}
                  >
                    <div className={pageStyles.imageWrap}>
                      <Image
                        src={cover.url}
                        alt={post.coverImage?.alt?.trim() || post.title}
                        fill
                        sizes="(max-width: 764px) 100vw, 50vw"
                        className={pageStyles.image}
                      />
                    </div>

                    <div className={pageStyles.body}>
                      {primaryTag ? (
                        <span className={pageStyles.tag}>{primaryTag}</span>
                      ) : null}

                      <h2 className={pageStyles.title}>{post.title}</h2>

                      {post.excerpt ? (
                        <p className={pageStyles.excerpt}>{post.excerpt}</p>
                      ) : null}

                      <div className={pageStyles.meta}>
                        <div className={pageStyles.metaText}>
                          <time dateTime={post.publishedAt}>
                            {formatPublishedDate(post.publishedAt, locale)}
                          </time>
                          <span className={pageStyles.dot} aria-hidden="true">
                            •
                          </span>
                          <span>
                            {t("readingTime", { minutes: readingMinutes })}
                          </span>
                        </div>
                        <span className={pageStyles.arrow} aria-hidden="true">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
