import Link from 'next/link'
import { BookOpenText, Buildings, CaretRight, Images, PencilSimpleLine } from '@phosphor-icons/react/dist/ssr'

const boxes = [
  {
    title: 'About Us',
    Icon: Buildings,
    bg: 'bg-brand-600',
    ring: 'text-brand-600',
    links: [
      { label: 'About School', href: '/about' },
      { label: "Director's Message", href: '/about#message' },
      { label: 'Our Faculty', href: '/faculty' },
    ],
  },
  {
    title: 'Admission',
    Icon: PencilSimpleLine,
    bg: 'bg-laurel-600',
    ring: 'text-laurel-600',
    links: [
      { label: 'Admission Process', href: '/admissions' },
      { label: 'Enquiry Form', href: '/admissions#enquiry' },
      { label: 'Fee & Documents', href: '/admissions#documents' },
    ],
  },
  {
    title: 'Gallery',
    Icon: Images,
    bg: 'bg-flame-500',
    ring: 'text-flame-600',
    links: [
      { label: 'Photo Gallery', href: '/gallery' },
      { label: 'News & Events', href: '/news' },
      { label: 'Achievements', href: '/achievers' },
    ],
  },
  {
    title: 'CBSE Corner',
    Icon: BookOpenText,
    bg: 'bg-leaf-600',
    ring: 'text-leaf-600',
    links: [
      { label: 'Mandatory Disclosure', href: '/mandatory-disclosure' },
      { label: 'Transfer Certificates', href: '/transfer-certificates' },
      { label: 'Affiliation Details', href: '/affiliation-details' },
    ],
  },
]

/** Four coloured link boxes that overlap the bottom of the hero slider. */
export function QuickLinks() {
  return (
    <div className="container-x relative z-30">
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl shadow-[var(--shadow-lift)] sm:grid-cols-2 lg:grid-cols-4">
        {boxes.map(({ title, Icon, bg, ring, links }, i) => (
          <div key={title} className={`group relative ${bg} px-4 pb-5 pt-5 text-white sm:px-7 sm:pb-8 sm:pt-7`} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
            <Link href={links[0].href} aria-label={title} className="absolute inset-0 z-10 sm:hidden" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-125" />
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-white ${ring} shadow-lg transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110`}>
                <Icon size={28} weight="duotone" />
              </span>
              <h3 className="text-[15px] font-bold uppercase tracking-wide sm:text-[19px]">{title}</h3>
            </div>
            <ul className="mt-5 hidden space-y-2 sm:block">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group/l inline-flex items-center gap-1.5 text-[15px] text-white/90 hover:text-white">
                    <CaretRight size={13} weight="bold" className="transition-transform duration-300 group-hover/l:translate-x-1" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
