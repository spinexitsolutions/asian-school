import { Fragment, type ElementType } from 'react'
import clsx from 'clsx'

/**
 * Renders a headline where words wrapped in *stars* become gold italics.
 * With `split`, each line (separated by " / " or "\n") animates in on reveal.
 */
export function Title({
  text,
  as: Tag = 'h2',
  className,
  split = false,
}: {
  text: string
  as?: ElementType
  className?: string
  split?: boolean
}) {
  const renderInline = (chunk: string) =>
    chunk.split(/(\*[^*]+\*)/g).map((part, i) =>
      part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
    )

  if (!split) return <Tag className={clsx('display', className)}>{renderInline(text)}</Tag>

  const lines = text.split(/\s\/\s|\n/)
  return (
    <Tag className={clsx('display', className)} data-reveal="fade">
      {lines.map((line, i) => (
        <span key={i} className="split-line">
          <span style={{ ['--d' as string]: `${120 + i * 110}ms` }}>{renderInline(line)}</span>
        </span>
      ))}
    </Tag>
  )
}
