import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export function Announcement({ text, href }: { text: string; href?: string | null }) {
  const content = (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-2" />
      {text}
      {href && <ArrowRight size={13} weight="light" className="transition-transform duration-500 group-hover:translate-x-1" />}
    </span>
  )
  return (
    <div className="relative z-40 bg-ink px-4 py-2.5 text-center text-[12.5px] tracking-[0.01em] text-white/85">
      {href ? (
        <Link href={href} className="group hover:text-white">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}
