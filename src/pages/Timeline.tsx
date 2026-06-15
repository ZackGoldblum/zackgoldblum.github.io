import PageIntro from '../components/PageIntro'
import { withSeps } from '../components/Sep'
import { courses, teaching, timeline, volunteering, type SimpleEntry } from '../data/about'

function SectionHead({ title }: { title: string }) {
  return (
    <div className="era">
      <span className="era__year">{title.toUpperCase()}</span>
      <span className="era__line" />
    </div>
  )
}

/** Flat ledger rows: title over org on the left, mono date right, hairline between. */
function Ledger({ title, entries }: { title: string; entries: SimpleEntry[] }) {
  return (
    <section className="about-section">
      <SectionHead title={title} />
      <ul className="ledger">
        {entries.map((e) => (
          <li key={e.title + e.org}>
            <div className="ledger__main">
              <span className="ledger__title">{e.title}</span>
              <span className="ledger__org">{withSeps(e.org)}</span>
            </div>
            <span className="ledger__date mono">{e.date}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Timeline() {
  return (
    <div>
      <PageIntro
        index="05"
        title="Timeline"
        lede="Where I've been and what I'm doing now."
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
                    <div className="timeline__position-head">
                      <h3>{pos.title}</h3>
                      {pos.span && <span className="timeline__span mono">{pos.span.toUpperCase()}</span>}
                    </div>
                    {pos.bullets.length > 0 && (
                      <ul>
                        {pos.bullets.map((b) => (
                          <li key={b} dangerouslySetInnerHTML={{ __html: b }} />
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

      <Ledger title="Teaching and Mentorship" entries={teaching} />
      <Ledger title="Volunteering" entries={volunteering} />
      <Ledger title="Impactful Courses" entries={courses} />
    </div>
  )
}
