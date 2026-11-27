import {defineField} from 'sanity'

import {SUPPORTED_LANGUAGES} from '../../languages'

/**
 * Managed by @sanity/document-internationalization — do not edit manually.
 * Shown and editable only while empty, so a document saved without a
 * language can be assigned one instead of staying invisible.
 */
export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  description: 'This document has no language, so it is hidden from the site and the language lists.',
  options: {
    list: SUPPORTED_LANGUAGES.map(({id, title}) => ({title, value: id})),
    layout: 'radio',
  },
  readOnly: ({value}) => Boolean(value),
  hidden: ({value}) => Boolean(value),
  validation: (rule) => rule.required(),
})
