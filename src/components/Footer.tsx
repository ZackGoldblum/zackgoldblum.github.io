import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__meta mono">
          © {new Date().getFullYear()} ZACK GOLDBLUM · PHILADELPHIA, PA
        </p>
        <SocialLinks />
        <button
          className="footer__top mono"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  )
}
