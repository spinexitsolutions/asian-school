import { Fragment } from 'react'

/** Turns "Nurturing *Bright* Minds" into text with highlighted words. */
export function Stars({ text, className = 'accent' }: { text?: string | null; className?: string }) {
  if (!text) return null
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <span key={i} className={className}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Plain-text paragraphs separated by blank lines. */
export function Paragraphs({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className={className}>
            {p}
          </p>
        ))}
    </>
  )
}
