interface ArrowButtonProps {
  dir: 'prev' | 'next'
  label: string
  className?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

/** Round chevron button — cycles images on project cards and in the lightbox. */
export default function ArrowButton({ dir, label, className, onClick }: ArrowButtonProps) {
  return (
    <button className={`arrow-btn${className ? ` ${className}` : ''}`} aria-label={label} onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={dir === 'next' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} />
      </svg>
    </button>
  )
}
