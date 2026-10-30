import Link from 'next/link'
import { ArrowRight, CheckCircle, FilePdf, Phone } from '@phosphor-icons/react/dist/ssr'

import { EnquiryForm } from '@/components/EnquiryForm'
import { Faq } from '@/components/Faq'
import { PageBanner } from '@/components/PageBanner'
import { SectionHeading } from '@/components/SectionHeading'
import { getAdmissions, getSettings } from '@/lib/data'
import { telHref } from '@/lib/format'
import { fileUrl } from '@/lib/media'

export const metadata = { title: 'Admissions', description: 'Admission process, eligibility, documents and online enquiry form.' }

export default async function AdmissionsPage() {
  const [a, s] = await Promise.all([getAdmissions(), getSettings()])
  const fee = fileUrl(a.feeStructure)
  const prospectus = fileUrl(a.prospectus)

  return (
    <>
      <PageBanner title={`Admissions ${a.session ?? ''}`.trim()} intro={a.intro}>
      </PageBanner>
      <div className="container-x relative z-10 -mt-8">
        <div className="card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center" data-reveal>
          <div>
            <p className="font-heading text-[19px] font-bold">Apply online in 5 minutes</p>
            <p className="text-[14.5px] text-ink-2">Fill the full admission form, upload documents and print your application.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admissions/apply" className="btn btn-red">
              Apply Online <ArrowRight size={16} weight="bold" />
            </Link>
            <Link href="/downloads" className="btn btn-outline">
              Downloads
            </Link>
          </div>
        </div>
      </div>

      {/* Steps */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading label="Admission Process" title="Four Simple *Steps*" />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(a.steps ?? []).map((st, i) => (
              <li key={st.title} className="card card-hover relative p-7" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 font-heading text-lg font-bold text-white">{i + 1}</span>
                <h3 className="heading-md mt-5">{st.title}</h3>
                {st.text && <p className="mt-2 text-[15px] text-ink-2">{st.text}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Eligibility + documents */}
      <section className="bg-soft py-20 md:py-28" id="documents">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="card overflow-hidden" data-reveal>
            <div className="bg-brand-600 px-7 py-5 text-white">
              <h2 className="text-xl font-bold">Age Criteria</h2>
            </div>
            <table className="w-full text-left text-[15px]">
              <thead className="bg-brand-50 text-[13px] uppercase tracking-wide text-brand-700">
                <tr>
                  <th className="px-7 py-3">Class</th>
                  <th className="px-7 py-3">Age (as on 31 March)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {(a.eligibility ?? []).map((e) => (
                  <tr key={e.className}>
                    <td className="px-7 py-3.5 font-semibold">{e.className}</td>
                    <td className="px-7 py-3.5 text-ink-2">{e.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card overflow-hidden" data-reveal style={{ ['--d' as string]: '100ms' }}>
            <div className="bg-laurel-600 px-7 py-5 text-white">
              <h2 className="text-xl font-bold">Documents Required</h2>
            </div>
            <ul className="space-y-3 p-7">
              {(a.documentsRequired ?? []).map((d) => (
                <li key={d.text} className="flex items-start gap-3 text-[15.5px] text-ink">
                  <CheckCircle size={22} weight="fill" className="shrink-0 text-leaf-500" /> {d.text}
                </li>
              ))}
            </ul>
            {(fee || prospectus) && (
              <div className="flex flex-wrap gap-3 border-t border-line p-7">
                {fee && (
                  <a href={fee} target="_blank" rel="noreferrer" className="btn btn-red">
                    <FilePdf size={18} weight="fill" /> Fee Structure
                  </a>
                )}
                {prospectus && (
                  <a href={prospectus} target="_blank" rel="noreferrer" className="btn btn-outline">
                    <FilePdf size={18} weight="fill" /> Prospectus
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="py-20 md:py-28" id="enquiry">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading align="left" label="Enquiry Form" title="Apply *Online*" text="Fill in the details and our admission team will call you back within one working day." className="!mb-8" />
            {s.phone && (
              <a href={telHref(s.phone)} className="card card-hover flex items-center gap-4 p-5" data-reveal>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Phone size={22} weight="fill" />
                </span>
                <span>
                  <span className="block text-[13px] text-mute">Prefer to talk? Call us</span>
                  <span className="block font-heading text-lg font-semibold">{s.phone}</span>
                </span>
              </a>
            )}
          </div>
          <div className="card p-6 sm:p-9 lg:col-span-8" data-reveal style={{ ['--d' as string]: '100ms' }}>
            <EnquiryForm type="admission" />
          </div>
        </div>
      </section>

      {(a.faqs ?? []).length > 0 && (
        <section className="bg-soft py-20 md:py-28">
          <div className="container-x max-w-4xl">
            <SectionHeading label="FAQ" title="Admission *Questions*" />
            <Faq items={a.faqs ?? []} />
          </div>
        </section>
      )}
    </>
  )
}
