import Image from 'next/image'
import clsx from 'clsx'

import { img } from '@/lib/media'
import type { Media } from '@/payload-types'

/**
 * Image frame used everywhere on the site. When no photo has been uploaded yet
 * it renders a designed placeholder (warm gradient + arch line-art) so the
 * layout never looks broken.
 */
export function Frame({
  media,
  label,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority,
  tone = 'warm',
  size,
}: {
  media?: Media | string | null
  label?: string
  className?: string
  sizes?: string
  priority?: boolean
  tone?: 'warm' | 'ink'
  size?: 'thumb' | 'card'
}) {
  const image = img(media, size)
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {image ? (
        <Image
          src={image.url}
          alt={image.alt || label || ''}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={image.focal ? { objectPosition: image.focal } : undefined}
        />
      ) : (
        <Placeholder label={label} tone={tone} />
      )}
    </div>
  )
}

function Placeholder({ label, tone }: { label?: string; tone: 'warm' | 'ink' }) {
  const ink = tone === 'ink'
  return (
    <div
      aria-hidden
      className={clsx(
        'absolute inset-0',
        ink
          ? 'bg-[radial-gradient(120%_80%_at_70%_10%,#2a3d6e_0%,#0e1a33_60%)]'
          : 'bg-[radial-gradient(120%_90%_at_20%_0%,#fbf6ea_0%,#efe3c8_55%,#e2cfa6_100%)]',
      )}
    >
      <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <g fill="none" stroke={ink ? 'rgba(201,163,91,0.35)' : 'rgba(14,26,51,0.12)'} strokeWidth="0.6">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${30 + i * 8} 260V${120 + i * 6}c0-${38 - i * 5} ${31 - i * 3}-${70 - i * 7} ${70 - i * 8}-${70 - i * 7}s${70 - i * 8} ${32 - i * 4} ${70 - i * 8} ${70 - i * 7}V260`} />
          ))}
        </g>
        <path d="M100 74l2.4 5.2 5.6.6-4.2 3.8 1.2 5.5-5-2.9-5 2.9 1.2-5.5-4.2-3.8 5.6-.6Z" fill={ink ? '#c9a35b' : 'rgba(176,125,43,0.55)'} />
      </svg>
      {label && (
        <span
          className={clsx(
            'absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em]',
            ink ? 'text-white/50' : 'text-ink/40',
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}
