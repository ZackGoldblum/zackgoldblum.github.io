import { Fragment } from 'react'

/** A thin vertical-bar separator that reads clearly over the starfield. */
export function Sep() {
  return <span className="sep" aria-hidden="true" />
}

/** Render a string, swapping its ` · ` separators for the styled Sep dot. */
export function withSeps(text: string) {
  return text.split(' · ').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <Sep />}
      {part}
    </Fragment>
  ))
}
