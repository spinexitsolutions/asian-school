import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr'

import { PrintButton } from '@/components/PrintButton'
import type { Application } from '@/cms/types'
import { fallbackImages } from '@/content/defaults'
import { currentUser } from '@/lib/auth'
import { findOne } from '@/lib/db'
import { getApplication, getSettings } from '@/lib/data'
import { formatDate } from '@/lib/format'
import { img } from '@/lib/media'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admission Application', robots: { index: false } }

type Args = { params: Promise<{ no: string }>; searchParams: Promise<{ t?: string; new?: string }> }

const docLabels: [keyof Application, string][] = [
  ['photo', 'Student photo'],
  ['birthCertificate', 'Birth certificate'],
  ['reportCard', 'Previous report card'],
  ['transferCertificate', 'Transfer certificate'],
  ['aadhaarCard', 'Aadhaar card'],
]

export default async function ApplicationPage({ params, searchParams }: Args) {
  const { no } = await params
  const { t = '', new: isNew } = await searchParams
  // Parents open it with their secret link; signed-in staff can open any application.
  let app = /^[a-f0-9]{32}$/.test(t) ? await getApplication(no, t) : null
  if (!app && (await currentUser().catch(() => null))) app = await findOne<Application>('applications', { applicationNo: no })
  if (!app) notFound()

  const s = await getSettings()
  const logo = img(s.logo)?.url ?? fallbackImages.logo
  const photoUrl = app.photo?.url ? `${app.photo.url}?t=${app.token}` : null
  const row = (label: string, value?: string | null) => (
    <tr>
      <th className="w-[38%] border border-line bg-soft px-3 py-2 text-left text-[13px] font-semibold">{label}</th>
      <td className="border border-line px-3 py-2 text-[14px]">{value || '—'}</td>
    </tr>
  )

  return (
    <section className="bg-soft py-10 print:bg-white print:py-0">
      <div className="container-x max-w-4xl">
        {isNew && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-leaf-500/10 p-5 ring-1 ring-leaf-500/25 print:hidden">
            <CheckCircle size={28} weight="fill" className="shrink-0 text-leaf-500" />
            <div>
              <p className="font-heading text-lg font-semibold">Application submitted successfully!</p>
              <p className="text-[14.5px] text-ink-2">
                Your application number is <b>{app.applicationNo}</b>. Please print or save this page as PDF and bring it with the original documents to the school office.
                Bookmark this page to view it again.
              </p>
            </div>
          </div>
        )}
        <div className="mb-5 flex flex-wrap justify-end gap-3 print:hidden">
          <PrintButton />
        </div>

        <article className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-10 print:rounded-none print:p-0 print:shadow-none print:ring-0">
          <header className="flex items-center gap-4 border-b-2 border-brand-600 pb-5">
            <Image src={logo} alt="" width={80} height={80} className="h-20 w-20 object-contain" />
            <div className="flex-1 text-center">
              <p className="font-heading text-[22px] font-bold uppercase text-brand-800">{s.schoolName}</p>
              <p className="text-[13px] text-ink-2">{s.address}</p>
              <p className="text-[13px] text-ink-2">
                {s.phone} · {s.email}
              </p>
              <p className="mt-2 inline-block rounded-full bg-brand-600 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-white print:border print:border-brand-600 print:bg-white print:text-brand-700">
                Admission Application · Session {app.session}
              </p>
            </div>
            <div className="flex h-[118px] w-24 shrink-0 items-center justify-center overflow-hidden border border-line bg-soft text-center text-[11px] text-mute">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoUrl} alt="Student" className="h-full w-full object-cover" />
              ) : (
                'Affix photo'
              )}
            </div>
          </header>

          <div className="mt-5 flex flex-wrap justify-between gap-2 text-[14px]">
            <p>
              <b>Application No.:</b> {app.applicationNo}
            </p>
            <p>
              <b>Date:</b> {formatDate(app.createdAt)}
            </p>
            <p>
              <b>Class applied:</b> {app.classApplying}
            </p>
          </div>

          <h2 className="mt-6 mb-2 font-heading text-[15px] font-bold uppercase tracking-wide text-brand-700">Student details</h2>
          <table className="w-full border-collapse">
            <tbody>
              {row('Student name', app.studentName)}
              {row('Date of birth', app.dob ? formatDate(app.dob) : '')}
              {row('Gender', app.gender ? app.gender[0].toUpperCase() + app.gender.slice(1) : '')}
              {row('Blood group', app.bloodGroup)}
              {row('Category / Religion', [app.category, app.religion].filter(Boolean).join(' / '))}
              {row('Previous school', app.previousSchool)}
              {row('Previous class & result', app.previousClass)}
              {row('School transport', app.transport ? `Yes${app.transportStop ? ` — ${app.transportStop}` : ''}` : 'No')}
            </tbody>
          </table>

          <h2 className="mt-6 mb-2 font-heading text-[15px] font-bold uppercase tracking-wide text-brand-700">Parent / guardian details</h2>
          <table className="w-full border-collapse">
            <tbody>
              {row("Father's / guardian's name", app.fatherName)}
              {row("Father's occupation", app.fatherOccupation)}
              {row("Father's mobile", app.fatherPhone)}
              {row("Mother's name", app.motherName)}
              {row("Mother's occupation", app.motherOccupation)}
              {row("Mother's mobile", app.motherPhone)}
              {row('Email', app.email)}
              {row('Address', app.address)}
            </tbody>
          </table>

          <h2 className="mt-6 mb-2 font-heading text-[15px] font-bold uppercase tracking-wide text-brand-700">Documents uploaded</h2>
          <ul className="grid gap-1.5 text-[14px] sm:grid-cols-2">
            {docLabels.map(([key, label]) => {
              const file = app[key] as { url?: string } | null | undefined
              return (
                <li key={key} className="flex items-center gap-2">
                  <span className={file?.url ? 'text-leaf-500' : 'text-mute'}>{file?.url ? '☑' : '☐'}</span>
                  {file?.url ? (
                    <a href={`${file.url}?t=${app.token}`} target="_blank" rel="noreferrer" className="hover:underline print:no-underline">
                      {label}
                    </a>
                  ) : (
                    <span className="text-mute">{label} (not uploaded)</span>
                  )}
                </li>
              )
            })}
          </ul>

          <p className="mt-6 text-[13px] leading-relaxed text-ink-2">
            <b>Declaration:</b> I declare that the information given above is correct. I understand that admission is subject to availability of seats, the interaction / test and
            verification of original documents, and I agree to follow the rules of the school.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-10 text-center text-[13px]">
            <div className="border-t border-ink pt-2">Signature of parent / guardian</div>
            <div className="border-t border-ink pt-2">Signature of admission in-charge</div>
          </div>

          <div className="mt-10 rounded-xl border border-dashed border-line p-4 text-[12.5px] text-mute">
            <b className="text-ink">For office use:</b> Interaction date ________ · Result ________ · Admission No. ________ · Fee receipt No. ________
          </div>
        </article>
      </div>
    </section>
  )
}
