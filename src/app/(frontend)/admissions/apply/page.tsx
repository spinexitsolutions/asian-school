import { ClipboardText, Clock, Phone } from '@phosphor-icons/react/dist/ssr'

import { ApplyForm } from '@/components/ApplyForm'
import { PageBanner } from '@/components/PageBanner'
import { getAdmissions, getSettings, getTransport } from '@/lib/data'
import { telHref } from '@/lib/format'

export const metadata = { title: 'Online Admission Form', description: 'Apply online for admission with document upload.' }

export default async function ApplyPage() {
  const [a, t, s] = await Promise.all([getAdmissions(), getTransport(), getSettings()])
  const stops = [...new Set((t.routes ?? []).flatMap((r) => String(r.stops ?? '').split('\n').map((x) => x.trim()).filter(Boolean)))]
  return (
    <>
      <PageBanner title="Online Admission Form" crumbs={[{ label: 'Admissions', href: '/admissions' }]} intro={`Session ${a.session} · Nursery to Class XI. Fill the form, upload documents and print your application.`} />
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            <div className="card p-6 lg:sticky lg:top-24">
              <h2 className="heading-md">Before you start</h2>
              <ul className="mt-4 space-y-3 text-[14.5px] text-ink-2">
                <li className="flex gap-2.5">
                  <Clock size={20} weight="duotone" className="shrink-0 text-brand-600" /> Takes about 5 minutes.
                </li>
                <li className="flex gap-2.5">
                  <ClipboardText size={20} weight="duotone" className="shrink-0 text-brand-600" /> Keep ready: student photo and birth certificate (photo or PDF). Report card and TC for
                  Class II onwards.
                </li>
              </ul>
              <ol className="mt-5 space-y-2 border-t border-line pt-5 text-[14px]">
                {['Student details', 'Parent details', 'Documents', 'Declaration & submit'].map((x, i) => (
                  <li key={x} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-600">{i + 1}</span>
                    {x}
                  </li>
                ))}
              </ol>
              {s.phone && (
                <a href={telHref(s.phone)} className="btn btn-outline mt-6 w-full">
                  <Phone size={16} weight="fill" /> Help: {s.phone}
                </a>
              )}
            </div>
          </aside>
          <div className="lg:col-span-8">
            <ApplyForm session={String(a.session ?? '')} stops={stops} />
          </div>
        </div>
      </section>
    </>
  )
}
