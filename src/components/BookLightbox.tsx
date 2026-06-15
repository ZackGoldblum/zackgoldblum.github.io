import { useEffect, useRef, useState } from 'react'
import type { Book } from '../data/books'

interface BookLightboxProps {
  book: Book
  fromRect: DOMRect // thumbnail position — the zoom animates from/to here
  aspect: number // natural width / height — full view never crops
  onClose: () => void
}

/**
 * BookLightbox — full-size cover view.
 *
 * FLIP zoom: the image mounts at the thumbnail's position/scale, then
 * transitions to a centered full-size rect. Closing reverses the motion
 * back into the grid before unmounting.
 */
export default function BookLightbox({ book, fromRect, aspect, onClose }: BookLightboxProps) {
  const [open, setOpen] = useState(false)
  const closing = useRef(false)

  // Final rect — centered at the cover's own aspect, capped by the viewport
  const vw = window.innerWidth
  const vh = window.innerHeight
  const height = Math.min(vh * 0.85, (vw * 0.9) / aspect)
  const width = height * aspect
  const left = (vw - width) / 2
  const top = (vh - height) / 2

  // Animate the box itself (not a transform) so the corner radius
  // stays constant in screen pixels throughout the zoom.
  const thumb = {
    left: fromRect.left,
    top: fromRect.top,
    width: fromRect.width,
    height: fromRect.height,
  }
  const full = { left, top, width, height }

  const close = () => {
    if (closing.current) return
    closing.current = true
    setOpen(false)
    // Unmount after the reverse zoom (fallback if transitionend never fires)
    window.setTimeout(onClose, 450)
  }

  useEffect(() => {
    // Expand on the frame after mount so the start transform paints first
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)

    // Lock scroll while open
    document.documentElement.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
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
        className="lightbox__img"
        src={book.cover}
        alt={`${book.title} cover`}
        style={open ? full : thumb}
        onTransitionEnd={() => {
          if (closing.current) onClose()
        }}
      />
    </div>
  )
}
