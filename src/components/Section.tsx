import clsx from 'clsx'

import { Title } from './Title'

export function Section({
  children,
  className,
  tone = 'paper',
  id,
}: {
  children: React.ReactNode
  className?: string
  tone?: 'paper' | 'bone' | 'ink'
  id?: string
}) {
  return (
    <section
      id={id}
      className={clsx(
        'relative py-24 md:py-36',
        tone === 'bone' && 'bg-bone',
        tone === 'ink' && 'bg-ink text-white',
        className,
      )}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function SectionHead({
  index,
  eyebrow,
  title,
  text,
  dark,
  aside,
}: {
  index?: string
  eyebrow: string
  title: string
  text?: string | null
  dark?: boolean
  aside?: React.ReactNode
}) {
  return (
    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <div className="flex items-center gap-4" data-reveal>
          {index && <span className={clsx('index-num', dark && 'text-white/40')}>({index})</span>}
          <span className={clsx('eyebrow', dark && 'eyebrow--dark')}>{eyebrow}</span>
        </div>
        <Title text={title} split className={clsx('t-2 mt-6 max-w-[18ch]', dark ? 'text-white' : 'text-ink')} />
      </div>
      {(text || aside) && (
        <div className="md:col-span-4" data-reveal style={{ ['--d' as string]: '200ms' }}>
          {text && <p className={clsx('text-[16px] leading-relaxed', dark ? 'text-white/65' : 'text-ink-2')}>{text}</p>}
          {aside}
        </div>
      )}
    </div>
  )
}
