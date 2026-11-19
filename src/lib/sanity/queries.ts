import { defineQuery } from "next-sanity";

/** Shared image projection — matches `image` fields on the project schema. */
const imageProjection = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  hotspot,
  crop
`;

/** Card / list fields from the project document. */
const projectCardProjection = /* groq */ `
  _id,
  id,
  header,
  paragraph,
  tags,
  type,
  language,
  image {
    ${imageProjection}
  },
  linkToGithub,
  linkToLive
`;

/** Full case-study document (card fields + case study + gallery). */
const projectDetailsProjection = /* groq */ `
  ${projectCardProjection},
  overview,
  technologies,
  backend,
  keyFeatures,
  challenges,
  slides[] {
    _key,
    ${imageProjection}
  }
`;

export const projectsQuery = defineQuery(/* groq */ `
  *[_type == "project" && language == $locale] | order(header asc) {
    ${projectCardProjection}
  }
`);

/** All locales — used for sitemaps / static params when listing every document. */
export const allProjectsQuery = defineQuery(/* groq */ `
  *[_type == "project"] | order(header asc) {
    ${projectCardProjection}
  }
`);

export const projectDetailsQuery = defineQuery(/* groq */ `
  *[
    _type == "project" &&
    language == $locale &&
    (id == $slug || header == $slug)
  ] | order(select(id == $slug => 0, 1))[0] {
    ${projectDetailsProjection}
  }
`);

/**
 * Prefer the requested locale; fall back to the default locale document
 * with the same id/header (document internationalization).
 */
export const projectDetailsWithFallbackQuery = defineQuery(/* groq */ `
  *[
    _type == "project" &&
    (id == $slug || header == $slug) &&
    language in [$locale, $defaultLocale]
  ] | order(
    select(id == $slug => 0, 1),
    select(language == $locale => 0, 1)
  )[0] {
    ${projectDetailsProjection}
  }
`);

/** Cover image — same asset projection as projects, plus `alt` from post schema. */
const postCoverImageProjection = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  hotspot,
  crop,
  alt
`;

const postSeoProjection = /* groq */ `
  metaTitle,
  metaDescription,
  noIndex,
  ogImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    },
    hotspot,
    crop
  }
`;

/** List / card fields for published posts (`slug` flattened for routing). */
const postCardProjection = /* groq */ `
  _id,
  language,
  title,
  "slug": slug.current,
  excerpt,
  coverImage {
    ${postCoverImageProjection}
  },
  tags,
  featured,
  publishedAt,
  updatedAt,
  seo {
    ${postSeoProjection}
  }
`;

const postDetailsProjection = /* groq */ `
  ${postCardProjection},
  body
`;

/** Published = has `publishedAt` and that datetime is not in the future. */
const postPublishedFilter = /* groq */ `
  defined(publishedAt) &&
  publishedAt <= now()
`;

/**
 * Published posts for one locale only (no fallback).
 */
export const postsQuery = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    language == $locale &&
    ${postPublishedFilter}
  ] | order(publishedAt desc) {
    ${postCardProjection}
  }
`);

/** All published posts across locales — sitemaps / static params. */
export const allPostsQuery = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    ${postPublishedFilter}
  ] | order(publishedAt desc) {
    ${postCardProjection}
  }
`);

/**
 * Published siblings from the document-internationalization metadata document.
 * Plugin v4 stores the locale on `translations[]._key`; `language` on the
 * referenced post wins when it is set.
 */
const postTranslationProjection = /* groq */ `
  *[_type == "translation.metadata" && references(^._id)][0].translations[
    defined(value->slug.current) &&
    defined(value->publishedAt) &&
    value->publishedAt <= now()
  ]{
    "locale": coalesce(value->language, _key),
    "slug": value->slug.current
  }
`;

/**
 * Resolve one public post URL.
 * `current` is the published document for the requested locale and slug.
 * `source` is a published document in another locale that uses this slug,
 * used to find the requested locale's sibling when the slugs differ.
 */
export const postRouteQuery = defineQuery(/* groq */ `
  {
    "current": *[
      _type == "post" &&
      language == $locale &&
      slug.current == $slug &&
      ${postPublishedFilter}
    ][0]{
      ${postDetailsProjection},
      "translations": ${postTranslationProjection}
    },
    "source": *[
      _type == "post" &&
      language != $locale &&
      slug.current == $slug &&
      ${postPublishedFilter}
    ][0]{
      "translations": ${postTranslationProjection}
    }
  }
`);

/** Every slug in the translation group of a published post with this slug. */
export const postGroupSlugsQuery = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    slug.current == $slug &&
    ${postPublishedFilter}
  ]{
    "slugs": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->slug.current
  }
`);

/** Published posts plus the metadata document that joins their translations. */
export const postSitemapQuery = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    ${postPublishedFilter}
  ] | order(publishedAt desc) {
    language,
    "slug": slug.current,
    "translationId": *[_type == "translation.metadata" && references(^._id)][0]._id
  }
`);
