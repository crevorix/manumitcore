import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'roadmapPhase',
  title: 'Roadmap Phase',
  type: 'document',
  fields: [
    defineField({
      name: 'phase',
      title: 'Phase Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quarter',
      title: 'Quarter / Date Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'active' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'TBD', value: 'tbd' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight (Optional Callout)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      phase: 'phase',
      subtitle: 'quarter',
    },
    prepare({ title, phase, subtitle }) {
      return {
        title: `Phase ${phase}: ${title}`,
        subtitle: subtitle as string,
      }
    },
  },
})
