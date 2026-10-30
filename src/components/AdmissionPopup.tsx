'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ArrowRight, CheckCircle, Phone, X } from '@phosphor-icons/react'

const KEY = 'ais-popup-seen'

type Props = {
  badge?: string | null
  title?: string | null
  text?: string | null
  imageUrl: string
  phone?: string | null
}

/** Admission popup shown once per browser session, after the intro animation. */
export function AdmissionPopup({ badge, title, text, imageUrl, phone }: Props) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return
    } catch {}
    const show = () => {
      setOpen(true)
      requestAnimationFrame(() => setVisible(true))
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {}
    }
    const playing = document.documentElement.classList.contains('intro-playing')
    let timer: ReturnType<typeof setTimeout>
    const onIntro = () => (timer = setTimeout(show, 600))
    if (playing) window.addEventListener('intro:done', onIntro, { once: true })
    else timer = setTimeout(show, 1200)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('intro:done', onIntro)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => {
    setVisible(false)
    setTimeout(() => setOpen(false), 400)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-popup-title"
      className={clsx('fixed inset-0 z-[90] flex items-center justify-center p-4 transition-opacity duration-400', visible ? 'opacity-100' : 'opacity-0')}
    >
      <div className="absolute inset-0 bg-brand-950/70 backdrop-blur-sm" onClick={close} />
      <div
        className={clsx(
          'relative grid w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl transition-all duration-500 ease-[var(--ease-spring)] md:grid-cols-2',
          visible ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95',
        )}
      >
        <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white">
          <X size={18} weight="bold" />
        </button>
        <div className="relative h-48 md:h-auto">
          <Image src={imageUrl} alt="School campus" fill sizes="(min-width:768px) 384px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-brand-500" />
            <span className="h-1.5 w-4 rounded-full bg-laurel-500" />
            <span className="h-1.5 w-2 rounded-full bg-flame-400" />
          </div>
        </div>
        <div className="p-7 sm:p-9">
          {badge && <span className="label-pill">{badge}</span>}
          <h2 id="admission-popup-title" className="heading-lg mt-4 !text-[clamp(1.8rem,3.2vw,2.4rem)]">
            {title || 'Admissions Open'}
          </h2>
          {text && <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{text}</p>}
          <ul className="mt-5 space-y-2">
            {['CBSE affiliated · English medium', 'Smart classes & experienced faculty', 'Safe campus & transport'].map((x) => (
              <li key={x} className="flex items-center gap-2 text-[14.5px] font-medium">
                <CheckCircle size={20} weight="fill" className="text-leaf-500" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/admissions#enquiry" onClick={close} className="btn btn-red">
              Enquire Now <ArrowRight size={16} weight="bold" />
            </Link>
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline">
                <Phone size={16} weight="fill" /> Call
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
