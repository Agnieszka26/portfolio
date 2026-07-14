export type SupportedLanguage = {
  id: string
  title: string
}

export const SUPPORTED_LANGUAGES = [
  {id: 'en', title: 'English'},
  {id: 'pl', title: 'Polski'},
] as const satisfies SupportedLanguage[]

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]

export type Locale = (typeof SUPPORTED_LANGUAGES)[number]['id']

/** Document types that use @sanity/document-internationalization. */
export const TRANSLATABLE_SCHEMA_TYPES = ['project'] as const

export type TranslatableSchemaType = (typeof TRANSLATABLE_SCHEMA_TYPES)[number]

export function getLanguageTitle(locale: string): string {
  return SUPPORTED_LANGUAGES.find((language) => language.id === locale)?.title ?? locale
}

export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LANGUAGES.some((language) => language.id === locale)
}
