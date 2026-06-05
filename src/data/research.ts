import type { ChipTone } from '../components/Chip'
import data from '../content/research.json'

export type ResearchType = 'Publication' | 'Pre-print' | 'Poster' | 'Talk' | 'Live Demo' | 'Thesis'

export interface ResearchItem {
  type: ResearchType
  title: string
  /** Citation; minimal inline HTML allowed (<b> for self-author incl. any
   *  equal-contribution asterisk, <em> for venue). */
  citation: string
  awards?: string[]
  links?: { label: string; href: string }[]
}

/* One hue per type: green = published, teal = almost-published,
   then violet / blue / amber / pink for the rest. */
export const researchTypeTone: Record<ResearchType, ChipTone> = {
  Publication: 'aurora',
  'Pre-print': 'comet',
  Poster: 'nebula',
  Talk: 'ion',
  'Live Demo': 'flare',
  Thesis: 'pulsar',
}

/** Plural labels for the filter buttons. */
export const researchTypePlural: Record<ResearchType, string> = {
  Publication: 'Publications',
  'Pre-print': 'Pre-prints',
  Poster: 'Posters',
  Talk: 'Talks',
  'Live Demo': 'Live Demos',
  Thesis: 'Theses',
}

export const research = data as Record<string, ResearchItem[]>
