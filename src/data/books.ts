import data from '../content/books.json'

export interface Book {
  title: string
  author: string
  cover: string
  rating?: number
  pages?: number
  w?: number // natural cover width — reserves the grid box before the image loads
  h?: number
}

export interface BookGroup {
  era: string
  subtitle?: string
  books: Book[]
}

export const bookshelf = data as BookGroup[]

/**
 * The grid-sized cover. Slots top out around 170px, so the full-size cover the
 * lightbox opens is ~50x more pixels than the grid ever paints.
 * See optimize_books.py, which writes these.
 */
export const thumbnail = (cover: string) => cover.replace('/books/', '/books/thumbs/')
