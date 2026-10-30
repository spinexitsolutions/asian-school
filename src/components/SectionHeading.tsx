import clsx from 'clsx'

import { Stars } from './Stars'

export function SectionHeading({
  label,
  title,
  text,
  align = 'center',
  light,
  className,
}: {
  label: string
  title: string
  text?: string | null
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}) {
  return (
    <div className={clsx('mb-12 md:mb-14', align === 'center' && 'mx-auto max-w-3xl text-center', className)} data-reveal>
      <span className={clsx('label-pill', light && 'label-pill--light')}>{label}</span>
      <h2 className={clsx('heading-lg mt-5', light ? 'text-white' : 'text-ink')}>
        <Stars text={title} className={light ? 'accent' : 'accent-blue'} />
      </h2>
      <div className={clsx('tri-rule mt-5', align === 'center' && 'justify-center')} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      {text && <p className={clsx('mt-5 text-[16.5px] leading-relaxed', light ? 'text-white/75' : 'text-ink-2')}>{text}</p>}
    </div>
  )
}
