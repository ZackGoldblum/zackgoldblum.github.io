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

export const researchTypeTone: Record<ResearchType, ChipTone> = {
  Publication: 'aurora',
  'Pre-print': 'nebula',
  Poster: 'flare',
  Talk: 'ion',
  'Live Demo': 'ion',
  Thesis: 'pulsar',
}

export const research = data as Record<string, ResearchItem[]>
