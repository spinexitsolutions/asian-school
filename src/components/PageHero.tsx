import { Title } from './Title'

/** Hero used on inner pages: index label, giant serif title, optional lede. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string | null
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 sm:pt-48 md:pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-gold-soft/60 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <Title text={title} as="h1" split className="t-1 mt-8 max-w-[14ch] text-ink" />
        {intro && (
          <p className="lede mt-8 max-w-2xl" data-reveal style={{ ['--d' as string]: '300ms' }}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
