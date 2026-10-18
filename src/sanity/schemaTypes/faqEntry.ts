import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqEntry',
  title: 'FAQ Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Used to group questions on the FAQ page (e.g., "Token Basics", "General")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order (Optional)',
      type: 'number',
      description: 'Optional number to control sorting within the category (lower numbers appear first).',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})
