import type {ListItemBuilder, StructureBuilder, StructureResolver} from 'sanity/structure'

import {
  SUPPORTED_LANGUAGES,
  TRANSLATABLE_SCHEMA_TYPES,
  type TranslatableSchemaType,
} from './languages'

const SUPPORTED_LANGUAGE_IDS = SUPPORTED_LANGUAGES.map((language) => language.id)

/**
 * One list per language. Each list only offers its own `{type}-{language}`
 * template, so new documents always get the language of the list they were
 * created from.
 */
function translatableTypeListItem(
  S: StructureBuilder,
  {
    schemaType,
    title,
    ordering,
  }: {
    schemaType: TranslatableSchemaType
    title: string
    ordering: {field: string; direction: 'asc' | 'desc'}
  },
): ListItemBuilder {
  return S.listItem()
    .title(title)
    .child(
      S.list()
        .title(`${title} by language`)
        .items(
          SUPPORTED_LANGUAGES.map((language) =>
            S.listItem()
              .title(language.title)
              .child(
                S.documentList()
                  .title(`${title} (${language.title})`)
                  .schemaType(schemaType)
                  .filter('_type == $type && language == $language')
                  .params({type: schemaType, language: language.id})
                  .initialValueTemplates([
                    S.initialValueTemplateItem(`${schemaType}-${language.id}`),
                  ])
                  .defaultOrdering([ordering]),
              ),
          ),
        ),
    )
}

/** Documents no language list or site query can see; set their language here. */
function missingLanguageListItem(S: StructureBuilder): ListItemBuilder {
  return S.listItem()
    .title('Missing language')
    .child(
      S.documentList()
        .title('Missing language')
        .filter('_type in $types && !(language in $languages)')
        .params({types: [...TRANSLATABLE_SCHEMA_TYPES], languages: SUPPORTED_LANGUAGE_IDS})
        .initialValueTemplates([]),
    )
}

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      translatableTypeListItem(S, {
        schemaType: 'project',
        title: 'Projects',
        ordering: {field: 'header', direction: 'asc'},
      }),
      translatableTypeListItem(S, {
        schemaType: 'post',
        title: 'Blog Posts',
        ordering: {field: 'publishedAt', direction: 'desc'},
      }),
      missingLanguageListItem(S),
      ...S.documentTypeListItems().filter(
        (item) =>
          !TRANSLATABLE_SCHEMA_TYPES.includes(
            item.getId() as (typeof TRANSLATABLE_SCHEMA_TYPES)[number],
          ) && item.getId() !== 'translation.metadata',
      ),
    ])
