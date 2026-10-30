import Link from 'next/link'
import clsx from 'clsx'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

type Variant = 'ink' | 'light' | 'gold' | 'ghost'

const styles: Record<Variant, { btn: string; dot: string }> = {
  ink: { btn: 'bg-ink text-white hover:bg-[#16264a]', dot: 'bg-white/12 text-gold-2' },
  light: { btn: 'bg-white text-ink hover:bg-bone', dot: 'bg-ink text-white' },
  gold: { btn: 'bg-gold text-white hover:bg-[#9d6f25]', dot: 'bg-white/20 text-white' },
  ghost: { btn: 'bg-transparent text-ink ring-1 ring-ink/15 hover:ring-ink/30 hover:bg-ink/[0.03]', dot: 'bg-ink/[0.06] text-ink' },
}

/** Pill CTA with the arrow nested in its own island, flush to the right edge. */
export function PillLink({
  href,
  children,
  variant = 'ink',
  className,
  external,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  external?: boolean
}) {
  const s = styles[variant]
  const cls = clsx(
    'group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[15px] font-medium tracking-[-0.01em]',
    'transition-all duration-500 ease-[var(--ease-spring)] active:scale-[0.98]',
    s.btn,
    className,
  )
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={clsx(
          'flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)]',
          'group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105',
          s.dot,
        )}
      >
        <ArrowUpRight size={16} weight="light" />
      </span>
    </>
  )
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
