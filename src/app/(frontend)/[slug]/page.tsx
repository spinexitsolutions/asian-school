import { notFound } from 'next/navigation'
import { cleanHtml } from '@/cms/normalize'
import { FilePdf } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { defaultPages } from '@/content/defaults'
import { getPageBySlug } from '@/lib/data'
import { fileUrl } from '@/lib/media'

type Args = { params: Promise<{ slug: string }> }

async function load(slug: string) {
  const page = await getPageBySlug(slug)
  if (page) {
    return {
      title: page.title,
      intro: page.intro,
      rows: (page.infoRows ?? []).map((r) => ({ label: r.label, value: r.value ?? '', file: fileUrl(r.file) })),
      content: page.content,
    }
  }
  // Built-in CBSE pages work even before they are created in the admin panel.
  const fallback = defaultPages.find((p) => p.slug === slug)
  if (!fallback) return null
  return {
    title: fallback.title,
    intro: fallback.intro,
    rows: fallback.rows.map(([label, value]) => ({ label, value, file: null })),
    content: fallback.content || null,
  }
}

export async function generateMetadata({ params }: Args) {
  const page = await load((await params).slug)
  return page ? { title: page.title, description: page.intro ?? undefined } : {}
}

export default async function ExtraPage({ params }: Args) {
  const page = await load((await params).slug)
  if (!page) notFound()
  const cbse = defaultPages.some((p) => p.cbse && p.title === page.title)

  return (
    <>
      <PageBanner title={page.title} intro={page.intro} crumbs={cbse ? [{ label: 'CBSE Corner' }] : []} />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-4xl space-y-10">
          {page.rows.length > 0 && (
            <div className="card overflow-hidden" data-reveal>
              <table className="w-full text-left text-[15px]">
                <tbody className="divide-y divide-line">
                  {page.rows.map((r) => (
                    <tr key={r.label} className="even:bg-soft/60">
                      <th className="w-2/5 bg-brand-50/60 px-6 py-4 font-semibold text-ink">{r.label}</th>
                      <td className="px-6 py-4 text-ink-2">
                        {r.file ? (
                          <a href={r.file} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-laurel-600 hover:underline">
                            <FilePdf size={18} weight="fill" /> {r.value || 'View document'}
                          </a>
                        ) : (
                          r.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {page.content && (
            <div className="prose-school" data-reveal>
              <div dangerouslySetInnerHTML={{ __html: cleanHtml(page.content) }} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
