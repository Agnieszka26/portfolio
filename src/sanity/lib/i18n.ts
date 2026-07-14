import {client} from './client'
import {DEFAULT_LANGUAGE, type Locale} from '../languages'

const DEFAULT_LOCALE = DEFAULT_LANGUAGE.id

const projectFields = `{
  _id,
  id,
  header,
  paragraph,
  tags,
  type,
  language,
  image {
    asset-> {
      _id,
      url
    },
    hotspot,
    crop
  },
  linkToGithub,
  linkToLive,
  overview,
  technologies,
  backend,
  keyFeatures,
  challenges,
  slides[] {
    _key,
    asset-> {
      _id,
      url
    },
    hotspot,
    crop
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    _id,
    language,
    header,
    id
  }
}`

export const projectListQuery = `
  *[_type == "project" && language == $locale] | order(header asc) {
    _id,
    id,
    header,
    paragraph,
    type,
    language,
    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    }
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && language == $locale && (id == $slug || header == $slug)][0]
  ${projectFields}
`

export const projectBySlugWithFallbackQuery = `
  *[
    _type == "project" &&
    (id == $slug || header == $slug) &&
    language in [$locale, $defaultLocale]
  ] | order(language == $locale desc)[0]
  ${projectFields}
`

type FetchParams = Record<string, string | undefined>

export async function fetchByLocale<T>(
  query: string,
  locale: Locale | string,
  params: FetchParams = {},
): Promise<T[]> {
  return client.fetch<T[]>(query, {locale, ...params})
}

export async function fetchDocumentByLocale<T>(
  query: string,
  locale: Locale | string,
  params: FetchParams = {},
  defaultLocale: Locale | string = DEFAULT_LOCALE,
): Promise<T | null> {
  return client.fetch<T | null>(query, {
    locale,
    defaultLocale,
    ...params,
  })
}

export async function getProjectBySlug<T>(
  slug: string,
  locale: Locale | string,
  options: {fallback?: boolean} = {fallback: true},
): Promise<T | null> {
  const query = options.fallback ? projectBySlugWithFallbackQuery : projectBySlugQuery

  return fetchDocumentByLocale<T>(query, locale, {slug})
}

export async function getProjects<T>(locale: Locale | string): Promise<T[]> {
  return fetchByLocale<T>(projectListQuery, locale)
}
