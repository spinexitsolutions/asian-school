import Image from 'next/image'
import clsx from 'clsx'

import { img } from '@/lib/media'
import type { Media } from '@/cms/types'

/**
 * Renders an uploaded photo, else a static fallback image, else a soft
 * branded placeholder so layouts never look broken before photos are added.
 */
export function Photo({
  media,
  fallback,
  alt = '',
  className,
  imgClassName,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority,
  size,
  label,
}: {
  media?: Media | string | null
  fallback?: string
  alt?: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  size?: 'thumb' | 'card'
  label?: string
}) {
  const image = img(media, size)
  const src = image?.url ?? fallback
  return (
    <div className={clsx('relative overflow-hidden bg-brand-50', className)}>
      {src ? (
        <Image
          src={src}
          alt={image?.alt || alt}
          fill
          sizes={sizes}
          priority={priority}
          className={clsx('object-cover', imgClassName)}
          style={image?.focal ? { objectPosition: image.focal } : undefined}
        />
      ) : (
        <div className="dots-bg absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-50 to-flame-50">
          <Image src="/images/logo.png" alt="" width={72} height={72} className="opacity-25 mix-blend-multiply grayscale" />
          {label && <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700/50">{label}</span>}
        </div>
      )}
    </div>
  )
}
