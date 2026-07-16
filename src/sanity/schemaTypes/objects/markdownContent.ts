import {defineType} from 'sanity'

/**
 * Reusable Markdown content type for long-form Studio fields.
 * Backed by `sanity-plugin-markdown` (`type: 'markdown'`).
 * Values are stored as plain strings — compatible with former `text` fields.
 */
export const markdownContent = defineType({
  name: 'markdownContent',
  title: 'Markdown',
  type: 'markdown',
})
