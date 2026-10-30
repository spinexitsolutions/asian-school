import { Bus, Clock, MapPin, Phone, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { SectionHeading } from '@/components/SectionHeading'
import { fallbackImages } from '@/content/defaults'
import { getSettings, getTransport } from '@/lib/data'
import { telHref } from '@/lib/format'
import type { Media } from '@/cms/types'

export const metadata = { title: 'Transport', description: 'School bus routes, stops and timings.' }

const tones = ['bg-brand-600', 'bg-laurel-600', 'bg-flame-500', 'bg-leaf-600']

export default async function TransportPage() {
  const [t, s] = await Promise.all([getTransport(), getSettings()])
  const routes = t.routes ?? []
  return (
    <>
      <PageBanner title="School Transport" intro={t.intro} />
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Photo media={t.image as Media} fallback={fallbackImages.campus} alt="School bus" className="aspect-[16/10] rounded-[2rem] shadow-[var(--shadow-lift)]" />
            <div className="grid grid-cols-2 gap-4" data-reveal>
              {[
                { Icon: Bus, value: `${routes.length}`, label: 'Bus routes' },
                { Icon: MapPin, value: `${routes.reduce((n, r) => n + String(r.stops ?? '').split('\n').filter((x) => x.trim()).length, 0)}+`, label: 'Pickup stops' },
                { Icon: ShieldCheck, value: 'Lady', label: 'attendant in every bus' },
                { Icon: Clock, value: 'On time', label: 'pickup & drop' },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="card p-5">
                  <Icon size={28} weight="duotone" className="text-brand-600" />
                  <p className="mt-3 font-heading text-2xl font-bold">{value}</p>
                  <p className="text-[13.5px] text-mute">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading label="Routes & Stops" title="Find Your *Bus Route*" text="Timings are approximate and may change slightly with traffic and season." />
            <div className="grid gap-5 md:grid-cols-2">
              {routes.map((r, i) => {
                const stops = String(r.stops ?? '').split('\n').map((x) => x.trim()).filter(Boolean)
                return (
                  <article key={`${r.routeNo}-${i}`} className="card overflow-hidden" data-reveal style={{ ['--d' as string]: `${(i % 2) * 90}ms` }}>
                    <div className={`flex items-center justify-between ${tones[i % tones.length]} px-6 py-4 text-white`}>
                      <div className="flex items-center gap-3">
                        <Bus size={26} weight="fill" />
                        <div>
                          <p className="text-[12px] font-bold uppercase tracking-wider text-white/75">{r.routeNo}</p>
                          <p className="font-heading text-[18px] font-semibold">{r.name}</p>
                        </div>
                      </div>
                      {r.contact && (
                        <a href={telHref(r.contact)} className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold">
                          <Phone size={14} weight="fill" /> {r.contact}
                        </a>
                      )}
                    </div>
                    <div className="p-6">
                      <ol className="relative space-y-3 border-l-2 border-dashed border-brand-200 pl-6">
                        {stops.map((stop) => (
                          <li key={stop} className="relative text-[15px] font-medium">
                            <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-600 ring-2 ring-brand-200" />
                            {stop}
                          </li>
                        ))}
                        <li className="relative text-[15px] font-bold text-brand-700">
                          <span className="absolute -left-[33px] top-0.5 h-[18px] w-[18px] rounded-full border-2 border-white bg-laurel-600 ring-2 ring-laurel-500/30" />
                          {s.schoolName}
                        </li>
                      </ol>
                      <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4 text-[13.5px]">
                        {r.pickup && (
                          <span className="rounded-full bg-brand-50 px-3 py-1.5 font-semibold text-brand-700">Pickup from {r.pickup}</span>
                        )}
                        {r.drop && <span className="rounded-full bg-flame-50 px-3 py-1.5 font-semibold text-flame-600">Drop around {r.drop}</span>}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <div className="card p-7" data-reveal>
              <h2 className="heading-md !text-[1.35rem]">Transport rules</h2>
              <ul className="mt-4 space-y-2.5">
                {(t.rules ?? []).map((r) => (
                  <li key={r.text} className="flex gap-2.5 text-[15px] text-ink-2">
                    <ShieldCheck size={20} weight="fill" className="mt-0.5 shrink-0 text-leaf-500" /> {r.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card flex flex-col justify-between bg-brand-50 p-7 ring-1 ring-brand-100" data-reveal style={{ ['--d' as string]: '100ms' }}>
              <div>
                <h2 className="heading-md !text-[1.35rem]">Transport fee</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{t.feeNote}</p>
              </div>
              {s.phone && (
                <a href={telHref(s.phone)} className="btn btn-primary mt-6 w-max">
                  <Phone size={16} weight="fill" /> Call {s.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
