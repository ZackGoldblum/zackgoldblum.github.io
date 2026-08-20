import SocialLinks from './SocialLinks'

/**
 * Futuristic HUD "inspector" panel for the homepage hero — one card: a glowing
 * title band seated on the body, divided by a hairline. The sci-fi read comes
 * from the ion-blue header, the holographic portrait, and the mono readout
 * rather than a separate chamfered frame.
 */
export default function ProfilePanel() {
  return (
    <div className="hud">
      <div className="hud__panel">
        {/* ---- header ---- */}
        <header className="hud__head">
          <span className="hud__eyebrow">
            <svg className="hud__cube" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.5 3.6L12 11.5 5.5 7.9 12 4.3ZM5 9.6l6 3.3v6.8l-6-3.3V9.6Zm14 0v6.8l-6 3.3v-6.8l6-3.3Z"
                fill="currentColor"
              />
            </svg>
            Profile
          </span>
          <h1 className="hud__title">Zack Goldblum</h1>
        </header>

        {/* ---- body ---- */}
        <div className="hud__body">
          <div className="hud__viewport">
            <div className="hud__portrait">
              <img
                src="/about/zack_profile_pic.webp"
                alt="Zack Goldblum"
                width="280"
                height="280"
              />
              <span className="hud__scan" aria-hidden="true" />
            </div>
            <span className="hud__code hud__code--bl">Philadelphia, PA</span>
          </div>

          <div className="hud__readout">
            <dl className="hud__fields">
              <div className="hud__field">
                <dt className="hud__k">Role</dt>
                <dd className="hud__v">PhD Candidate</dd>
              </div>
              <div className="hud__field">
                <dt className="hud__k">Lab</dt>
                <dd className="hud__v">Univ. of Pennsylvania</dd>
              </div>
              <div className="hud__field">
                <dt className="hud__k">Field</dt>
                <dd className="hud__v">Bioengineering</dd>
              </div>
              <div className="hud__field">
                <dt className="hud__k">Focus</dt>
                <dd className="hud__v">Neurotech &times; AI</dd>
              </div>
            </dl>

            <p className="hud__desc">
              Hello! Welcome to my website. I'm an engineer and scientist doing
              research at the intersection of neurotechnology and AI.
            </p>

            <div className="hud__footer">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
