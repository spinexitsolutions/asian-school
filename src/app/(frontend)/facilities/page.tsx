import { CheckCircle } from '@phosphor-icons/react/dist/ssr'

import { Icon } from '@/components/Icon'
import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { defaultFacilities } from '@/content/defaults'
import { getFacilities } from '@/lib/data'
import type { Media } from '@/cms/types'

export const metadata = { title: 'Facilities' }

export default async function FacilitiesPage() {
  const res = await getFacilities()
  const items = res.docs.length
    ? res.docs.map((f) => ({ title: f.title, summary: f.summary, icon: f.icon, image: f.image as Media | null, points: (f.points ?? []).map((p) => p.text) }))
    : defaultFacilities.map((f) => ({ ...f, image: null }))

  return (
    <>
      <PageBanner title="Campus & Facilities" intro="Modern infrastructure that supports academic excellence, safety and the all-round development of every child." />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {items.map((f, i) => (
            <article key={f.title} className="card card-hover group grid overflow-hidden sm:grid-cols-5" data-reveal style={{ ['--d' as string]: `${(i % 2) * 100}ms` }}>
              <div className="relative sm:col-span-2">
                {f.image ? (
                  <Photo media={f.image} size="card" className="h-full min-h-[200px]" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" sizes="(min-width:768px) 20vw, 100vw" />
                ) : (
                  <div className="dots-bg flex h-full min-h-[180px] items-center justify-center bg-gradient-to-br from-brand-50 to-white">
                    <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-brand-600 shadow-[var(--shadow-card)] ring-1 ring-line">
                      <Icon name={f.icon} size={40} />
                    </span>
                  </div>
                )}
              </div>
              <div className="p-7 sm:col-span-3">
                <h2 className="heading-md !text-[1.4rem]">{f.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[14.5px] font-medium">
                      <CheckCircle size={18} weight="fill" className="text-leaf-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
