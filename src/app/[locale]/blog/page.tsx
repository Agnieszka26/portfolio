import BlogPage from "@/components/BlogPage/BlogPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { getPosts } from "@/lib/sanity/posts";
import { buildBlogCollectionSchema } from "@/lib/seo/schema";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const revalidate = 3600;

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata({
    title: t("blogTitle"),
    description: t("blogDescription"),
    path: `/${locale}/blog`,
  });
}

export default async function Page({ params }: PageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [posts, tMeta, tPage] = await Promise.all([
    getPosts(locale),
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "BlogPage" }),
  ]);

  const blogSchema = buildBlogCollectionSchema({
    locale,
    name: tPage("title"),
    description: tMeta("blogDescription"),
    posts,
  });

  return (
    <>
      <JsonLd data={blogSchema} />
      <BlogPage posts={posts} locale={locale} />
    </>
  );
}
