import { FilePdf, MagnifyingGlass, WarningCircle } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { getTransferCertificates } from '@/lib/data'
import { formatDate } from '@/lib/format'
import { fileUrl } from '@/lib/media'

export const metadata = { title: 'Transfer Certificates' }

type Args = { searchParams: Promise<{ admissionNo?: string }> }

export default async function TCPage({ searchParams }: Args) {
  const admissionNo = ((await searchParams).admissionNo ?? '').slice(0, 30)
  const res = admissionNo ? await getTransferCertificates(admissionNo) : null

  return (
    <>
      <PageBanner title="Transfer Certificates" crumbs={[{ label: 'CBSE Corner' }]} intro="Search and download a Transfer Certificate using the student's admission number." />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <form className="card flex flex-col gap-3 p-6 sm:flex-row sm:p-8" role="search" data-reveal>
            <label className="flex-1">
              <span className="sr-only">Admission number</span>
              <input name="admissionNo" defaultValue={admissionNo} required className="input !py-4" placeholder="Enter admission number" />
            </label>
            <button type="submit" className="btn btn-primary !py-4">
              <MagnifyingGlass size={18} weight="bold" /> Search TC
            </button>
          </form>

          {res && (
            <div className="mt-8 space-y-4">
              {res.length === 0 ? (
                <p className="card flex items-center gap-3 p-6 text-ink-2">
                  <WarningCircle size={22} weight="fill" className="text-laurel-600" /> No TC found for admission number “{admissionNo}”. Please contact the school office.
                </p>
              ) : (
                res.map((tc) => {
                  const file = fileUrl(tc.file)
                  return (
                    <div key={tc.id} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <p className="font-heading text-lg font-semibold">{tc.studentName}</p>
                        <p className="text-[14px] text-mute">
                          Admission No. {tc.admissionNo}
                          {tc.tcNo && ` · TC No. ${tc.tcNo}`}
                          {tc.issueDate && ` · Issued ${formatDate(tc.issueDate)}`}
                        </p>
                      </div>
                      {file && (
                        <a href={file} target="_blank" rel="noreferrer" className="btn btn-red">
                          <FilePdf size={18} weight="fill" /> Download TC
                        </a>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
