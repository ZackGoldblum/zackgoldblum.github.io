import { useState } from 'react'
import Chip from '../components/Chip'
import PageIntro from '../components/PageIntro'
import { research, researchTypePlural, researchTypeTone, type ResearchType } from '../data/research'

export default function Research() {
  const [filter, setFilter] = useState<ResearchType | null>(null)

  // Only offer filters for types that actually appear
  const types = (Object.keys(researchTypeTone) as ResearchType[]).filter((t) =>
    Object.values(research).some((items) => items.some((item) => item.type === t)),
  )

  return (
    <div>
      <PageIntro
        index="02"
        title="Research"
        lede="Publications, posters, and talks — translational neuroengineering, epilepsy care, and AI systems that make neural data conversational."
      />
      <div className="filter-row" role="group" aria-label="Filter by type">
        <button
          className={`chip chip--btn${filter === null ? ' chip--ion' : ''}`}
          aria-pressed={filter === null}
          onClick={() => setFilter(null)}
        >
          All
        </button>
        {types.map((t) => (
          <button
            key={t}
            className={`chip chip--btn${filter === t ? ` chip--${researchTypeTone[t]}` : ''}`}
            aria-pressed={filter === t}
            onClick={() => setFilter(filter === t ? null : t)}
          >
            {researchTypePlural[t]}
          </button>
        ))}
      </div>
      {Object.entries(research).map(([era, items]) => {
        const visible = filter ? items.filter((item) => item.type === filter) : items
        if (visible.length === 0) return null
        return (
          <section key={era}>
            <div className="era">
              <span className="era__year">{era.toUpperCase()}</span>
              <span className="era__line" />
            </div>
            <div className="research-list">
              {visible.map((item, i) => (
                <article key={`${item.title}-${i}`} className="research card">
                  <div className="research__tags">
                    <Chip tone={researchTypeTone[item.type]}>{item.type}</Chip>
                    {item.awards?.map((award) => (
                      <span key={award} className="research__award mono">
                        ✦ {award.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <h3 className="research__title">{item.title}</h3>
                  <p
                    className="research__citation prose"
                    dangerouslySetInnerHTML={{ __html: item.citation }}
                  />
                  {item.links && item.links.length > 0 && (
                    <div className="research__links">
                      {item.links.map((l) => (
                        <a
                          key={l.href}
                          className="research__link mono"
                          href={l.href}
                          target={l.href.startsWith('/') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                        >
                          {l.label.toUpperCase()} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
