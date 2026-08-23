import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Stars from './Stars'
import type { Book } from '../data/books'

interface BookLightboxProps {
  book: Book
  fromEl: HTMLElement // the grid thumbnail — the zoom animates from/to its rect
  aspect: number // natural width / height — full view never crops
  color: [number, number, number] // dominant cover color — paints the generated faces
  onClose: () => void
}

const DEFAULT_PAGES = 320
const SPIN_BACK_MS = 300

/**
 * BookLightbox — full-size cover view that becomes a rotatable 3D book.
 *
 * FLIP zoom: the flat image mounts at the thumbnail's position/scale and
 * transitions to a centered full-size rect. Once the zoom lands, the 3D
 * book (front cover + generated spine, back, and page edges) swaps in and
 * swings open; drag rotates it. Closing spins the book back to face front,
 * swaps the flat image back, and reverses the zoom into the grid.
 */
/**
 * The element's rect with its own transform translation backed out. The cover
 * buttons lift on hover, and the zoom should start and land on the resting
 * position rather than the lifted one.
 */
function restingRect(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  const tf = getComputedStyle(el).transform
  const m = tf === 'none' ? null : new DOMMatrixReadOnly(tf)
  return {
    left: r.left - (m?.m41 ?? 0),
    top: r.top - (m?.m42 ?? 0),
    width: r.width,
    height: r.height,
  }
}

