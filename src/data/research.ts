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

/** Filter buttons — long-tail types are bucketed into a gray "Other". */
export interface ResearchFilter {
  label: string
  tone: ChipTone
  types: ResearchType[]
}

export const researchFilters: ResearchFilter[] = [
  { label: 'Publications', tone: 'aurora', types: ['Publication'] },
  { label: 'Pre-prints', tone: 'comet', types: ['Pre-print'] },
  { label: 'Posters', tone: 'nebula', types: ['Poster'] },
  { label: 'Talks', tone: 'ion', types: ['Talk'] },
  { label: 'Other', tone: 'dim', types: ['Live Demo', 'Thesis'] },
]

export const research = data as Record<string, ResearchItem[]>
