import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType, type SlugValidationContext} from 'sanity'

import {getLanguageTitle} from '../languages'
import {languageField} from './fields/languageField'

/** Slug must be unique per language so EN/PL translations can share the same path segment. */
async function isUniquePerLanguage(
  slug: string | undefined,
  context: SlugValidationContext,
): Promise<boolean> {
  const {document, getClient} = context
  if (!slug || !document) {
    return true
  }

  const client = getClient({apiVersion: '2024-01-01'})
  const id = document._id.replace(/^drafts\./, '')
  const language = typeof document.language === 'string' ? document.language : undefined

  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    _type == "post" &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`

  return client.fetch<boolean>(query, {
    draft: `drafts.${id}`,
    published: id,
    language: language ?? null,
    slug,
  })
}
function formatPublishedSubtitle(publishedAt: string | undefined, language: string | undefined) {
  const languageLabel = language ? getLanguageTitle(language) : undefined
  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Draft'

  return [languageLabel, dateLabel].filter(Boolean).join(' · ')
}

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'content',
      title: 'Content',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'metadata',
      title: 'Metadata',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'organization',
      title: 'Organization',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'seo',
      title: 'SEO',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      description: 'Article headline shown on the blog index and post page.',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'content',
      description: 'URL segment for this post. Unique within each language.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniquePerLanguage,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      fieldset: 'content',
      description: 'Short summary for cards, SEO fallbacks, and social previews.',
      validation: (rule) => rule.max(250),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      fieldset: 'content',
      description: 'Hero and card image for the post.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description:
            'Describe the image for screen readers and SEO. Localized with the post document.',
          validation: (rule) => rule.required().max(200),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
      fieldset: 'content',
      description: 'Main article content (Portable Text).',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'metadata',
      description: 'Public publish date. Leave empty while drafting.',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      fieldset: 'metadata',
      description: 'Optional last-updated timestamp shown when content changes after publish.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      fieldset: 'metadata',
      description: 'Highlight this post on the blog index.',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'organization',
      description: 'Keywords for filtering and related posts (string tags, matching project style).',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'seo',
      description: 'Optional overrides for search and social sharing.',
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'coverImage',
      language: 'language',
    },
    prepare({title, publishedAt, media, language}) {
      return {
        title: title ?? 'Untitled post',
        subtitle: formatPublishedSubtitle(publishedAt, language),
        media,
      }
    },
  },
})
