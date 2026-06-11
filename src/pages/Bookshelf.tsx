import { useState } from 'react'
import BookLightbox from '../components/BookLightbox'
import PageIntro from '../components/PageIntro'
import Stars from '../components/Stars'
import { bookshelf, type Book } from '../data/books'

interface Lightbox {
  book: Book
  rect: DOMRect
  aspect: number // natural width / height of the cover
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
                    // Button rect (incl. its 1px border), minus the hover
                    // lift — the zoom should land on the resting position
                    const r = el.getBoundingClientRect()
                    const tf = getComputedStyle(el).transform
                    const m = tf === 'none' ? null : new DOMMatrixReadOnly(tf)
                    const rect = new DOMRect(
                      r.x - (m?.m41 ?? 0),
                      r.y - (m?.m42 ?? 0),
                      r.width,
                      r.height,
                    )
                    setLightbox({
                      book,
                      rect,
                      aspect: img.naturalWidth / img.naturalHeight || 2 / 3,
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
          fromRect={lightbox.rect}
          aspect={lightbox.aspect}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
