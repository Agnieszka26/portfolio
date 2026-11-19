import styles from "@/assets/styles/index.module.scss";
import bodyStyles from "@/components/PostBody/PostBody.module.scss";
import PostBody from "@/components/PostBody/PostBody";
import {
  createPageMetadata,
  truncateDescription,
} from "@/lib/metadata";
import { SetPostAlternatePaths } from "@/atoms/LanguageSwitch/postAlternatePaths";
import { permanentRedirect, redirect } from "@/i18n/navigation";
import {
  resolvePublishedPost,
  type PostLocaleAlternate,
  type ResolvedPost,
} from "@/lib/sanity/posts";
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

function alternatePaths(
  alternates: PostLocaleAlternate[],
): Record<string, string> {
  return Object.fromEntries(
    alternates.map((alternate) => [
      alternate.locale,
      `/post/${alternate.slug}`,
    ]),
  );
}

function languagePaths(
  alternates: PostLocaleAlternate[],
): Record<string, string> {
  return Object.fromEntries(
    alternates.map((alternate) => [
      alternate.locale,
      `/${alternate.locale}/post/${alternate.slug}`,
    ]),
  );
}

async function loadPost(
  locale: string,
  slug: string,
): Promise<Extract<ResolvedPost, { kind: "found" }>> {
  const resolved = await resolvePublishedPost(slug, locale);

  if (resolved.kind === "redirect") {
    permanentRedirect({ href: resolved.href, locale: resolved.locale });
  }

  if (resolved.kind === "listing") {
    redirect({ href: resolved.href, locale: resolved.locale });
  }

  if (resolved.kind === "found") {
    return resolved;
  }

  notFound();
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const { post, alternates } = await loadPost(locale, id);

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
    path: `/${locale}/post/${post.slug}`,
    languagePaths: languagePaths(alternates),
    image: coverUrl,
    twitterImage: coverUrl,
  });
}

const BlogPostPage = async ({ params }: PageParams) => {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const { post, alternates } = await loadPost(locale, id);

  return (
    <div className={bodyStyles.shell}>
      <SetPostAlternatePaths paths={alternatePaths(alternates)} />
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
