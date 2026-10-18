import { defineField, defineType } from 'sanity'

/**
 * A GoFundMe campaign shown on /donate.
 *
 * Managed from the Studio (/studio) so campaigns can be added, edited and
 * retired without a code change or a redeploy — the page revalidates every
 * 5 minutes. Mirrors how roadmapPhase and faqEntry work.
 */
export default defineType({
  name: 'fundraiser',
  title: 'Fundraiser',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences explaining who or what the fundraiser helps.',
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'image',
      title: 'Campaign Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Landscape image works best. If left empty the card shows a branded placeholder.',
    }),
    defineField({
      name: 'gofundmeUrl',
      title: 'GoFundMe Link',
      type: 'url',
      description: 'Opens in a new tab from the Donate button.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'order',
      title: 'Order (Optional)',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'active',
      title: 'Show on the site',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to retire a finished campaign without deleting it.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'gofundmeUrl',
      media: 'image',
    },
  },
})
