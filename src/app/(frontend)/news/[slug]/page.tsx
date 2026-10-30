import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, CalendarBlank, MapPin } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { getNewsBySlug } from '@/lib/data'
import { formatDate } from '@/lib/format'
import { img } from '@/lib/media'
import type { Media } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args) {
  const post = await getNewsBySlug((await params).slug)
  if (!post) return {}
  const meta = (post as { meta?: { title?: string; description?: string; image?: Media } }).meta
  const cover = img((meta?.image ?? post.cover) as Media)
  return {
    title: meta?.title || post.title,
    description: meta?.description || post.excerpt || undefined,
    openGraph: cover ? { images: [cover.url] } : undefined,
  }
}

export default async function NewsPost({ params }: Args) {
  const post = await getNewsBySlug((await params).slug)
  if (!post) notFound()
  return (
    <>
      <PageBanner title={post.title} crumbs={[{ label: 'News & Events', href: '/news' }]} />
      <article className="py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-[14px] font-semibold text-ink-2" data-reveal>
            <span className="rounded-full bg-laurel-50 px-3 py-1 uppercase tracking-wide text-laurel-600">{post.category}</span>
            <span className="flex items-center gap-1.5">
              <CalendarBlank size={16} weight="bold" /> {formatDate(post.date, { month: 'long' })}
            </span>
            {post.venue && (
              <span className="flex items-center gap-1.5">
                <MapPin size={16} weight="bold" /> {post.venue}
              </span>
            )}
          </div>
          {post.cover && <Photo media={post.cover as Media} className="mb-10 aspect-[16/9] rounded-[1.75rem]" priority sizes="(min-width:768px) 768px, 100vw" />}
          {post.excerpt && <p className="mb-6 text-[19px] leading-relaxed text-ink">{post.excerpt}</p>}
          {post.content && (
            <div className="prose-school">
              <RichText data={post.content} />
            </div>
          )}
          <Link href="/news" className="btn btn-outline mt-12">
            <ArrowLeft size={16} weight="bold" /> All news & events
          </Link>
        </div>
      </article>
    </>
  )
}
