import styles from "@/assets/styles/index.module.scss";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/types/post";
import { postSlug } from "@/types/post";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import { getTranslations } from "next-intl/server";
import pageStyles from "./BlogPage.module.scss";

function formatPublishedDate(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat(locale.startsWith("pl") ? "pl-PL" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

type BlogPageProps = {
  posts: Post[];
  locale: string;
};

const BlogPage = async ({ posts, locale }: BlogPageProps) => {
  const t = await getTranslations("BlogPage");

  return (
    <div className={styles.page}>
      <header className={pageStyles.header}>
        <Header text={t("title")} color="dark" as="h1" />
      </header>

      {posts.length === 0 ? (
        <p className={pageStyles.empty} role="status">
          {t("empty")}
        </p>
      ) : (
        <ul className={pageStyles.list}>
          {posts.map((post) => {
            const slug = postSlug(post);

            return (
              <li key={post._id} className={pageStyles.item}>
                <article>
                  <Link
                    href={`/post/${slug}`}
                    className={pageStyles.link}
                    aria-label={`${t("readMore")}: ${post.title}`}
                  >
                    <h2 className={pageStyles.title}>{post.title}</h2>
                    <time
                      className={pageStyles.date}
                      dateTime={post.publishedAt}
                    >
                      {formatPublishedDate(post.publishedAt, locale)}
                    </time>
                    {post.excerpt ? (
                      <Paragraph color="dark" text={post.excerpt} />
                    ) : null}
                    <span className={pageStyles.readMore}>{t("readMore")} →</span>
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
