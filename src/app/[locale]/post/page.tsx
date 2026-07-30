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
import { getPosts } from "@/lib/sanity/posts";
import notFound from "../not-found";
import Link from "next/link";

export const revalidate = 3600;

const PostsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getPosts(locale);
  if (!posts) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <div key={post._id}>
            <li key={post._id}>{post.title}</li>
            <Link href={`/post/${post._id}`}>{post.title}</Link>
          </div>
        ))}
      </ul>
    </div>
  )
}


export default PostsPage