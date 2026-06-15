interface LinkIconProps {
  /** External links get the up-right arrow; internal ones get a document glyph. */
  external?: boolean
}

/**
 * LinkIcon — trailing glyph for link buttons.
 * Stroke-based so it stays crisp at small sizes; inherits the button's color.
 */
export default function LinkIcon({ external = true }: LinkIconProps) {
  return (
    <svg
      className="btn__arrow"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {external ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </>
      ) : (
        // Magnifying glass — "view" a same-site file like a poster PDF
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </>
      )}
    </svg>
  )
}
