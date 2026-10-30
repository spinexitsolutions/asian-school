import { Clock, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react/dist/ssr'

import { EnquiryForm } from '@/components/EnquiryForm'
import { PageBanner } from '@/components/PageBanner'
import { SectionHeading } from '@/components/SectionHeading'
import { getSettings } from '@/lib/data'
import { telHref } from '@/lib/format'

export const metadata = { title: 'Contact Us' }

export default async function ContactPage() {
  const s = await getSettings()
  const map = s.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(`${s.schoolName}, ${s.address}`)}&output=embed`

  const cards = [
    { Icon: MapPin, title: 'Address', lines: [s.address], tone: 'bg-brand-600' },
    {
      Icon: Phone,
      title: 'Phone',
      lines: [s.phone, s.altPhone].filter(Boolean) as string[],
      href: (l: string) => telHref(l),
      tone: 'bg-laurel-600',
    },
    { Icon: EnvelopeSimple, title: 'Email', lines: [s.email], href: (l: string) => `mailto:${l}`, tone: 'bg-flame-500' },
    { Icon: Clock, title: 'Office Hours', lines: [s.officeHours], tone: 'bg-leaf-600' },
  ]

  return (
    <>
      <PageBanner title="Contact Us" intro="We would love to hear from you. Visit, call or send us a message." />
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ Icon, title, lines, href, tone }, i) => (
              <div key={title} className="card card-hover p-6" data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone} text-white shadow-lg`}>
                  <Icon size={24} weight="fill" />
                </span>
                <h2 className="mt-5 font-heading text-[17px] font-semibold">{title}</h2>
                <div className="mt-1 space-y-0.5 text-[15px] text-ink-2">
                  {lines.filter(Boolean).map((l) =>
                    href ? (
                      <a key={l} href={href(l!)} className="block hover:text-brand-600">
                        {l}
                      </a>
                    ) : (
                      <p key={l}>{l}</p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="card p-6 sm:p-9" data-reveal>
              <SectionHeading align="left" label="Send a Message" title="Get in *Touch*" className="!mb-8" />
              <EnquiryForm type="contact" />
            </div>
            <div className="card min-h-[420px] overflow-hidden p-2" data-reveal style={{ ['--d' as string]: '100ms' }}>
              <iframe title="School location on Google Maps" src={map} className="h-full min-h-[420px] w-full rounded-[1rem]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
