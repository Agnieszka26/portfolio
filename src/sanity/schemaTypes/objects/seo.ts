import {SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Reusable SEO overrides. Leave empty to fall back to document title / excerpt / cover.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Overrides the document title in search results and browser tabs.',
      validation: (rule) => rule.max(70).warning('Keep meta titles under 70 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Overrides the excerpt for search engine snippets.',
      validation: (rule) =>
        rule.max(160).warning('Keep meta descriptions under 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      description: 'Social sharing image (1200×630 recommended). Falls back to the cover image.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'When enabled, search engines should not index this page.',
      initialValue: false,
    }),
  ],
})
