import { notFound } from 'next/navigation'

import { HeroA } from '@/components/hero-options/HeroA'
import { HeroB } from '@/components/hero-options/HeroB'
import { HeroC } from '@/components/hero-options/HeroC'
import { HeroD } from '@/components/hero-options/HeroD'
import { getHome, getNotices, getSettings } from '@/lib/data'

export const metadata = { robots: { index: false } }

const sampleNotices = [
  { title: 'Admissions open for session 2027–28 (Nursery to Class XI)', date: '2026-10-28' },
  { title: 'Half-yearly examination schedule released', date: '2026-10-20' },
  { title: 'School closed on account of Diwali holidays', date: '2026-10-15' },
  { title: 'Parent–teacher meeting on Saturday', date: '2026-10-10' },
]

const variants = { a: HeroA, b: HeroB, c: HeroC, d: HeroD }

export default async function HeroPreview({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params
  const Hero = variants[variant as keyof typeof variants]
  if (!Hero) notFound()
  const [s, h, n] = await Promise.all([getSettings(), getHome(), getNotices(6)])
  const notices = n.docs.length ? n.docs.map((d) => ({ title: d.title, date: d.date })) : sampleNotices
  return (
    <>
      <Hero schoolName={s.schoolName} phone={s.phone} established={s.established} stats={h.stats ?? []} notices={notices} />
    </>
  )
}
