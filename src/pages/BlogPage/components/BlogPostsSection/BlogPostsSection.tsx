"use client";


import type { Post } from "@/types/post";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import pageStyles from "./BlogPostsSection.module.scss";
import Button from "@/atoms/Button/Button";
import BlogCard from "../BlogCard/BlogCard";

const ALL_CATEGORY = "__all__";


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
            return <BlogCard key={post._id} post={post} locale={locale} />;
          })}
        </ul>
      )}
    </>
  );
}
