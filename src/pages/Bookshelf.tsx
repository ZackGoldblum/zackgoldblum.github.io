import { useState } from 'react'
import BookLightbox from '../components/BookLightbox'
import PageIntro from '../components/PageIntro'
import Stars from '../components/Stars'
import { bookshelf, type Book } from '../data/books'

interface Lightbox {
  book: Book
  el: HTMLElement // the cover button — BookLightbox re-measures it as needed
  aspect: number // natural width / height of the cover
  color: [number, number, number] // dominant cover color for the 3D book's generated faces
}

/**
 * Dominant color of a loaded cover image. Downsamples to a small canvas,
 * buckets pixels at 4 bits/channel, and votes weighted toward saturated
 * mid-tones so white pages and black borders don't win.
 */
function coverColor(img: HTMLImageElement): [number, number, number] {
  const FALLBACK: [number, number, number] = [74, 76, 86]
  if (!img.complete || !img.naturalWidth) return FALLBACK
  try {
    const w = 40
    const h = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return FALLBACK
    ctx.drawImage(img, 0, 0, w, h)
    const { data } = ctx.getImageData(0, 0, w, h)
    const score = new Map<number, number>()
    const sum = new Map<number, [number, number, number, number]>()
    let best = -1
    let bestKey = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const max = Math.max(r, g, b)
      const sat = max === 0 ? 0 : (max - Math.min(r, g, b)) / max
      const lum = max / 255
      const weight = (0.06 + sat) * (lum < 0.09 || lum > 0.94 ? 0.12 : 1)
      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
      const s = (score.get(key) ?? 0) + weight
      score.set(key, s)
      const acc = sum.get(key) ?? [0, 0, 0, 0]
      acc[0] += r
      acc[1] += g
      acc[2] += b
      acc[3]++
      sum.set(key, acc)
      if (s > best) {
        best = s
        bestKey = key
      }
    }
    const [r, g, b, n] = sum.get(bestKey)!
    return [Math.round(r / n), Math.round(g / n), Math.round(b / n)]
  } catch {
    return FALLBACK
  }
}

export default function Bookshelf() {
  const [lightbox, setLightbox] = useState<Lightbox | null>(null)

  return (
    <div>
      <PageIntro
        index="04"
        title="Bookshelf"
        lede="What I've been reading. Mostly sci-fi, some classics and non-fiction mixed in. Ratings are my completely subjective enjoyment of the book."
      />
      {bookshelf.map((group) => (
        <section key={group.era}>
          <div className="era">
            <span className="era__year">{group.era.toUpperCase()}</span>
            <span className="era__line" />
          </div>
          {group.subtitle && <p className="bookshelf__subtitle">{group.subtitle}</p>}
          <div className={`book-grid${group.era === 'Earlier Reading' ? ' book-grid--dense' : ''}`}>
            {group.books.map((book) => (
              <figure key={book.title} className="book">
                <button
                  className="book__cover card"
                  aria-label={`View ${book.title} cover`}
                  onClick={(e) => {
                    const el = e.currentTarget
                    const img = el.querySelector('img')!
                    setLightbox({
                      book,
                      el,
                      aspect: img.naturalWidth / img.naturalHeight || 2 / 3,
                      color: coverColor(img),
                    })
                  }}
                >
                  <img src={book.cover} alt={`${book.title} cover`} loading="lazy" />
                </button>
                <figcaption>
                  <p className="book__title">{book.title}</p>
                  <p className="book__author">{book.author}</p>
                  {book.rating !== undefined && <Stars rating={book.rating} />}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      {lightbox && (
        <BookLightbox
          book={lightbox.book}
          fromEl={lightbox.el}
          aspect={lightbox.aspect}
          color={lightbox.color}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
