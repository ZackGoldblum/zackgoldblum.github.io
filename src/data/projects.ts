import data from '../content/projects.json'

export interface ProjectLink {
  label: string
  href: string
}

export interface BuildSection {
  heading: string
  items: string[]
}

export interface ProjectImage {
  src: string
  /** Intrinsic size — reserves the card's layout before the (lazy) image loads. */
  w?: number
  h?: number
}

export interface Project {
  title: string
  org?: string
  blurb: string
  date: string
  /** Card images; more than one adds arrows to cycle through them. */
  images: ProjectImage[]
  /** Paragraphs; minimal inline HTML allowed (em, u, b). */
  body: string[]
  /** Optional expandable technical write-up; same inline HTML rules as body. */
  details?: string[]
  links: ProjectLink[]
  buildList?: BuildSection[]
}

export const projects = data as Record<string, Project[]>
