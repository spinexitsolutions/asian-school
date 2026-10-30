import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarBlank, CheckCircle, FilePdf, Quotes } from '@phosphor-icons/react/dist/ssr'

import { CountUp } from '@/components/CountUp'
import { Faq } from '@/components/Faq'
import { Hero } from '@/components/Hero'
import { Icon } from '@/components/Icon'
import { NoticeBoard } from '@/components/NoticeBoard'
import { Photo } from '@/components/Photo'
import { QuickLinks } from '@/components/QuickLinks'
import { SectionHeading } from '@/components/SectionHeading'
import { Paragraphs } from '@/components/Stars'
import { Testimonials } from '@/components/Testimonials'
import { defaultFacilities, defaultHeroToppers, defaultTestimonials, fallbackImages } from '@/content/defaults'
import { getAdmissions, getAlbums, getFacilities, getHome, getNews, getNotices, getSettings, getTestimonials, getToppers } from '@/lib/data'
import { formatDate, telHref } from '@/lib/format'
import { fileUrl, img } from '@/lib/media'
import type { Media } from '@/cms/types'

export default async function HomePage() {
  const [s, h, admissions, notices, news, toppers, facilities, albums, testimonials] = await Promise.all([
    getSettings(),
    getHome(),
    getAdmissions(),
    getNotices(20),
    getNews({ limit: 4 }),
    getToppers(),
    getFacilities(),
    getAlbums(8),
    getTestimonials(),
  ])

  const logoUrl = img(s.logo)?.url ?? fallbackImages.logo
  const featuredToppers = toppers.docs.filter((t) => t.featured)
  const heroToppers = toppers.docs
    .filter((t) => t.inHero)
    .slice(0, 3)
    .map((t) => ({ name: t.name, score: t.score, className: t.className, photo: img(t.photo as Media, 'card')?.url }))

  const facilityCards = facilities.docs.length
    ? facilities.docs.map((f) => ({ title: f.title, summary: f.summary, icon: f.icon, image: f.image as Media | null }))
    : defaultFacilities.map((f) => ({ ...f, image: ('image' in f ? f.image : null) as Media | null }))

  const photos = albums.docs.flatMap((a) => ((a.photos ?? []) as Media[]).slice(0, 3).map((p) => ({ photo: p, album: a })))
  const quotes = testimonials.docs.length ? testimonials.docs : defaultTestimonials
  const calendarImage = img(h.calendarImage as Media)
  const calendarPdf = fileUrl(h.calendarFile)
  const years = new Date().getFullYear() - Number(s.established || 2010)

  return (
    <>
      <Hero
        schoolName={s.schoolName}
        logoUrl={logoUrl}
        established={s.established}
        title={h.heroTitle!}
        points={(h.heroPoints ?? []).map((p) => p.text)}
        stats={h.stats ?? []}
        toppers={heroToppers.length ? heroToppers : defaultHeroToppers}
        placeholder={heroToppers.length === 0}
        resultsYear={h.resultsYear}
        backgroundUrl={img(h.heroImage as Media)?.url ?? fallbackImages.campus}
      />
      <div className="pt-6 md:pt-8">
        <QuickLinks />
      </div>

      {/* ───────────── About ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative" data-reveal="left">
            <div className="absolute -left-4 -top-4 h-40 w-40 rounded-3xl bg-flame-100 sm:-left-6 sm:-top-6" aria-hidden />
            <div className="dots-bg absolute -bottom-6 -right-2 h-40 w-48 rounded-3xl sm:-right-6" aria-hidden />
            <Photo
              media={h.aboutImage as Media}
              fallback={fallbackImages.campus}
              alt="School building"
              className="relative aspect-[4/3.4] rounded-[2rem] shadow-[var(--shadow-lift)]"
            />
            <div className="absolute -bottom-8 left-6 flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 shadow-[var(--shadow-lift)] ring-1 ring-line sm:left-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-laurel-600 font-heading text-xl font-bold text-white">
                {years}+
              </span>
              <div>
                <p className="font-heading text-[15px] font-semibold leading-tight">Years of Excellence</p>
                <p className="text-[12.5px] text-mute">Since {s.established || '2010'}</p>
              </div>
            </div>
          </div>
          <div className="pt-6 lg:pt-0">
            <SectionHeading align="left" label="About Our School" title={h.aboutTitle!} className="!mb-6" />
            <div className="space-y-4 text-[16px] leading-relaxed text-ink-2" data-reveal>
              <Paragraphs text={h.aboutText} />
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2" data-reveal>
              {['CBSE Affiliated', 'Nursery to Class XII', 'Science, Arts & Commerce', 'Smart Classrooms'].map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                  <CheckCircle size={22} weight="fill" className="text-leaf-500" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <Link href="/about" className="btn btn-primary">
                Learn More <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Visit Campus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Numbers ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-16 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-flame-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-laurel-500/25 blur-3xl" />
        <div className="container-x relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {(h.stats ?? []).map((st, i) => (
            <div
              key={st.label}
              className="text-center lg:border-r lg:border-white/15 lg:last:border-r-0"
              data-reveal
              style={{ ['--d' as string]: `${i * 90}ms` }}
            >
              <p className="font-heading text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold leading-none">
                <CountUp value={st.value} />
              </p>
              <p className="mt-3 text-[14px] font-medium uppercase tracking-[0.12em] text-white/75">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Why choose us ───────────── */}
      <section className="bg-soft py-20 md:py-28">
        <div className="container-x">
          <SectionHeading label="Why Choose Us" title={h.whyTitle!} text={h.whyText} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(h.pillars ?? []).map((p, i) => {
              const tones = ['bg-brand-600', 'bg-laurel-600', 'bg-flame-500', 'bg-leaf-600']
              return (
                <article
                  key={p.title}
                  className="card card-hover group relative overflow-hidden p-7"
                  data-reveal
                  style={{ ['--d' as string]: `${(i % 3) * 90}ms` }}
                >
                  <span className="absolute right-6 top-6 font-heading text-5xl font-bold text-brand-50 transition-colors duration-500 group-hover:text-brand-100">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${tones[i % tones.length]} text-white shadow-lg transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:rotate-[-6deg]`}
                  >
                    <Icon name={p.icon} size={28} />
                  </span>
                  <h3 className="heading-md relative mt-6">{p.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-ink-2">{p.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────────── Director's message ───────────── */}
      <section className="py-20 md:py-28" id="message">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-md lg:col-span-5" data-reveal="left">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-brand-600" aria-hidden />
            <Photo
              media={h.messagePhoto as Media}
              fallback={fallbackImages.director}
              alt={h.messageName ?? ''}
              className="relative aspect-[4/5] rounded-[2rem]"
              sizes="(min-width:1024px) 420px, 90vw"
            />
            <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-5 py-4 text-center shadow-[var(--shadow-lift)] ring-1 ring-line">
              <p className="font-heading text-[17px] font-bold text-brand-800">{h.messageName}</p>
              <p className="text-[13px] text-mute">{h.messageRole}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading align="left" label={h.messageHeading ?? 'Message'} title="A Message from Our *Director*" className="!mb-6" />
            <div className="text-flame-400" data-reveal>
              <Quotes size={52} weight="fill" />
            </div>
            <div className="mt-3 space-y-4 text-[16px] leading-relaxed text-ink-2" data-reveal>
              <Paragraphs text={h.messageText} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Notice board + Activities ───────────── */}
      <section className="bg-soft py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            label="Stay Updated"
            title="Notices & *Activities*"
            text="Important announcements, events and happenings at The Asian International School."
          />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5" data-reveal>
              <NoticeBoard
                notices={notices.docs.map((n) => ({
                  id: String(n.id),
                  title: n.title,
                  date: n.date,
                  category: n.category,
                  details: n.details,
                  fileUrl: fileUrl(n.attachment),
                }))}
              />
            </div>
            <div className="min-w-0 lg:col-span-7" data-reveal style={{ ['--d' as string]: '120ms' }}>
              <div className="card flex h-full flex-col overflow-hidden">
                <div className="flex items-center justify-between bg-laurel-600 px-6 py-4 text-white">
                  <h3 className="text-[19px] font-bold">News & Activities</h3>
                  <Link href="/news" className="inline-flex items-center gap-1 text-[13px] font-semibold text-white/85 hover:text-white">
                    View all <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
                {news.docs.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                    <Photo fallback={fallbackImages.campus} className="aspect-[16/8] w-full rounded-2xl" />
                    <p className="text-[14px] text-mute">School activities and events will appear here.</p>
                  </div>
                ) : (
                  <div className="grid flex-1 gap-5 p-5 sm:grid-cols-2">
                    {news.docs.map((n, i) => (
                      <Link key={n.id} href={`/news/${n.slug}`} className={`group block ${i === 0 ? 'sm:col-span-2' : ''}`}>
                        <Photo
                          media={n.cover as Media}
                          size="card"
                          label={n.category}
                          className={`rounded-2xl ${i === 0 ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}
                          imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                        />
                        <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-laurel-600">
                          <CalendarBlank size={14} weight="bold" /> {formatDate(n.date)} · {n.category}
                        </p>
                        <h4 className="mt-1.5 font-heading text-[17px] font-semibold leading-snug group-hover:text-brand-600">{n.title}</h4>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Achievers ───────────── */}
      {featuredToppers.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-20 text-white md:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60%] -translate-x-1/2 rounded-full bg-flame-400/20 blur-3xl" />
          <div className="container-x relative">
            <SectionHeading
              light
              label="Achievements & Awards"
              title="Our *Shining Stars*"
              text="Students who made the school proud with their hard work and dedication."
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {featuredToppers.slice(0, 10).map((t, i) => (
                <article key={t.id} className="text-center" data-reveal style={{ ['--d' as string]: `${(i % 5) * 80}ms` }}>
                  <div className="relative mx-auto w-[78%]">
                    <div className="absolute -inset-1.5 rounded-full bg-[conic-gradient(var(--color-flame-400),var(--color-laurel-500),var(--color-flame-400))]" />
                    <Photo media={t.photo as Media} size="thumb" label="Photo" className="relative aspect-square rounded-full ring-4 ring-brand-900" sizes="200px" />
                  </div>
                  <p className="mt-5 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-bold text-flame-400">{t.score}</p>
                  <p className="mx-auto mt-1 w-max max-w-full truncate rounded-full bg-white px-3 py-1 text-[12.5px] font-bold uppercase text-brand-900">
                    {t.name}
                  </p>
                  <p className="mt-2 text-[12.5px] text-white/70">
                    {t.className} · {t.year}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/achievers" className="btn btn-gold">
                View All Achievements <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Facilities ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            label="School Facilities"
            title="Modern Infrastructure for *Better Learning*"
            text="State-of-the-art facilities that support academic excellence, innovation and the overall development of every student."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facilityCards.slice(0, 8).map((f, i) => (
              <article
                key={f.title}
                className="card card-hover group overflow-hidden"
                data-reveal
                style={{ ['--d' as string]: `${(i % 4) * 80}ms` }}
              >
                {f.image ? (
                  <Photo
                    media={f.image}
                    size="card"
                    className="aspect-[16/11]"
                    imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    sizes="(min-width:1024px) 25vw, 50vw"
                  />
                ) : (
                  <div className="dots-bg flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-50 to-white">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-[var(--shadow-card)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
                      <Icon name={f.icon} size={32} />
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="heading-md">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{f.summary}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center" data-reveal>
            <Link href="/facilities" className="btn btn-primary">
              View All Facilities <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Gallery ───────────── */}
      {photos.length > 0 && (
        <section className="bg-soft py-20 md:py-28">
          <div className="container-x">
            <SectionHeading label="School Gallery" title="Moments That Define *Our Journey*" />
            <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
              {photos.slice(0, 8).map(({ photo, album }, i) => (
                <Link
                  key={`${album.id}-${i}`}
                  href={`/gallery/${album.slug}`}
                  className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  data-reveal="zoom"
                  style={{ ['--d' as string]: `${(i % 4) * 70}ms` }}
                >
                  <Photo
                    media={photo}
                    size="card"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                    sizes="(min-width:768px) 25vw, 50vw"
                  />
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-950/75 via-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-[14px] font-semibold text-white">{album.title}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/gallery" className="btn btn-primary">
                View Full Gallery <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Testimonials ───────────── */}
      <section className={photos.length > 0 ? 'py-20 md:py-28' : 'bg-soft py-20 md:py-28'}>
        <div className="container-x">
          <SectionHeading label="Testimonials" title="What *Parents* Say About Us" />
          <Testimonials items={quotes.map((q) => ({ quote: q.quote, name: q.name, relation: q.relation }))} />
        </div>
      </section>

      {/* ───────────── Calendar + FAQ ───────────── */}
      <section className={photos.length > 0 ? 'bg-soft py-20 md:py-28' : 'py-20 md:py-28'}>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              label="School Calendar"
              title="Plan Ahead With Our *Calendar*"
              text="Important dates, examinations, holidays and celebrations for every month."
              className="!mb-8"
            />
            {calendarImage ? (
              <a href={calendarImage.url} target="_blank" rel="noreferrer" className="card card-hover block overflow-hidden p-2" data-reveal>
                <Image
                  src={calendarImage.url}
                  alt={calendarImage.alt || 'School calendar'}
                  width={calendarImage.width}
                  height={calendarImage.height}
                  className="h-auto w-full rounded-2xl"
                />
              </a>
            ) : (
              <div className="card flex items-center gap-5 p-6" data-reveal>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-laurel-600 text-white">
                  <CalendarBlank size={32} weight="duotone" />
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold">Academic Session {admissions.session}</p>
                  <p className="text-[14px] text-mute">The monthly calendar will be published here.</p>
                </div>
              </div>
            )}
            {calendarPdf && (
              <a href={calendarPdf} target="_blank" rel="noreferrer" className="btn btn-red mt-6">
                <FilePdf size={18} weight="fill" /> Download Full Calendar
              </a>
            )}
          </div>
          <div className="lg:col-span-7">
            <SectionHeading align="left" label="FAQ" title="Frequently Asked *Questions*" className="!mb-8" />
            <Faq items={admissions.faqs ?? []} />
          </div>
        </div>
      </section>

      {/* ───────────── Admission CTA ───────────── */}
      <section className="pb-20 pt-4 md:pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-700 px-6 py-14 text-white sm:px-12 md:py-16" data-reveal="zoom">
            <Image src={fallbackImages.campus} alt="" fill sizes="100vw" className="object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-800 via-brand-700/95 to-brand-600/70" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-flame-400/30 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="label-pill label-pill--light">Admissions Open {admissions.session}</span>
                <h2 className="heading-lg mt-5 max-w-2xl">{h.ctaTitle}</h2>
                <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-white/80">{h.ctaText}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
                <Link href="/admissions#enquiry" className="btn btn-gold !py-4">
                  Apply For Admission <ArrowRight size={16} weight="bold" />
                </Link>
                {s.phone && (
                  <a href={telHref(s.phone)} className="btn btn-glass !py-4">
                    Call {s.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
