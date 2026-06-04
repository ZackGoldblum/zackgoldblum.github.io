import Chip from '../components/Chip'
import PageIntro from '../components/PageIntro'
import { research, researchTypeTone } from '../data/research'

export default function Research() {
  return (
    <div>
      <PageIntro
        index="02"
        title="Research"
        lede="Publications, posters, and talks — translational neuroengineering, epilepsy care, and AI systems that make neural data conversational."
      />
      {Object.entries(research).map(([era, items]) => (
        <section key={era}>
          <div className="era">
            <span className="era__year">{era.toUpperCase()}</span>
            <span className="era__line" />
          </div>
          <div className="research-list">
            {items.map((item, i) => (
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
      ))}
    </div>
  )
}
