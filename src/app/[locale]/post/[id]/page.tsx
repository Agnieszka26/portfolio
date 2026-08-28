import styles from "@/assets/styles/index.module.scss";
import bodyStyles from "@/components/PostBody/PostBody.module.scss";
import PostBody from "@/components/PostBody/PostBody";
import {
  createPageMetadata,
  truncateDescription,
} from "@/lib/metadata";
import { getPostDetails } from "@/lib/sanity/posts";
import { toRemoteCoverImage } from "@/types";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import cn from "classnames";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type PageParams = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const post = await getPostDetails(id, locale);

  if (!post) {
    notFound();
  }

  const title =
    post.seo?.metaTitle?.trim() || t("postTitle", { name: post.title });
  const description = truncateDescription(
    post.seo?.metaDescription?.trim() ||
      post.excerpt?.trim() ||
      t("postFallbackDescription", { name: post.title }),
  );
  const ogSource = post.seo?.ogImage ?? post.coverImage;
  const coverUrl = ogSource?.asset?.url
    ? toRemoteCoverImage(ogSource).url
    : undefined;

  return createPageMetadata({
    title,
    description,
    path: `/${locale}/post/${id}`,
    image: coverUrl,
    twitterImage: coverUrl,
  });
}

const BlogPostPage = async ({ params }: PageParams) => {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const post = await getPostDetails(id, locale);
  if (!post) {
    notFound();
  }

  return (
    <div className={cn(styles.page, styles.container)}>
      <article className={bodyStyles.article}>
        <header className={bodyStyles.header}>
          <Header text={post.title} color="dark" as="h1" />
          {post.excerpt ? (
            <Paragraph color="dark" text={post.excerpt} />
          ) : null}
          {post.tags && post.tags.length > 0 ? (
            <div className={cn(styles.tagContainer, bodyStyles.tags)}>
              {post.tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          ) : null}
        </header>
        <PostBody value={post.body} />
      </article>
    </div>
  );
};

export default BlogPostPage;
