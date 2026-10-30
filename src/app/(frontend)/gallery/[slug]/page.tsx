import { notFound } from 'next/navigation'

import { LightboxGrid } from '@/components/Lightbox'
import { PageBanner } from '@/components/PageBanner'
import { getAlbumBySlug, getPage } from '@/lib/data'
import { formatDate, youtubeId } from '@/lib/format'
import { img } from '@/lib/media'
import type { Media } from '@/cms/types'

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args) {
  const album = await getAlbumBySlug((await params).slug)
  return { title: album?.title ?? 'Gallery' }
}

export default async function AlbumPage({ params }: Args) {
  await getPage('gallery')
  const album = await getAlbumBySlug((await params).slug)
  if (!album) notFound()

  const items = ((album.photos ?? []) as Media[])
    .map((p) => {
      const full = img(p)
      const thumb = img(p, 'card')
      return full && thumb ? { src: full.url, thumb: thumb.url, alt: full.alt, width: thumb.width, height: thumb.height } : null
    })
    .filter(Boolean) as { src: string; thumb: string; alt: string; width: number; height: number }[]

  const videos = (album.videos ?? []).map((v) => youtubeId(v.url)).filter(Boolean) as string[]

  return (
    <>
      <PageBanner
        title={album.title}
        crumbs={[{ label: 'Gallery', href: '/gallery' }]}
        intro={album.date ? formatDate(album.date, { month: 'long' }) : undefined}
      />
      <section className="py-16 md:py-24">
        <div className="container-x space-y-12">
          {items.length > 0 && <LightboxGrid items={items} />}
          {videos.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {videos.map((id) => (
                <div key={id} className="card overflow-hidden" data-reveal>
                  <iframe
                    className="aspect-video w-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title="School video"
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}
          {items.length === 0 && videos.length === 0 && <p className="text-center text-mute">Photos will be added soon.</p>}
        </div>
      </section>
    </>
  )
}
