import { Link } from 'react-router-dom'
import SocialLinks from '../components/SocialLinks'
import { fieldRecords } from '../data/about'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow eyebrow--ion rise">Neurotechnology × Artificial Intelligence</p>
          <h1 className="hero__title rise rise--1">
            Zack <span className="starlight">Goldblum</span>
          </h1>
          <p className="hero__lede rise rise--2">
            Hello! Welcome to my corner of the universe. I am an engineer and scientist doing
            research at the intersection of neurotechnology and artificial intelligence —
            building devices that listen to the brain and learn to talk back.
          </p>
          <p className="hero__meta mono rise rise--3">
            CURRENTLY: BIOENGINEERING PHD CANDIDATE · LITT LAB · UPENN
          </p>
          <div className="hero__actions rise rise--4">
            <Link to="/projects" className="btn btn--primary">
              Explore projects <span className="btn__arrow">→</span>
            </Link>
            <Link to="/research" className="btn">
              Research index
            </Link>
          </div>
          <div className="hero__socials rise rise--4">
            <SocialLinks />
          </div>
        </div>
        <div className="hero__portrait rise rise--2">
          <img src="/about/zack_profile_pic.webp" alt="Zack Goldblum" width="280" height="280" />
        </div>
      </section>

      <section className="records">
        <div className="divider">
          <span className="divider__glyph">✦ FIELD RECORDS</span>
        </div>
        <div className="records__strip">
          {fieldRecords.map((r, i) => (
            <figure key={r.src} className="records__item">
              <img src={r.src} alt={r.caption} loading={i < 2 ? 'eager' : 'lazy'} />
              <figcaption className="mono">
                {String(i + 1).padStart(2, '0')} · {r.caption.toUpperCase()}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
