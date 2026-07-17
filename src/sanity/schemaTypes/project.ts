import {defineType, defineField, defineArrayMember} from 'sanity'

import {getLanguageTitle} from '../languages'
import {languageField} from './fields/languageField'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [
    {
      name: 'basic',
      title: 'Basic information',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'links',
      title: 'Links',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'caseStudy',
      title: 'Case study',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'gallery',
      title: 'Gallery',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    languageField,
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      fieldset: 'basic',
      description: 'Stable identifier for routing or migration from legacy systems.',
      validation: (rule) => rule.required(),
    }),    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      fieldset: 'basic',
      description: 'Project title shown on cards and detail pages.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      fieldset: 'basic',
      description: 'Short summary used on project cards and SEO fallbacks.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'string',
      fieldset: 'basic',
      description: 'Technologies or keywords, e.g. "React, TypeScript, Node.js".',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      fieldset: 'basic',
      description: 'Project category, e.g. "professional" or "personal".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fieldset: 'basic',
      description: 'Cover image for project cards and previews.',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkToGithub',
      title: 'GitHub Link',
      type: 'url',
      fieldset: 'links',
      description: 'Link to the project repository.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'linkToLive',
      title: 'Live Link',
      type: 'url',
      fieldset: 'links',
      description: 'Link to the deployed project.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'markdownContent',
      fieldset: 'caseStudy',
      description: 'Long-form introduction for the case study page (GitHub Flavored Markdown).',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'markdownContent',
      fieldset: 'caseStudy',
      description: 'Tech stack and tools used in the project (Markdown).',
    }),
    defineField({
      name: 'backend',
      title: 'Backend',
      type: 'markdownContent',
      fieldset: 'caseStudy',
      description: 'Backend architecture, APIs, and data layer details (Markdown).',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'markdownContent',
      fieldset: 'caseStudy',
      description: 'Notable features and implementation highlights (Markdown).',
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'markdownContent',
      fieldset: 'caseStudy',
      description: 'Optional section describing problems solved during development (Markdown).',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      fieldset: 'gallery',
      description: 'Screenshots or gallery images for the case study carousel.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header',
      type: 'type',
      media: 'image',
      language: 'language',
    },
    prepare({title, type, media, language}) {
      const languageLabel = language ? getLanguageTitle(language) : 'No language'

      return {
        title: title ?? 'Untitled project',
        subtitle: [languageLabel, type].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
