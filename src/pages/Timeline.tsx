import PageIntro from '../components/PageIntro'
import { affiliations, courses, teaching, timeline, volunteering, type SimpleEntry } from '../data/about'

function SimpleList({ title, glyph, entries }: { title: string; glyph: string; entries: SimpleEntry[] }) {
  return (
    <section className="about-section">
      <div className="divider">
        <span className="divider__glyph">
          {glyph} {title.toUpperCase()}
        </span>
      </div>
      <div className="simple-grid">
        {entries.map((e) => (
          <div key={e.title + e.detail} className="simple-entry card">
            <h4>{e.title}</h4>
            <p className="mono">{e.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Timeline() {
  return (
    <div>
      <PageIntro
        index="04"
        title="Timeline"
        lede="Where I've been and what I'm building now — research, startups, and school along the way."
      />

      <section>
        <div className="timeline">
          {timeline.map((entry) => (
            <article key={entry.date + entry.org} className="timeline__entry">
              <div className="timeline__rail">
                <span className="timeline__node" />
              </div>
              <div className="timeline__content card">
                <div className="timeline__head">
                  <a href={entry.url} target="_blank" rel="noopener noreferrer" className="timeline__logo">
                    <img src={entry.logo} alt={entry.alt} loading="lazy" />
                  </a>
                  <div>
                    <p className="timeline__date mono">{entry.date.toUpperCase()}</p>
                    <p className="timeline__org">{entry.org}</p>
                    {entry.orgDetail && <p className="timeline__org-detail">{entry.orgDetail}</p>}
                  </div>
                </div>
                {entry.positions.map((pos) => (
                  <div key={pos.title} className="timeline__position">
                    <h3>
                      {pos.title}
                      {pos.span && <span className="timeline__span mono"> · {pos.span}</span>}
                    </h3>
                    {pos.bullets.length > 0 && (
                      <ul>
                        {pos.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="divider">
          <span className="divider__glyph">✦ CURRENT AFFILIATIONS</span>
        </div>
        <div className="affiliations">
          {affiliations.map((a) => (
            <a
              key={a.name}
              className="affiliations__item card card--hover"
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              title={a.name}
            >
              <img src={a.logo} alt={a.name} loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <SimpleList title="Teaching and Mentorship" glyph="✦" entries={teaching} />
      <SimpleList title="Volunteering" glyph="✦" entries={volunteering} />
      <SimpleList title="Impactful Courses" glyph="✦" entries={courses} />
    </div>
  )
}
