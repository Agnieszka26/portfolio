import { Link } from "@/i18n/navigation";
import type { Post } from "@/types/post";
import { postSlug } from "@/types/post";
import { toRemoteCoverImage } from "@/types";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroBlogPage from "./components/Header";
import pageStyles from "./BlogPage.module.scss";
import Button from "@/atoms/Button/Button";

function formatPublishedDate(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat(locale.startsWith("pl") ? "pl-PL" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .toUpperCase();
}

/** Rough estimate — list payload has excerpt only, not full body. */
function estimateReadingMinutes(excerpt: string | null | undefined): number {
  const words = (excerpt ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 40) || 3);
}

function uniqueTags(posts: Post[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  console.log("posts[0].tags", posts[0].tags);
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

type BlogPageProps = {
  posts: Post[];
  locale: string;
};

const BlogPage = async ({ posts, locale }: BlogPageProps) => {
  const t = await getTranslations("BlogPage");
  const categories = uniqueTags(posts);

  return (
    <div className={pageStyles.page}>
      <HeroBlogPage
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />
      {categories.length > 0 ? (<>
        <ul className={pageStyles.categories}>
          <li className={pageStyles.category}>
            <Button text={t("allCategories")} color="dark" />
          </li>
          {categories.map((category) => (
            <li key={category} className={pageStyles.category}>
              <Button text={category} color="dark" />
            </li>
          ))}
        </ul>
      </>) : null}

      {posts.length === 0 ? (
        <p className={pageStyles.empty} role="status">
          {t("empty")}
        </p>
      ) : (
        <ul className={pageStyles.list}>
          {posts.map((post) => {
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
    </div>
  );
};

export default BlogPage;
