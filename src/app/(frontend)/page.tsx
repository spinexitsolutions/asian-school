import Link from 'next/link'
import { ArrowUpRight, Quotes, Phone } from '@phosphor-icons/react/dist/ssr'

import { CountUp } from '@/components/CountUp'
import { Frame } from '@/components/Frame'
import { Icon } from '@/components/Icon'
import { PillLink } from '@/components/PillLink'
import { Section, SectionHead } from '@/components/Section'
import { Testimonials } from '@/components/Testimonials'
import { Title } from '@/components/Title'
import { defaultTestimonials } from '@/content/defaults'
import { getAcademics, getAlbums, getHome, getNews, getPinnedNotices, getSettings, getTestimonials, getToppers } from '@/lib/data'
import { formatDate, telHref } from '@/lib/format'
import type { Media } from '@/payload-types'

export default async function HomePage() {
  const [s, h, academics, notices, toppers, albums, news, testimonials] = await Promise.all([
    getSettings(),
    getHome(),
    getAcademics(),
    getPinnedNotices(),
    getToppers(true),
    getAlbums(4),
    getNews({ limit: 3 }),
    getTestimonials(),
  ])
  const heroImages = (h.heroImages ?? []) as Media[]
  const quotes = testimonials.docs.length ? testimonials.docs : defaultTestimonials

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:min-h-[100dvh] lg:pb-28">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute -right-32 top-0 h-[640px] w-[640px] rounded-full bg-gold-soft/70 blur-[140px]" aria-hidden />

        <div className="relative mx-auto grid max-w-[1280px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 lg:pt-10">
            <p className="eyebrow" data-reveal>
              {h.heroEyebrow}
            </p>
            <Title as="h1" text={h.heroTitle!} split className="t-hero mt-8 text-ink" />
            <p className="lede mt-10 max-w-[34rem]" data-reveal style={{ ['--d' as string]: '450ms' }}>
              {h.heroText}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal style={{ ['--d' as string]: '600ms' }}>
              <PillLink href="/admissions">Apply for admission</PillLink>
              <PillLink href="/contact" variant="ghost">
                Book a campus visit
              </PillLink>
            </div>
            <dl className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-[13px] text-mute" data-reveal style={{ ['--d' as string]: '750ms' }}>
              {['Nursery – Class XII', 'English medium', 'Co-educational'].map((x) => (
                <div key={x} className="flex items-center gap-2">
                  <span className="h-px w-5 bg-gold" /> {x}
                </div>
              ))}
            </dl>
          </div>

          {/* Z-axis cascade of arch frames */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px]" data-reveal="scale" style={{ ['--d' as string]: '200ms' }}>
              <div className="shell arch h-full !p-2">
                <Frame media={heroImages[0]} label="Campus" priority className="arch h-full w-full" sizes="(min-width:1024px) 40vw, 90vw" />
              </div>
              <div
                className="absolute -left-6 bottom-10 hidden w-40 animate-float md:block lg:-left-16"
                style={{ ['--r' as string]: '-4deg' }}
              >
                <div className="shell !rounded-[1.4rem] bg-white/70 !p-1.5 backdrop-blur-sm">
                  <Frame media={heroImages[1]} label="Classrooms" className="aspect-[4/5] rounded-[1.1rem]" tone="ink" sizes="160px" />
                </div>
              </div>
              <div
                className="absolute -right-4 top-10 hidden w-36 animate-float md:block lg:-right-10"
                style={{ ['--r' as string]: '5deg', animationDelay: '-3s' }}
              >
                <div className="shell !rounded-[1.4rem] bg-white/70 !p-1.5 backdrop-blur-sm">
                  <Frame media={heroImages[2]} label="Sports" className="aspect-square rounded-[1.1rem]" sizes="150px" />
                </div>
              </div>
              <div className="absolute -bottom-6 right-4 rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-lift)] ring-1 ring-ink/[0.05] sm:right-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">Admissions</p>
                <p className="mt-1 font-display text-xl tracking-[-0.02em]">
                  Now <em className="text-gold">open</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Notice ticker ───────────── */}
      {notices.docs.length > 0 && (
        <div className="relative border-y border-line bg-bone">
          <div className="mx-auto flex max-w-[1280px] items-stretch">
            <Link
              href="/notices"
              className="relative z-10 flex shrink-0 items-center gap-2 bg-bone py-4 pl-5 pr-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-gold sm:pl-8"
            >
              Notices <ArrowUpRight size={12} weight="light" />
            </Link>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[0, 1].map((dup) => (
                  <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                    {notices.docs.map((n) => (
                      <li key={n.id} className="flex items-center gap-4 whitespace-nowrap py-4 pr-12 text-[14px] text-ink-2">
                        <span className="font-mono text-[11px] text-mute">{formatDate(n.date, { year: undefined })}</span>
                        {n.title}
                        <span className="text-gold-2">✦</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────── Numbers ───────────── */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {(h.stats ?? []).map((stat, i) => (
            <div
              key={i}
              className="border-line py-12 pr-4 md:py-16 [&:nth-child(odd)]:border-r lg:border-r lg:pl-8 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 [&:nth-child(even)]:pl-6"
              data-reveal
              style={{ ['--d' as string]: `${i * 90}ms` }}
            >
              <p className="display text-[clamp(2.6rem,5vw,4.5rem)] text-ink">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-3 text-[14px] text-mute">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Introduction ───────────── */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4" data-reveal>
                <span className="index-num">(01)</span>
                <span className="eyebrow">Who we are</span>
              </div>
              <Title text={h.introTitle!} split className="t-2 mt-6 text-ink" />
              <p className="lede mt-8" data-reveal>
                {h.introText}
              </p>
              <div className="mt-10" data-reveal>
                <PillLink href="/about" variant="ghost">
                  Our story
                </PillLink>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="shell arch !p-2" data-reveal="scale">
              <Frame media={h.introImage} label="Life at school" className="arch aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── Pillars bento ───────────── */}
      <Section tone="bone">
        <SectionHead
          index="02"
          eyebrow="The Asian School way"
          title="Six promises we keep to *every* child."
          text="A balanced education that grows the mind, the body and the heart — together."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {(h.pillars ?? []).map((p, i) => {
            const feature = i === 0
            return (
              <article
                key={i}
                data-reveal
                style={{ ['--d' as string]: `${(i % 3) * 100}ms` }}
                className={feature ? 'md:col-span-4 md:row-span-2' : i < 3 ? 'md:col-span-2' : 'md:col-span-2'}
              >
                <div className={feature ? 'shell shell--dark h-full bg-ink' : 'shell h-full'}>
                  <div
                    className={
                      feature
                        ? 'core core--dark relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden p-8 text-white md:p-12'
                        : 'core flex h-full flex-col justify-between gap-10 p-7'
                    }
                  >
                    {feature && (
                      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/25 blur-[90px]" />
                    )}
                    <div
                      className={
                        feature
                          ? 'flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-gold-2 ring-1 ring-white/15'
                          : 'flex h-12 w-12 items-center justify-center rounded-full bg-bone text-gold ring-1 ring-line'
                      }
                    >
                      <Icon name={p.icon} size={feature ? 28 : 24} />
                    </div>
                    <div className="relative">
                      <span className={feature ? 'index-num text-white/40' : 'index-num'}>0{i + 1}</span>
                      <h3 className={feature ? 'display mt-3 text-[clamp(2rem,3.4vw,3.2rem)] text-white' : 'display t-3 mt-3'}>
                        {p.title}
                      </h3>
                      <p className={feature ? 'mt-5 max-w-md text-[17px] leading-relaxed text-white/70' : 'mt-3 text-[15px] leading-relaxed text-ink-2'}>
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Section>

      {/* ───────────── Academic journey ───────────── */}
      <Section>
        <SectionHead
          index="03"
          eyebrow="Academics"
          title="A journey from *first words* to final exams."
          aside={
            <PillLink href="/academics" variant="ghost">
              Explore academics
            </PillLink>
          }
        />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <span className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 lg:block" />
          {(academics.stages ?? []).map((stage, i) => (
            <li key={i} data-reveal style={{ ['--d' as string]: `${i * 110}ms` }} className="group relative">
              <div className="relative z-10 mb-8 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white font-display text-2xl text-gold ring-1 ring-line transition-all duration-700 ease-[var(--ease-spring)] group-hover:bg-ink group-hover:text-gold-2">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{stage.classes}</p>
              <h3 className="display t-3 mt-3">{stage.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{stage.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ───────────── Principal's message ───────────── */}
      <Section tone="ink" className="overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-gold/15 blur-[140px]" />
        <div className="relative grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal="scale">
            <div className="shell shell--dark arch mx-auto max-w-[360px] !p-2">
              <Frame media={h.principalPhoto} label="Principal" tone="ink" className="arch aspect-[3/4] w-full" sizes="360px" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-center gap-4" data-reveal>
              <span className="index-num text-white/40">(04)</span>
              <span className="eyebrow eyebrow--dark">From the Principal’s desk</span>
            </div>
            <div className="mt-10 text-gold-2" data-reveal>
              <Quotes size={56} weight="light" />
            </div>
            <blockquote className="display mt-6 text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.2] text-white" data-reveal>
              {h.principalMessage}
            </blockquote>
            <div className="mt-10 flex items-center gap-4" data-reveal>
              <span className="h-px w-12 bg-gold-2" />
              <div>
                <p className="font-display text-xl">{h.principalName}</p>
                <p className="text-[13px] text-white/55">{h.principalRole}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── Achievers ───────────── */}
      {toppers.docs.length > 0 && (
        <Section>
          <SectionHead
            index="05"
            eyebrow="Hall of fame"
            title="Our *achievers* make us proud."
            aside={
              <PillLink href="/achievers" variant="ghost">
                All achievers
              </PillLink>
            }
          />
          <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
            {toppers.docs.map((t, i) => (
              <article
                key={t.id}
                className="shell w-[240px] shrink-0 snap-start sm:w-[260px]"
                data-reveal
                style={{ ['--d' as string]: `${Math.min(i, 5) * 80}ms` }}
              >
                <div className="core overflow-hidden">
                  <Frame media={t.photo} label={t.year} size="card" className="aspect-[4/5] rounded-t-[calc(2rem-6px)]" sizes="260px" />
                  <div className="p-5">
                    <p className="display text-[2.2rem] text-gold">{t.score}</p>
                    <p className="mt-2 font-medium">{t.name}</p>
                    <p className="text-[13px] text-mute">
                      {t.className} · {t.year}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* ───────────── Gallery preview ───────────── */}
      <Section tone="bone">
        <SectionHead
          index="06"
          eyebrow="Life at school"
          title="Moments that *stay* with us."
          aside={
            <PillLink href="/gallery" variant="ghost">
              Open gallery
            </PillLink>
          }
        />
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const album = albums.docs[i]
            const cover = album ? ((album.cover as Media) ?? (album.photos?.[0] as Media)) : null
            const spans = ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-1']
            const labels = ['Annual day', 'Sports meet', 'Science fair', 'Celebrations']
            const content = (
              <Frame
                media={cover}
                label={album?.title ?? labels[i]}
                size="card"
                tone={i % 2 ? 'ink' : 'warm'}
                className="h-full w-full rounded-[1.5rem] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                sizes="(min-width:768px) 33vw, 50vw"
              />
            )
            return (
              <div key={i} className={`group relative overflow-hidden rounded-[1.5rem] ${spans[i]}`} data-reveal="scale" style={{ ['--d' as string]: `${i * 80}ms` }}>
                {album ? (
                  <Link href={`/gallery/${album.slug}`} className="block h-full">
                    {content}
                    <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/85 px-4 py-2 text-[13px] font-medium text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                      {album.title}
                    </span>
                  </Link>
                ) : (
                  <Link href="/gallery" className="block h-full">
                    {content}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ───────────── News ───────────── */}
      {news.docs.length > 0 && (
        <Section>
          <SectionHead
            index="07"
            eyebrow="News & events"
            title="What’s happening on *campus*."
            aside={
              <PillLink href="/news" variant="ghost">
                All news
              </PillLink>
            }
          />
          <div className="grid gap-5 md:grid-cols-3">
            {news.docs.map((n, i) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="group block" data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
                <div className="shell h-full">
                  <div className="core h-full overflow-hidden">
                    <div className="overflow-hidden rounded-t-[calc(2rem-6px)]">
                      <Frame
                        media={n.cover}
                        label={n.category}
                        size="card"
                        className="aspect-[16/11] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                        sizes="(min-width:768px) 33vw, 100vw"
                      />
                    </div>
                    <div className="p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                        {n.category} · {formatDate(n.date)}
                      </p>
                      <h3 className="display t-3 mt-3 transition-colors group-hover:text-gold">{n.title}</h3>
                      {n.excerpt && <p className="mt-3 line-clamp-2 text-[15px] text-ink-2">{n.excerpt}</p>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ───────────── Testimonials ───────────── */}
      <Section tone={news.docs.length > 0 ? 'bone' : 'paper'}>
        <SectionHead index="08" eyebrow="Voices" title="Words from our *families*." />
        <Testimonials items={quotes.map((q) => ({ quote: q.quote, name: q.name, relation: q.relation ?? '' }))} />
      </Section>

      {/* ───────────── CTA ───────────── */}
      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-24 text-white sm:px-12 md:py-32">
          <div className="pointer-events-none absolute -right-20 -top-32 h-[560px] w-[560px] rounded-full bg-gold/25 blur-[130px]" />
          <svg className="pointer-events-none absolute -bottom-10 right-[-6%] hidden h-[115%] text-white/[0.05] md:block" viewBox="0 0 200 260" aria-hidden>
            <path d="M10 260V110C10 50 50 10 100 10s90 40 90 100v150" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M30 260V115c0-48 31-82 70-82s70 34 70 82v145" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M50 260V120c0-36 22-62 50-62s50 26 50 62v140" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="relative mx-auto max-w-[1180px]">
            <span className="eyebrow eyebrow--dark" data-reveal>
              Admissions open
            </span>
            <Title text={h.ctaTitle!} split className="t-1 mt-8 max-w-[16ch] text-white" />
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/70" data-reveal>
              {h.ctaText}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4" data-reveal>
              <PillLink href="/admissions" variant="gold">
                Start your enquiry
              </PillLink>
              {s.phone && (
                <a href={telHref(s.phone)} className="inline-flex items-center gap-3 rounded-full px-5 py-3 text-white/80 ring-1 ring-white/15 transition-colors hover:text-white hover:ring-white/30">
                  <Phone size={18} weight="light" /> {s.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
