import SocialLinks from './SocialLinks'
import { Sep } from './Sep'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__meta mono">
          © {new Date().getFullYear()} ZACK GOLDBLUM<Sep />PHILADELPHIA, PA
        </p>
        <SocialLinks />
      </div>
    </footer>
  )
}
