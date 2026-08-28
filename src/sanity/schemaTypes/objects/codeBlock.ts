import {defineField, defineType} from 'sanity'

/**
 * Fenced code example embedded in Portable Text.
 * Stored as a custom block (not inline HTML).
 */
export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'TypeScript', value: 'ts'},
          {title: 'TSX', value: 'tsx'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'JSON', value: 'json'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'Bash', value: 'bash'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 12,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'code', subtitle: 'language'},
    prepare({title, subtitle}) {
      const firstLine = typeof title === 'string' ? title.split('\n')[0] : ''
      return {
        title: firstLine || 'Code block',
        subtitle: subtitle ? String(subtitle) : 'code',
      }
    },
  },
})