export default function BookLightbox({ book, fromEl, aspect, color, onClose }: BookLightboxProps) {
  const [open, setOpen] = useState(false)
  const [show3d, setShow3d] = useState(false)
  const [returning, setReturning] = useState(false)
  const closing = useRef(false)

  // Final rect — centered at the cover's own aspect, capped by the viewport.
  // The viewport is state, not a bare read: the lightbox outlives resizes and
  // the rect is absolute pixels, so it has to be recomputed when they change.
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight })
  const vw = viewport.w
  const vh = viewport.h
  const height = Math.min(vh * 0.85, (vw * 0.9) / aspect)
  const width = height * aspect
  const left = (vw - width) / 2
  const top = (vh - height) / 2

  // Animate the box itself (not a transform) so the corner radius
  // stays constant in screen pixels throughout the zoom.
  //
  // Measured every render rather than captured once: a resize reflows the grid
  // underneath, and the closing zoom has to land on where the thumbnail is now,
  // not where it was when the book was opened.
  const thumb = restingRect(fromEl)
  const full = { left, top, width, height }

  const close = () => {
    if (closing.current) return
    closing.current = true
    if (show3d) {
      // Spin back to face front, swap the flat cover in, then reverse the zoom
      setReturning(true)
      window.setTimeout(() => {
        setShow3d(false)
        setOpen(false)
      }, SPIN_BACK_MS + 40)
      window.setTimeout(onClose, SPIN_BACK_MS + 40 + 450)
    } else {
      setOpen(false)
      // Unmount after the reverse zoom (fallback if transitionend never fires)
      window.setTimeout(onClose, 450)
    }
  }
  // Escape handler lives in a mount effect — read the latest close through a ref
  const closeRef = useRef(close)
  closeRef.current = close

  useEffect(() => {
    // Expand on the frame after mount so the start transform paints first
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
    // Swap to the 3D book once the zoom lands. A timer, not transitionend —
    // the transition is disabled under prefers-reduced-motion.
    const t = window.setTimeout(() => {
      if (!closing.current) setShow3d(true)
    }, 420)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)

    // Re-center on resize. .lightbox__scene carries no transition, so the box
    // tracks the new rect instantly instead of easing along behind the drag.
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)

    // Lock scroll while open
    document.documentElement.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`lightbox${open ? ' lightbox--open' : ''}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={`${book.title} cover`}
    >
      <div className="lightbox__backdrop" />
      <img
        className={`lightbox__img${show3d ? ' lightbox__img--hidden' : ''}`}
        src={book.cover}
        alt={`${book.title} cover`}
        style={open ? full : thumb}
        onTransitionEnd={() => {
          if (closing.current) onClose()
        }}
      />
      {show3d && (
        <div className="lightbox__scene" style={full} onClick={(e) => e.stopPropagation()}>
          <Book3D book={book} height={height} color={color} returning={returning} />
        </div>
      )}
    </div>
  )
}

interface Book3DProps {
  book: Book
  height: number // rendered cover height in px — thickness scales off this
  color: [number, number, number]
  returning: boolean // true → spin back to front-facing for the close zoom
}

function Book3D({ book, height, color, returning }: Book3DProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const rot = useRef({ x: -4, y: 30 }) // resting pose after the opening swing
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Physical thickness: ~0.09mm of paper per leaf plus board covers,
  // proportional to a 216mm-tall trade paperback.
  const pages = book.pages ?? DEFAULT_PAGES
  const thickness = Math.max((height * (3 + 0.045 * pages)) / 216, 16)

  const [r, g, b] = color
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  const ink = lum > 0.55 ? 'rgba(16, 15, 20, 0.9)' : 'rgba(246, 243, 235, 0.94)'

  const setPose = (ms: number) => {
    const el = boxRef.current
    if (!el) return
    el.style.transition = ms > 0 && !reduced.current ? `transform ${ms}ms var(--ease-out)` : 'none'
    el.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`
  }

  useEffect(() => {
    // Opening swing from flat (the box mounts untransformed) to the resting
    // pose, so the depth reads immediately. A short timeout, not rAF — rAF
    // stalls in occluded tabs, which would leave the book stuck flat.
    if (reduced.current) {
      setPose(0)
      return
    }
    const t = window.setTimeout(() => setPose(700), 50)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!returning) return
    drag.current = null
    // Unwind to the nearest full turn so the book faces front the short way
    rot.current = { x: 0, y: Math.round(rot.current.y / 360) * 360 }
    setPose(SPIN_BACK_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returning])

  useEffect(() => {
    // Dynamic lighting: a fixed light in viewer space (upper-left, in front).
    // Each frame, read the *rendered* transform — so drags and the CSS
    // transition swings both count — and shade every face by how squarely
    // it faces the light (Lambert with an ambient floor). The matrix columns
    // are the world images of the box's local axes, i.e. the face normals.
    const el = boxRef.current
    if (!el) return
    // Shading is a dark veil per face (opacity 0 = fully lit) — a filter
    // would be a grouping property and knock the face out of the 3D scene.
    const L = [-0.42, -0.51, 0.75] // normalized; y points down in CSS space
    const veil = (nx: number, ny: number, nz: number) => {
      const lambert = Math.max(nx * L[0] + ny * L[1] + nz * L[2], 0)
      return (0.38 * Math.pow(1 - lambert, 1.4)).toFixed(3)
    }
    let raf = 0
    let last = ''
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const tf = getComputedStyle(el).transform
      if (tf === last) return
      last = tf
      const m = tf === 'none' ? new DOMMatrixReadOnly() : new DOMMatrixReadOnly(tf)
      el.style.setProperty('--veil-fore', veil(m.m11, m.m12, m.m13))
      el.style.setProperty('--veil-spine', veil(-m.m11, -m.m12, -m.m13))
      el.style.setProperty('--veil-bottom', veil(m.m21, m.m22, m.m23))
      el.style.setProperty('--veil-top', veil(-m.m21, -m.m22, -m.m23))
      el.style.setProperty('--veil-front', veil(m.m31, m.m32, m.m33))
      el.style.setProperty('--veil-back', veil(-m.m31, -m.m32, -m.m33))
      // Glossy sheen sweeps across each laminated face as its normal swings
      // past the light. Same inputs as the veil — a face's own normal — so the
      // front, back, and spine each catch the light on their own schedule.
      el.style.setProperty('--sheen-front', `${(50 + 55 * m.m31).toFixed(1)}%`)
      el.style.setProperty('--sheen-back', `${(50 - 55 * m.m31).toFixed(1)}%`)
      el.style.setProperty('--sheen-spine', `${(50 - 55 * m.m11).toFixed(1)}%`)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (returning) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    rot.current.y += (e.clientX - d.x) * 0.45
    rot.current.x = Math.max(-32, Math.min(32, rot.current.x - (e.clientY - d.y) * 0.3))
    d.x = e.clientX
    d.y = e.clientY
    setPose(0)
  }

  const endDrag = () => {
    drag.current = null
  }

  const vars = {
    '--bt': `${thickness}px`,
    '--bh': `${height}px`,
    '--bc': `rgb(${r}, ${g}, ${b})`,
    '--ink': ink,
  } as CSSProperties

  return (
    <div
      className="book3d"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="book3d__box" ref={boxRef} style={vars}>
        <div className="book3d__face book3d__front">
          <img src={book.cover} alt={`${book.title} cover`} draggable={false} />
        </div>
        <div className="book3d__face book3d__back">
          <div className="book3d__back-info">
            <span className="book3d__back-title">{book.title}</span>
            <span className="book3d__back-author">{book.author}</span>
            <span className="book3d__back-rule" />
            {book.rating !== undefined && <Stars rating={book.rating} />}
          </div>
          <div className="book3d__back-barcode" aria-hidden="true">
            <span className="book3d__back-barcode-lines" />
            <span className="book3d__back-barcode-num">{pages} pp.</span>
          </div>
        </div>
        <div className="book3d__face book3d__spine">
          <span className="book3d__spine-title">{book.title}</span>
          <span className="book3d__spine-author">{book.author}</span>
        </div>
        <div className="book3d__face book3d__edge book3d__edge--fore" />
        <div className="book3d__face book3d__edge book3d__edge--top" />
        <div className="book3d__face book3d__edge book3d__edge--bottom" />
      </div>
    </div>
  )
}
