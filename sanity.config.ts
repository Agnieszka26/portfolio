'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {
  DeleteTranslationAction,
  documentInternationalization,
  DuplicateWithTranslationsAction,
} from '@sanity/document-internationalization'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {markdownSchema} from 'sanity-plugin-markdown'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  TRANSLATABLE_SCHEMA_TYPES,
} from './src/sanity/languages'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

const translatableSchemaTypeSet = new Set<string>(TRANSLATABLE_SCHEMA_TYPES)

/** Per-language templates registered by @sanity/document-internationalization (`post-en`, `post-pl`, …). */
const languageTemplateIds = new Set<string>(
  TRANSLATABLE_SCHEMA_TYPES.flatMap((schemaType) =>
    SUPPORTED_LANGUAGES.map((language) => `${schemaType}-${language.id}`),
  ),
)

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    markdownSchema(),
    documentInternationalization({
      supportedLanguages: [...SUPPORTED_LANGUAGES],
      schemaTypes: [...TRANSLATABLE_SCHEMA_TYPES],
      languageField: 'language',
      apiVersion,
      weakReferences: true,
      allowCreateMetaDoc: true,
    }),
  ],
  document: {
    // Translatable documents must never be created without a language: the
    // plain `post`/`project` templates (and `*-parameterized` with no argument)
    // save documents that no language list or site query can see.
    newDocumentOptions: (prev, {creationContext}) =>
      prev.filter((option) => {
        const schemaType = option.templateId.split('-')[0]

        if (!translatableSchemaTypeSet.has(schemaType)) {
          return true
        }

        if (creationContext.type === 'global') {
          return option.templateId === `${schemaType}-${DEFAULT_LANGUAGE.id}`
        }

        return languageTemplateIds.has(option.templateId)
      }),
    actions: (prev, {schemaType}) => {
      if (!translatableSchemaTypeSet.has(schemaType)) {
        return prev
      }

      return [...prev, DeleteTranslationAction, DuplicateWithTranslationsAction]
    },
  },
})
