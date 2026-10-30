import { FilePdf } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { getNotices } from '@/lib/data'
import { fileUrl } from '@/lib/media'

export const metadata = { title: 'Notice Board' }

const labels: Record<string, string> = { general: 'General', admissions: 'Admissions', exams: 'Exams / Results', holidays: 'Holidays', events: 'Events' }

export default async function NoticesPage() {
  const { docs } = await getNotices(200)
  return (
    <>
      <PageBanner title="Notice Board" intro="Circulars, holidays, examination schedules and announcements." />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-4xl">
          {docs.length === 0 ? (
            <p className="card p-10 text-center text-mute">No notices at the moment.</p>
          ) : (
            <ul className="space-y-4">
              {docs.map((n, i) => {
                const d = new Date(n.date)
                const file = fileUrl(n.attachment)
                return (
                  <li key={n.id} className="card card-hover flex gap-5 p-5 sm:p-6" data-reveal style={{ ['--d' as string]: `${Math.min(i, 6) * 50}ms` }}>
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md">
                      <span className="text-[22px] font-bold leading-none">{String(d.getDate()).padStart(2, '0')}</span>
                      <span className="mt-1 text-[11px] font-semibold uppercase">
                        {d.toLocaleString('en-IN', { month: 'short' })} {String(d.getFullYear()).slice(2)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[12px] font-bold uppercase tracking-wide text-laurel-600">{labels[n.category ?? 'general']}</span>
                      <h2 className="mt-1 font-heading text-[17px] font-semibold leading-snug">{n.title}</h2>
                      {n.details && <p className="mt-2 whitespace-pre-line text-[15px] text-ink-2">{n.details}</p>}
                      {file && (
                        <a href={file} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-laurel-600 hover:underline">
                          <FilePdf size={18} weight="fill" /> Download attachment
                        </a>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
