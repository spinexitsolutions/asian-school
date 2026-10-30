import { notFound } from 'next/navigation'
import { FilePdf } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { getDisclosure } from '@/lib/data'
import { fileUrl } from '@/lib/media'

export const metadata = { title: 'Mandatory Public Disclosure' }

export default async function DisclosurePage() {
  const d = await getDisclosure()
  if (!d.enabled) notFound()
  return (
    <>
      <PageBanner title="Mandatory Public Disclosure" crumbs={[{ label: 'CBSE Corner' }]} intro="Information as required under the CBSE affiliation bye-laws (Appendix IX)." />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-5xl space-y-10">
          {(d.sections ?? []).map((sec) => (
            <div key={sec.heading} className="card overflow-hidden" data-reveal>
              <h2 className="bg-brand-600 px-6 py-4 text-[18px] font-bold text-white">{sec.heading}</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-[15px]">
                  <thead className="bg-brand-50 text-[12.5px] uppercase tracking-wide text-brand-700">
                    <tr>
                      <th className="w-16 px-6 py-3">S.No.</th>
                      <th className="px-6 py-3">Information</th>
                      <th className="px-6 py-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {(sec.rows ?? []).map((r, i) => {
                      const file = fileUrl((r as { file?: unknown }).file as never)
                      return (
                        <tr key={r.label} className="even:bg-soft/60">
                          <td className="px-6 py-3.5 text-mute">{i + 1}</td>
                          <td className="px-6 py-3.5 font-medium">{r.label}</td>
                          <td className="px-6 py-3.5 text-ink-2">
                            {file ? (
                              <a href={file} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-laurel-600 hover:underline">
                                <FilePdf size={18} weight="fill" /> View / Download
                              </a>
                            ) : (
                              r.value
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
