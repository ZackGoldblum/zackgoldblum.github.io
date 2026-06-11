import SocialLinks from '../components/SocialLinks'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__title rise">
            Zack Goldblum
          </h1>
          <p className="hero__meta mono rise rise--1">
            CURRENTLY: BIOENGINEERING PHD CANDIDATE · LITT LAB · UPENN
          </p>
          <p className="hero__lede rise rise--2">
            Hello! Welcome to my corner of the universe. I am an engineer and scientist doing
            research at the intersection of neurotechnology and artificial intelligence —
            building devices that listen to the brain and learn to talk back.
          </p>
          <div className="card hero__socials-card rise rise--3">
            <SocialLinks />
          </div>
        </div>
        <div className="hero__portrait rise rise--2">
          <img src="/about/zack_profile_pic.webp" alt="Zack Goldblum" width="280" height="280" />
          <p className="eyebrow hero__tagline">
            Neurotechnology × Artificial Intelligence
          </p>
        </div>
      </section>
    </div>
  )
}
