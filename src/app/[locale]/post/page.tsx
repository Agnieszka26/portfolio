import HomePage from "@/components/Homepage";
import JsonLd from "@/components/JsonLd";
import getProjects from "@/lib/getProjects";
import { createPageMetadata } from "@/lib/metadata";
import {
    buildCreativeWorkSchema,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebsiteSchema,
} from "@/lib/seo/schema";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const revalidate = 3600;

const PostsPage = async ({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) => {
    const { locale } = await params;
    setRequestLocale(locale);    

    const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <div>BlogPage</div>
  )
}


export default PostsPage