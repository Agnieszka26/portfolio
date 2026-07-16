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