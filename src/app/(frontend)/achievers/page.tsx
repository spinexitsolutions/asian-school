import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { getToppers } from '@/lib/data'
import type { Media, Topper } from '@/payload-types'

export const metadata = { title: 'Achievements' }

export default async function AchieversPage() {
  const { docs } = await getToppers()
  const byYear = docs.reduce<Record<string, Topper[]>>((acc, t) => {
    ;(acc[t.year] ??= []).push(t)
    return acc
  }, {})
  const years = Object.keys(byYear).sort().reverse()

  return (
    <>
      <PageBanner title="Achievements" intro="Our toppers and award winners — the pride of The Asian International School." />
      <section className="py-16 md:py-24">
        <div className="container-x space-y-16">
          {years.length === 0 && <p className="card mx-auto max-w-xl p-10 text-center text-mute">Results and achievements will be published soon.</p>}
          {years.map((year) => (
            <div key={year}>
              <div className="mb-8 flex items-center gap-4" data-reveal>
                <span className="rounded-full bg-flame-400 px-4 py-1.5 font-heading text-[15px] font-bold text-brand-950">{year}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {byYear[year].map((t, i) => (
                  <article key={t.id} className="card card-hover p-5 text-center" data-reveal style={{ ['--d' as string]: `${(i % 5) * 60}ms` }}>
                    <div className="relative mx-auto w-[80%]">
                      <div className="absolute -inset-1 rounded-full bg-[conic-gradient(var(--color-flame-400),var(--color-laurel-500),var(--color-flame-400))]" />
                      <Photo media={t.photo as Media} size="thumb" label="Photo" className="relative aspect-square rounded-full ring-4 ring-white" imgClassName="object-top" sizes="200px" />
                    </div>
                    <p className="mt-4 font-heading text-2xl font-bold text-brand-600">{t.score}</p>
                    <p className="mt-1 font-semibold">{t.name}</p>
                    <p className="text-[13px] text-mute">{t.className}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
