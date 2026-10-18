import { type SchemaTypeDefinition } from 'sanity'

import roadmapPhase from './roadmapPhase'
import faqEntry from './faqEntry'
import fundraiser from './fundraiser'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [roadmapPhase, faqEntry, fundraiser],
}
