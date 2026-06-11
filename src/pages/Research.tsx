import { useState } from 'react'
import Chip from '../components/Chip'
import LinkIcon from '../components/LinkIcon'
import PageIntro from '../components/PageIntro'
import { research, researchFilters, researchTypeTone, type ResearchFilter } from '../data/research'

export default function Research() {
  const [filter, setFilter] = useState<ResearchFilter | null>(null)

  // Only offer filters whose types actually appear
  const filters = researchFilters.filter((f) =>
    Object.values(research).some((items) => items.some((item) => f.types.includes(item.type))),
  )

  return (
    <div>
      <PageIntro
        index="02"
        title="Research"
        lede="All my published and presented research. From my early work in neurocritical care and optical neuroimaging to my current translational neuroengineering and neuroinformatics focus."
      />
      <div className="filter-row" role="group" aria-label="Filter by type">
        <button
          className={`chip chip--btn${filter === null ? ' chip--ion' : ''}`}
          aria-pressed={filter === null}
          onClick={() => setFilter(null)}
        >
          All
        </button>
        {filters.map((f) => (
          <button
            key={f.label}
            className={`chip chip--btn${filter === f ? ` chip--${f.tone}` : ''}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(filter === f ? null : f)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {Object.entries(research).map(([era, items]) => {
        const visible = filter ? items.filter((item) => filter.types.includes(item.type)) : items
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
                  {(() => {
                    const EQ = '*Equal contribution.'
                    const equal = item.citation.includes(EQ)
                    const citation = equal ? item.citation.replace(EQ, '').trim() : item.citation
                    return (
                      <>
                        <p
                          className="research__citation prose"
                          dangerouslySetInnerHTML={{ __html: citation }}
                        />
                        {equal && (
                          <p className="research__footnote">
                            *These authors contributed equally to this work
                          </p>
                        )}
                      </>
                    )
                  })()}
                  {item.links && item.links.length > 0 && (
                    <div className="research__links">
                      {item.links.map((l) => (
                        <a
                          key={l.href}
                          className="btn"
                          href={l.href}
                          target={l.href.startsWith('/') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                        >
                          {l.label} <LinkIcon external={!l.href.startsWith('/')} />
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
