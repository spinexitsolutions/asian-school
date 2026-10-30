import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { getFaculty } from '@/lib/data'
import type { Media } from '@/payload-types'

export const metadata = { title: 'Our Faculty' }

export default async function FacultyPage() {
  const { docs } = await getFaculty()
  return (
    <>
      <PageBanner title="Our Faculty" crumbs={[{ label: 'About', href: '/about' }]} intro="Experienced and passionate educators dedicated to every student's growth." />
      <section className="py-20 md:py-28">
        <div className="container-x">
          {docs.length === 0 ? (
            <p className="card mx-auto max-w-xl p-10 text-center text-mute">Faculty details will be published soon.</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {docs.map((f, i) => (
                <article key={f.id} className="card card-hover group overflow-hidden text-center" data-reveal style={{ ['--d' as string]: `${(i % 4) * 70}ms` }}>
                  <Photo media={f.photo as Media} size="card" label="Photo" className="aspect-[4/4.4]" imgClassName="object-top transition-transform duration-[1.2s] group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                  <div className="p-5">
                    <h3 className="font-heading text-[17px] font-semibold">{f.name}</h3>
                    <p className="text-[14px] font-semibold text-brand-600">{f.designation}</p>
                    {(f.qualification || f.experience) && (
                      <p className="mt-1 text-[13px] text-mute">{[f.qualification, f.experience].filter(Boolean).join(' · ')}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
