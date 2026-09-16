import data from '../content/projects.json'

export interface ProjectLink {
  label: string
  href: string
}

export interface BuildSection {
  heading: string
  items: string[]
}

export interface Project {
  title: string
  org?: string
  blurb: string
  date: string
  image: string
  /** Intrinsic image size — reserves the card's layout before the (lazy) image loads. */
  w?: number
  h?: number
  /** Paragraphs; minimal inline HTML allowed (em, u, b). */
  body: string[]
  links: ProjectLink[]
  buildList?: BuildSection[]
}

export const projects = data as Record<string, Project[]>
