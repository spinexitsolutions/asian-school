import Link from 'next/link'
import { Images } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { getAlbums } from '@/lib/data'
import { formatDate } from '@/lib/format'
import type { Media } from '@/cms/types'

export const metadata = { title: 'Gallery' }

export default async function GalleryPage() {
  const { docs } = await getAlbums()
  return (
    <>
      <PageBanner title="Photo Gallery" intro="Moments of learning, celebration and achievement at The Asian International School." />
      <section className="py-20 md:py-28">
        <div className="container-x">
          {docs.length === 0 ? (
            <p className="card mx-auto max-w-xl p-10 text-center text-mute">Photo albums will be published soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((a, i) => {
                const cover = (a.photos ?? [])[0] as Media | undefined
                return (
                  <Link key={a.id} href={`/gallery/${a.slug}`} className="card card-hover group block overflow-hidden" data-reveal style={{ ['--d' as string]: `${(i % 3) * 80}ms` }}>
                    <div className="relative">
                      <Photo media={cover} size="card" label="Album" className="aspect-[4/3]" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" sizes="(min-width:1024px) 33vw, 50vw" />
                      <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-bold text-brand-700 backdrop-blur">
                        <Images size={15} weight="fill" /> {(a.photos ?? []).length}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-[12.5px] font-semibold uppercase tracking-wide text-laurel-600">
                        {a.category} {a.date && `· ${formatDate(a.date)}`}
                      </p>
                      <h2 className="mt-1 font-heading text-[18px] font-semibold group-hover:text-brand-600">{a.title}</h2>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
