interface StarsProps {
  rating: number // 0–5, halves allowed
}

const STAR = 13 // glyph size px
const GAP = 2 // gap between glyphs px

const StarRow = () => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        width={STAR}
        height={STAR}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.6 14.93 8.9l6.57.78-4.86 4.5 1.3 6.48L12 17.42l-5.94 3.24 1.3-6.48-4.86-4.5 6.57-.78L12 2.6Z" />
      </svg>
    ))}
  </>
)

/**
 * Overlap technique: dim base row, bright row clipped to the rating.
 * Clip width is computed in px (whole stars + gaps + fraction of the
 * next glyph) so half-stars land exactly on glyph boundaries.
 */
export default function Stars({ rating }: StarsProps) {
  const whole = Math.floor(rating)
  const frac = rating - whole
  const width = whole * (STAR + GAP) + frac * STAR

  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="stars__base">
        <StarRow />
      </span>
      <span className="stars__fill" style={{ width: `${width}px` }}>
        <StarRow />
      </span>
    </span>
  )
}
