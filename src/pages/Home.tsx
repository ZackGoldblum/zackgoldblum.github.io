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
            BIOENGINEERING PHD CANDIDATE AT THE UNIVERSITY OF PENNSYLVANIA
          </p>
          <p className="hero__lede rise rise--2">
            Hello! Welcome to my website. I am an engineer and scientist doing
            research at the intersection of neurotechnology and AI.
          </p>
          <div className="card hero__socials-card rise rise--3">
            <SocialLinks />
          </div>
        </div>
        <div className="hero__portrait rise rise--2">
          <img src="/about/zack_profile_pic.webp" alt="Zack Goldblum" width="280" height="280" />
        </div>
      </section>
    </div>
  )
}
