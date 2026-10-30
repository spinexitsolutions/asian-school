import { Clock, Gavel, TShirt } from '@phosphor-icons/react/dist/ssr'

import { Faq } from '@/components/Faq'
import { PageBanner } from '@/components/PageBanner'
import { SectionHeading } from '@/components/SectionHeading'
import { getAdmissions, getSchoolInfo } from '@/lib/data'

export const metadata = { title: 'Rules, Timings & Uniform', description: 'School timings, uniform and rules for students and parents.' }

const lines = (v?: unknown) => String(v ?? '').split('\n').map((x) => x.trim()).filter(Boolean)

export default async function SchoolInfoPage() {
  const [info, a] = await Promise.all([getSchoolInfo(), getAdmissions()])
  return (
    <>
      <PageBanner title="Rules, Timings & Uniform" intro="Everything parents and students need to know for a smooth school day." />
      <nav className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur xl:top-[58px]" aria-label="On this page">
        <div className="container-x flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {[
            ['#timings', 'Timings'],
            ['#uniform', 'Uniform'],
            ['#rules', 'Rules'],
            ['#faq', 'FAQ'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="shrink-0 rounded-full bg-soft px-4 py-2 text-[14px] font-semibold text-ink-2 ring-1 ring-line hover:text-brand-600">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="timings" className="scroll-mt-32 py-14 md:py-20">
        <div className="container-x max-w-5xl">
          <SectionHeading label="Timings" title="School *Timings*" />
          <div className="card overflow-hidden" data-reveal>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-[15px]">
                <thead className="bg-brand-600 text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      <span className="flex items-center gap-2">
                        <Clock size={18} weight="bold" /> For
                      </span>
                    </th>
                    <th className="px-6 py-4 font-semibold">☀️ Summer</th>
                    <th className="px-6 py-4 font-semibold">❄️ Winter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {(info.timings ?? []).map((t) => (
                    <tr key={t.label} className="even:bg-soft/60">
                      <td className="px-6 py-4 font-semibold">{t.label}</td>
                      <td className="px-6 py-4 text-ink-2">{t.summer}</td>
                      <td className="px-6 py-4 text-ink-2">{t.winter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {info.timingNote && <p className="mt-4 text-[14px] text-mute">{info.timingNote}</p>}
        </div>
      </section>

      <section id="uniform" className="scroll-mt-32 bg-soft py-14 md:py-20">
        <div className="container-x">
          <SectionHeading label="Uniform" title="School *Uniform*" />
          <div className="grid gap-5 lg:grid-cols-3">
            {(info.uniforms ?? []).map((u, i) => (
              <article key={u.title} className="card overflow-hidden" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <div className={`flex items-center gap-3 px-6 py-4 text-white ${['bg-brand-600', 'bg-laurel-600', 'bg-leaf-600'][i % 3]}`}>
                  <TShirt size={24} weight="fill" />
                  <h3 className="font-heading text-[17px] font-semibold">{u.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-5 p-6">
                  {[
                    ['Boys', u.boys],
                    ['Girls', u.girls],
                  ].map(([who, list]) => (
                    <div key={who as string}>
                      <p className="text-[12px] font-bold uppercase tracking-wider text-mute">{who as string}</p>
                      <ul className="mt-2 space-y-1.5 text-[14px] text-ink-2">
                        {lines(list).map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" /> {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {info.uniformNote && <p className="mt-5 text-center text-[14px] text-mute">{info.uniformNote}</p>}
        </div>
      </section>

      <section id="rules" className="scroll-mt-32 py-14 md:py-20">
        <div className="container-x">
          <SectionHeading label="Rules" title="Rules & *Regulations*" />
          <div className="grid gap-5 lg:grid-cols-3">
            {(info.ruleGroups ?? []).map((g, i) => (
              <article key={g.title} className="card p-7" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Gavel size={24} weight="duotone" />
                </span>
                <h3 className="heading-md mt-4">{g.title}</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14.5px] text-ink-2 marker:font-semibold marker:text-brand-600">
                  {lines(g.items).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-32 bg-soft py-14 md:py-20">
        <div className="container-x max-w-4xl">
          <SectionHeading label="FAQ" title="Parents Often *Ask*" />
          <Faq items={a.faqs ?? []} />
        </div>
      </section>
    </>
  )
}
