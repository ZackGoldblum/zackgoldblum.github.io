import data from '../content/books.json'

export interface Book {
  title: string
  author: string
  cover: string
  rating?: number
  pages?: number
}

export interface BookGroup {
  era: string
  subtitle?: string
  books: Book[]
}

export const bookshelf = data as BookGroup[]
