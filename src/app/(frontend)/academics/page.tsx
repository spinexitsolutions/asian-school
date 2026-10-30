import { CheckCircle } from '@phosphor-icons/react/dist/ssr'

import { Icon } from '@/components/Icon'
import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { SectionHeading } from '@/components/SectionHeading'
import { getAcademics } from '@/lib/data'
import type { Media } from '@/cms/types'

export const metadata = { title: 'Academics' }

const tones = ['bg-brand-600', 'bg-laurel-600', 'bg-flame-500', 'bg-leaf-600']

export default async function AcademicsPage() {
  const a = await getAcademics()
  return (
    <>
      <PageBanner title={a.title?.replace(/\*/g, '') || 'Academics'} intro={a.intro} />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading label="Curriculum" title="CBSE Curriculum, *Stage by Stage*" text="Each stage builds on the last, matched to how children learn at that age." />
          <div className="space-y-6">
            {(a.stages ?? []).map((st, i) => {
              const image = (st as { image?: Media | null }).image
              return (
              <article key={st.name} className="card grid overflow-hidden md:grid-cols-12" data-reveal>
                <div className={`relative md:col-span-4 ${i % 2 ? 'md:order-2' : ''}`}>
                  {image ? (
                    <Photo media={image} size="card" className="h-full min-h-[220px]" sizes="(min-width:768px) 33vw, 100vw" />
                  ) : (
                    <div className={`flex h-full min-h-[200px] flex-col justify-center ${tones[i % tones.length]} p-8 text-white`}>
                      <p className="font-heading text-6xl font-bold opacity-30">0{i + 1}</p>
                      <p className="mt-2 font-heading text-2xl font-bold">{st.classes}</p>
                    </div>
                  )}
                </div>
                <div className="p-7 md:col-span-8 md:p-10">
                  <span className="label-pill">{st.classes}</span>
                  <h3 className="heading-lg mt-4 !text-[clamp(1.5rem,2.4vw,2rem)]">{st.name}</h3>
                  {st.text && <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{st.text}</p>}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {(st.focus ?? []).map((f) => (
                      <li key={f.text} className="flex items-center gap-1.5 rounded-full bg-soft px-3.5 py-2 text-[14px] font-medium text-ink ring-1 ring-line">
                        <CheckCircle size={16} weight="fill" className="text-leaf-500" /> {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-soft py-20 md:py-28">
        <div className="container-x">
          <SectionHeading label="Teaching Approach" title="How We *Teach*" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(a.approach ?? []).map((ap, i) => (
              <article key={ap.title} className="card card-hover p-7" data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tones[i % tones.length]} text-white shadow-lg`}>
                  <Icon name={ap.icon} size={28} />
                </span>
                <h3 className="heading-md mt-5">{ap.title}</h3>
                {ap.text && <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{ap.text}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading label="Beyond Books" title="Co-Curricular *Activities*" text="Every child gets a stage to discover talents beyond the classroom." />
          <ul className="flex flex-wrap justify-center gap-3" data-reveal>
            {(a.cocurricular ?? []).map((c, i) => (
              <li
                key={c.name}
                className={`rounded-full px-5 py-3 text-[15px] font-semibold ring-1 transition-transform duration-500 hover:-translate-y-1 ${
                  ['bg-brand-50 text-brand-700 ring-brand-100', 'bg-laurel-50 text-laurel-700 ring-laurel-500/20', 'bg-flame-50 text-flame-600 ring-flame-400/30'][i % 3]
                }`}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
