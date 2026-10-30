import { Briefcase, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { getCareers, getSettings } from '@/lib/data'

export const metadata = { title: 'Careers' }

export default async function CareersPage() {
  const [{ docs }, s] = await Promise.all([getCareers(), getSettings()])
  return (
    <>
      <PageBanner title="Careers" crumbs={[{ label: 'About', href: '/about' }]} intro="Join a team of passionate educators shaping young minds in Chomu." />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-4xl space-y-4">
          {docs.length === 0 && <p className="card p-10 text-center text-mute">There are no open positions right now. You can still send your CV to {s.email}.</p>}
          {docs.map((j, i) => (
            <article key={j.id} className="card card-hover flex flex-col gap-4 p-6 sm:flex-row sm:items-start" data-reveal style={{ ['--d' as string]: `${i * 60}ms` }}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Briefcase size={24} weight="duotone" />
              </span>
              <div className="flex-1">
                <h2 className="font-heading text-[19px] font-semibold">{j.title}</h2>
                <p className="mt-1 text-[13.5px] font-semibold uppercase tracking-wide text-laurel-600">
                  {[j.department, j.type?.replace('-', ' ')].filter(Boolean).join(' · ')}
                </p>
                {j.requirements && <p className="mt-3 whitespace-pre-line text-[15px] text-ink-2">{j.requirements}</p>}
              </div>
              {s.email && (
                <a href={`mailto:${s.email}?subject=${encodeURIComponent(`Application: ${j.title}`)}`} className="btn btn-primary shrink-0">
                  <EnvelopeSimple size={18} weight="fill" /> Apply
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
