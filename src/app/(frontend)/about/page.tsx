import Link from 'next/link'
import { ArrowRight, Eye, Quotes, Target } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { SectionHeading } from '@/components/SectionHeading'
import { Paragraphs } from '@/components/Stars'
import { fallbackImages } from '@/content/defaults'
import { block } from '@/cms/blocks'
import { isHidden } from '@/components/nav-links'
import { getAbout, getHiddenPaths, getHome, getPage } from '@/lib/data'
import type { Media } from '@/cms/types'

export const metadata = { title: 'About Us' }

export default async function AboutPage() {
  const [page, a, h, hidden] = await Promise.all([getPage('about'), getAbout(), getHome(), getHiddenPaths()])
  const [story, vision, values, journey, message, leaders, visit] = ['story', 'vision', 'values', 'journey', 'message', 'leaders', 'visit'].map((k) =>
    block(a, 'about-page', k),
  )

  return (
    <>
      <PageBanner title={page.title} intro={page.intro} />

      {/* Story */}
      {story.show && (
        <section className="py-20 md:py-28">
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            <div className="relative" data-reveal="left">
              <div className="absolute -left-4 -top-4 h-40 w-40 rounded-3xl bg-flame-100" aria-hidden />
              <Photo
                media={a.heroImage as Media}
                fallback={fallbackImages.campus}
                alt="School campus"
                className="relative aspect-[4/3.3] rounded-[2rem] shadow-[var(--shadow-lift)]"
              />
            </div>
            <div>
              <SectionHeading align="left" label={story.label} title={story.title} className="!mb-6" />
              <div className="space-y-4 text-[16px] leading-relaxed text-ink-2" data-reveal>
                <Paragraphs text={a.story} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vision & mission */}
      {vision.show && (
        <section className="bg-soft py-20 md:py-24">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {[
              { title: 'Our Vision', text: a.vision, Icon: Eye, tone: 'bg-brand-600' },
              { title: 'Our Mission', text: a.mission, Icon: Target, tone: 'bg-laurel-600' },
            ].map(({ title, text, Icon, tone }, i) => (
              <article key={title} className="card card-hover relative overflow-hidden p-8 md:p-10" data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tone} text-white shadow-lg`}>
                  <Icon size={32} weight="duotone" />
                </span>
                <h2 className="heading-md mt-6 !text-2xl">{title}</h2>
                <p className="mt-3 text-[16.5px] leading-relaxed text-ink-2">{text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Values */}
      {values.show && (a.values ?? []).length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container-x">
            <SectionHeading label={values.label} title={values.title} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(a.values ?? []).map((v, i) => (
                <article key={v.title} className="card card-hover p-7 text-center" data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 font-heading text-xl font-bold text-brand-600 ring-1 ring-brand-100">
                    {v.title.charAt(0)}
                  </span>
                  <h3 className="heading-md mt-5">{v.title}</h3>
                  {v.text && <p className="mt-2 text-[15px] text-ink-2">{v.text}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Journey */}
      {journey.show && (a.timeline ?? []).length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-700 py-20 text-white md:py-28">
          <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-flame-400/20 blur-3xl" />
          <div className="container-x relative">
            <SectionHeading light label={journey.label} title={journey.title} />
            <ol className="relative grid gap-8 md:grid-cols-4">
              <span className="absolute left-0 right-0 top-7 hidden h-[2px] bg-white/15 md:block" aria-hidden />
              {(a.timeline ?? []).map((t, i) => (
                <li key={i} className="relative" data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-flame-400 font-heading text-[13px] font-bold text-brand-950 ring-8 ring-brand-700">
                    {i + 1}
                  </span>
                  <p className="mt-5 font-heading text-2xl font-bold text-flame-400">{t.year}</p>
                  <h3 className="mt-1 text-[18px] font-semibold">{t.title}</h3>
                  {t.text && <p className="mt-2 text-[15px] text-white/70">{t.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Director's message */}
      {message.show && (
        <section className="py-20 md:py-28" id="message">
          <div className="container-x grid items-center gap-16 lg:grid-cols-12">
            <div className="relative mx-auto w-full max-w-md lg:col-span-5" data-reveal="left">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-brand-600" aria-hidden />
              <Photo
                media={h.messagePhoto as Media}
                fallback={fallbackImages.director}
                alt={h.messageName ?? ''}
                className="relative aspect-[4/5] rounded-[2rem]"
                sizes="420px"
              />
              <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-5 py-4 text-center shadow-[var(--shadow-lift)] ring-1 ring-line">
                <p className="font-heading text-[17px] font-bold text-brand-800">{h.messageName}</p>
                <p className="text-[13px] text-mute">{h.messageRole}</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading align="left" label={message.label} title={message.title} className="!mb-6" />
              <div className="text-flame-400" data-reveal>
                <Quotes size={52} weight="fill" />
              </div>
              <div className="mt-3 space-y-4 text-[16px] leading-relaxed text-ink-2" data-reveal>
                <Paragraphs text={h.messageText} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leadership (only when more than the director is listed) */}
      {leaders.show && (a.leaders ?? []).length > 1 && (
        <section className="bg-soft py-20 md:py-28">
          <div className="container-x">
            <SectionHeading label={leaders.label} title={leaders.title} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(a.leaders ?? []).map((l, i) => (
                <article key={l.name} className="card card-hover overflow-hidden" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                  <Photo
                    media={(l as { photo?: Media | null }).photo}
                    size="card"
                    label={l.role}
                    className="aspect-[4/3.6]"
                    sizes="(min-width:1024px) 33vw, 100vw"
                  />
                  <div className="p-6">
                    <h3 className="heading-md">{l.name}</h3>
                    <p className="text-[14px] font-semibold text-laurel-600">{l.role}</p>
                    {l.message && <p className="mt-3 text-[15px] leading-relaxed text-ink-2">“{l.message}”</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {visit.show && (
        <section className="pb-20">
          <div className="container-x">
            <div
              className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-brand-50 p-8 ring-1 ring-brand-100 md:flex-row md:items-center md:p-10"
              data-reveal
            >
              <div>
                <h2 className="heading-md !text-2xl">{visit.title}</h2>
                {visit.text && <p className="mt-1 text-ink-2">{visit.text}</p>}
              </div>
              <div className="flex flex-wrap gap-3">
                {!isHidden('/admissions', hidden) && (
                  <Link href="/admissions" className="btn btn-red">
                    Apply Now <ArrowRight size={16} weight="bold" />
                  </Link>
                )}
                {!isHidden('/contact', hidden) && (
                  <Link href="/contact" className="btn btn-outline">
                    Contact Us
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
