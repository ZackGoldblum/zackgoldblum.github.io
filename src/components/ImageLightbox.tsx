import { useEffect, useRef, useState } from 'react'
import ArrowButton from './ArrowButton'

interface ImageLightboxProps {
  src: string
  alt: string
  fromEl: HTMLElement // the inline image's button — the zoom animates from/to its rect
  aspect: number // natural width / height — full view never crops
  /** Cycle to the previous (-1) or next (1) image; when set, arrows and arrow keys appear */
  onStep?: (step: number) => void
  onClose: () => void
}

/**
 * The element's rect with its own transform translation backed out. The
 * button lifts on hover, and the zoom should start and land on the resting
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

/**
 * ImageLightbox — flat full-size view of an inline image.
 *
 * The same FLIP zoom as BookLightbox without the 3D book: the image mounts
 * at the source element's rect and transitions to a centered full-size rect;
 * closing reverses the zoom back into place. A multi-image card passes
 * `onStep`; swapping `src`/`aspect` then eases the box to the new shape.
 */
export default function ImageLightbox({ src, alt, fromEl, aspect, onStep, onClose }: ImageLightboxProps) {
  const [open, setOpen] = useState(false)
  const closing = useRef(false)

  // Final rect — centered at the image's own aspect, capped by the viewport.
  // Viewport is state so the rect is recomputed on resize.
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight })
  const height = Math.min(viewport.h * 0.85, (viewport.w * 0.9) / aspect)
  const width = height * aspect
  const full = { left: (viewport.w - width) / 2, top: (viewport.h - height) / 2, width, height }

  // Measured every render: the closing zoom lands on where the source is now
  const thumb = restingRect(fromEl)

  const close = () => {
    if (closing.current) return
    closing.current = true
    setOpen(false)
    // Unmount after the reverse zoom (fallback if transitionend never fires)
    window.setTimeout(onClose, 450)
  }
  // Key handlers live in a mount effect — read the latest callbacks through refs
  const closeRef = useRef(close)
  closeRef.current = close
  const stepRef = useRef(onStep)
  stepRef.current = onStep

  useEffect(() => {
    // Expand on the frame after mount so the start rect paints first
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
      else if (e.key === 'ArrowLeft') stepRef.current?.(-1)
      else if (e.key === 'ArrowRight') stepRef.current?.(1)
    }
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    // Lock scroll while open
    document.documentElement.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div
      className={`lightbox${open ? ' lightbox--open' : ''}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="lightbox__backdrop" />
      <img
        className="lightbox__img"
        src={src}
        alt={alt}
        style={open ? full : thumb}
        onTransitionEnd={() => {
          if (closing.current) onClose()
        }}
      />
      {onStep && (
        <>
          <ArrowButton
            dir="prev"
            label="Previous image"
            className="lightbox__arrow lightbox__arrow--prev"
            onClick={(e) => {
              e.stopPropagation()
              onStep(-1)
            }}
          />
          <ArrowButton
            dir="next"
            label="Next image"
            className="lightbox__arrow lightbox__arrow--next"
            onClick={(e) => {
              e.stopPropagation()
              onStep(1)
            }}
          />
        </>
      )}
    </div>
  )
}
