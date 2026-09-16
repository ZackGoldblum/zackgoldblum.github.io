import { useEffect, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Starfield from './components/Starfield'
import Bookshelf from './pages/Bookshelf'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Timeline from './pages/Timeline'

// A reload (or a return from another site) should land where the page was
// left. The browser's own restoration only runs once the page is tall enough,
// i.e. after React has painted it at the top — a visible flash of the wrong
// content — so it is disabled and done here instead, before the first paint.
history.scrollRestoration = 'manual'

const loadPath = window.location.pathname
let pristine = true // no in-app navigation yet — the load path may still restore

/** Route changes start at the top; the initial load restores its saved offset. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(`scroll:${pathname}`)
    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    // A fresh visit ('navigate') starts at the top even if an offset was saved
    const restore = pristine && pathname === loadPath && saved !== null && nav?.type !== 'navigate'
    if (!restore) {
      pristine = false
      window.scrollTo(0, 0)
      return
    }

    const y = Number(saved)
    window.scrollTo(0, y)
    // The page keeps settling for a moment — fonts swap in, lazy images size
    // up — and each reflow would leave the offset pointing at different
    // content. Re-apply it as the document changes height (before paint, so
    // nothing visibly moves) until the user takes over or the load settles.
    const ro = new ResizeObserver(() => window.scrollTo(0, y))
    ro.observe(document.body)
    let timer = 0
    const stop = () => {
      ro.disconnect()
      window.clearTimeout(timer)
    }
    const inputs = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const
    for (const ev of inputs) window.addEventListener(ev, stop, { passive: true, once: true })
    const settled = () => {
      timer = window.setTimeout(stop, 500)
    }
    if (document.readyState === 'complete') settled()
    else window.addEventListener('load', settled, { once: true })
    return () => {
      stop()
      for (const ev of inputs) window.removeEventListener(ev, stop)
      window.removeEventListener('load', settled)
    }
  }, [pathname])

  useEffect(() => {
    const save = () =>
      sessionStorage.setItem(`scroll:${window.location.pathname}`, String(window.scrollY))
    window.addEventListener('pagehide', save)
    return () => window.removeEventListener('pagehide', save)
  }, [])

  return null
}

const SITE_URL = 'https://www.zackgoldblum.com'

/** Per-route <title>/description/canonical — index.html can only carry one set. */
const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Zack Goldblum',
    description:
      'Zack Goldblum — engineer and scientist working at the intersection of neurotechnology and artificial intelligence.',
  },
  '/projects': {
    title: 'Projects — Zack Goldblum',
    description:
      "Collection of projects I've worked on over the years. Mix of things from school, research, and personal endeavors.",
  },
  '/research': {
    title: 'Research — Zack Goldblum',
    description:
      'Published and presented research, from neurocritical care and optical neuroimaging to translational neuroengineering and neuroinformatics.',
  },
  '/bookshelf': {
    title: 'Bookshelf — Zack Goldblum',
    description:
      "What I've been reading. Mostly sci-fi, some classics and non-fiction mixed in.",
  },
  '/timeline': {
    title: 'Timeline — Zack Goldblum',
    description: "Where I've been and what I'm doing now.",
  },
}

function setMetaTag(selector: string, content: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

/**
 * GitHub Pages 301s /projects to /projects/, so both forms reach the app and
 * must resolve to the same PAGE_META entry. Router matching already ignores the
 * trailing slash; useLocation().pathname does not.
 */
function metaKey(pathname: string) {
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

/** The trailing-slash form is what Pages serves with a 200, so that's canonical. */
function absoluteUrl(key: string) {
  return key === '/' ? `${SITE_URL}/` : `${SITE_URL}${key}/`
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const key = metaKey(pathname)
    const meta = PAGE_META[key]
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

    if (!meta) {
      // Unknown path: GitHub Pages already returns a 404 status, so leave it uncanonicalized.
      document.title = 'Page not found — Zack Goldblum'
      canonical?.remove()
      return
    }

    document.title = meta.title
    setMetaTag('meta[name="description"]', meta.description)
    setMetaTag('meta[property="og:title"]', meta.title)
    setMetaTag('meta[property="og:description"]', meta.description)
    setMetaTag('meta[property="og:url"]', absoluteUrl(key))

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = absoluteUrl(key)
  }, [pathname])

  return null
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <Starfield />
      <div className="site">
        <Nav />
        <main className="site__main">
          <ScrollToTop />
          <PageMeta />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/about" element={<Navigate to="/timeline" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Homepage is a single self-contained viewport — no footer */}
        {pathname !== '/' && <Footer />}
      </div>
    </>
  )
}
