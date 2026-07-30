import type { SanityImage } from "./project";

/** Cover image from post schema — includes required alt subfield. */
export type PostCoverImage = SanityImage & {
  alt?: string | null;
};

/** Nested SEO object from `schemaTypes/objects/seo.ts`. */
export type PostSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: SanityImage | null;
  noIndex?: boolean | null;
};

/** Inline span inside a Portable Text block. */
export type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
};

/** Link annotation stored in `markDefs` (matches portableText schema). */
export type PortableTextLinkMark = {
  _type: "link";
  _key: string;
  href: string;
  openInNewTab?: boolean | null;
};

/**
 * Standard Portable Text block as produced by the `portableText` schema type
 * (normal / h2 / h3 / blockquote, lists, marks).
 */
export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: "normal" | "h2" | "h3" | "blockquote" | string;
  listItem?: "bullet" | "number";
  level?: number;
  children: PortableTextSpan[];
  markDefs?: PortableTextLinkMark[];
};

export type PortableTextValue = PortableTextBlock[];

/**
 * Blog post card / list fields — mirrors `sanity/schemaTypes/post.ts`
 * with `slug` projected as `slug.current` string for routing.
 *
 * Localization is document-level (`language` field via
 * `@sanity/document-internationalization`), not field-level.
 */
export type Post = {
  _id: string;
  language?: string | null;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage: PostCoverImage;
  tags?: string[] | null;
  featured?: boolean | null;
  publishedAt: string;
  updatedAt?: string | null;
  seo?: PostSeo | null;
};

/**
 * Full post document including Portable Text body.
 */
export type PostDetails = Post & {
  body: PortableTextValue;
};

/** Route key from a post (slug.current projected as string). */
export function postSlug(post: Pick<Post, "slug">): string {
  return post.slug;
}
