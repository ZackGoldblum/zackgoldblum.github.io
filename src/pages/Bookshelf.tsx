import PageIntro from '../components/PageIntro'
import Stars from '../components/Stars'
import { bookshelf } from '../data/books'

export default function Bookshelf() {
  return (
    <div>
      <PageIntro
        index="03"
        title="Bookshelf"
        lede="What I've been reading — mostly science fiction, space, and minds (artificial and otherwise)."
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
                <div className="book__cover card card--hover">
                  <img src={book.cover} alt={`${book.title} cover`} loading="lazy" />
                </div>
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
    </div>
  )
}
