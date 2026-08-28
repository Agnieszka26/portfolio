import type { Post } from "@/types/post";
import { postSlug } from "@/types/post";
import { buildPersonEntity } from "./personSchema";
import {
  localizedBlogUrl,
  type SchemaLocale,
} from "./siteIdentity";
import { absoluteUrl, compactJsonLd } from "./utils";

export type BlogPostingListItem = {
  "@type": "BlogPosting";
  headline: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: ReturnType<typeof buildPersonEntity>;
};

export type BlogCollectionPageSchema = {
  "@context": "https://schema.org";
  "@type": ["CollectionPage", "Blog"];
  name: string;
  description?: string;
  url: string;
  inLanguage?: string;
  blogPost?: BlogPostingListItem[];
};

type BuildBlogCollectionSchemaOptions = {
  locale: SchemaLocale;
  name: string;
  description: string;
  posts: Post[];
};

export function buildBlogCollectionSchema({
  locale,
  name,
  description,
  posts,
}: BuildBlogCollectionSchemaOptions): BlogCollectionPageSchema {
  const pageUrl = localizedBlogUrl(locale);
  const author = buildPersonEntity(locale);

  const blogPost = posts.map((post) => {
    const slug = postSlug(post);
    return {
      "@type": "BlogPosting" as const,
      headline: post.title,
      url: absoluteUrl(`/${locale}/post/${slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? undefined,
      author,
    };
  });

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "Blog"],
    name,
    description,
    url: pageUrl,
    inLanguage: locale.startsWith("pl") ? "pl-PL" : "en-US",
    blogPost: blogPost.length ? blogPost : undefined,
  }) as BlogCollectionPageSchema;
}
