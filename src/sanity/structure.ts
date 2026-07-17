import type {StructureResolver} from 'sanity/structure'

import {SUPPORTED_LANGUAGES, TRANSLATABLE_SCHEMA_TYPES} from './languages'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects by language')
            .items(
              SUPPORTED_LANGUAGES.map((language) =>
                S.listItem()
                  .title(language.title)
                  .child(
                    S.documentList()
                      .title(`Projects (${language.title})`)
                      .filter(`_type == "project" && language == "${language.id}"`)
                      .defaultOrdering([{field: 'header', direction: 'asc'}]),
                  ),
              ),
            ),
        ),
      ...S.documentTypeListItems().filter(
        (item) =>
          !TRANSLATABLE_SCHEMA_TYPES.includes(
            item.getId() as (typeof TRANSLATABLE_SCHEMA_TYPES)[number],
          ) && item.getId() !== 'translation.metadata',
      ),
    ])
