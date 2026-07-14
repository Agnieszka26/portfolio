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
import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  TRANSLATABLE_SCHEMA_TYPES,
} from './src/sanity/languages'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

const translatableSchemaTypeSet = new Set<string>(TRANSLATABLE_SCHEMA_TYPES)

function createLocaleTemplates(): Template[] {
  return TRANSLATABLE_SCHEMA_TYPES.flatMap((schemaType) =>
    SUPPORTED_LANGUAGES.map((language) => ({
      id: `${schemaType}-${language.id}`,
      title: `${schemaType.charAt(0).toUpperCase()}${schemaType.slice(1)} (${language.title})`,
      schemaType,
      parameters: [{name: 'language', type: 'string'}],
      value: {language: language.id},
    })),
  )
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    documentInternationalization({
      supportedLanguages: [...SUPPORTED_LANGUAGES],
      schemaTypes: [...TRANSLATABLE_SCHEMA_TYPES],
      languageField: 'language',
      apiVersion,
      weakReferences: true,
      allowCreateMetaDoc: true,
    }),
  ],
  templates: (prev: Template[]) => [...prev, ...createLocaleTemplates()],
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') {
        return prev
      }

      return prev.filter((option) => {
        const schemaType = option.templateId.split('-')[0]

        if (!translatableSchemaTypeSet.has(schemaType)) {
          return true
        }

        return option.templateId.endsWith(`-${DEFAULT_LANGUAGE.id}`)
      })
    },
    actions: (prev, {schemaType}) => {
      if (!translatableSchemaTypeSet.has(schemaType)) {
        return prev
      }

      return [...prev, DeleteTranslationAction, DuplicateWithTranslationsAction]
    },
  },
})
