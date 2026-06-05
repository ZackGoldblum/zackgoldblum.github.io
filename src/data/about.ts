import coursesData from '../content/courses.json'
import fieldRecordsData from '../content/field-records.json'
import teachingData from '../content/teaching.json'
import timelineData from '../content/timeline.json'
import volunteeringData from '../content/volunteering.json'

export interface TimelinePosition {
  title: string
  span?: string
  bullets: string[]
}

export interface TimelineEntry {
  date: string
  logo: string
  url: string
  alt: string
  org: string
  orgDetail?: string
  positions: TimelinePosition[]
}

export interface SimpleEntry {
  title: string
  org: string
  date: string
}

export interface FieldRecord {
  src: string
  caption: string
}

export const timeline = timelineData as TimelineEntry[]
export const teaching = teachingData as SimpleEntry[]
export const volunteering = volunteeringData as SimpleEntry[]
export const courses = coursesData as SimpleEntry[]
export const fieldRecords = fieldRecordsData as FieldRecord[]
