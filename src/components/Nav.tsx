import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SocialLinks from './SocialLinks'

const LINKS = [
  { to: '/projects', label: 'Projects', index: '01' },
  { to: '/research', label: 'Research', index: '02' },
  { to: '/blog', label: 'Blog', index: '03' },
  { to: '/bookshelf', label: 'Bookshelf', index: '04' },
  { to: '/timeline', label: 'Timeline', index: '05' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Close the overlay on navigation
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock scroll while the overlay is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          {/* The hero already says the name — keep the slot so the links stay right-aligned */}
          {isHome ? (
            <span className="nav__brand" aria-hidden="true" />
          ) : (
            <Link to="/" className="nav__brand" aria-label="Home">
              <span className="nav__name">Zack Goldblum</span>
            </Link>
          )}

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            className={`nav__burger${open ? ' nav__burger--open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Overlay lives outside the header: backdrop-filter on .nav would
          otherwise re-anchor position:fixed to the navbar. */}
      <div className={`nav__overlay${open ? ' nav__overlay--open' : ''}`} aria-hidden={!open}>
        <nav className="nav__overlay-links" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={{ transitionDelay: open ? `${60 + i * 45}ms` : '0ms' }}
              className={({ isActive }) =>
                `nav__overlay-link${isActive ? ' nav__overlay-link--active' : ''}`
              }
            >
              <span className="mono nav__overlay-index">{l.index}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <SocialLinks className="nav__overlay-socials" />
      </div>
    </>
  )
}
