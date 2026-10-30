'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { CheckCircle, Phone, X } from '@phosphor-icons/react'

import { EnquiryForm } from './EnquiryForm'

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
      className={clsx('fixed inset-0 z-[90] flex print:hidden items-center justify-center p-4 transition-opacity duration-400', visible ? 'opacity-100' : 'opacity-0')}
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
        {/* Left: photo with the admission message */}
        <div className="relative hidden min-h-[460px] text-white md:block">
          <Image src={imageUrl} alt="School campus" fill sizes="384px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/55 to-brand-950/10" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            {badge && <span className="label-pill label-pill--light">{badge}</span>}
            <h2 id="admission-popup-title" className="mt-3 font-heading text-[2rem] font-bold leading-tight">
              {title || 'Admissions Open'}
            </h2>
            {text && <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">{text}</p>}
            <ul className="mt-4 space-y-1.5">
              {['CBSE affiliated · English medium', 'Smart classes & experienced faculty', 'Safe campus & transport'].map((x) => (
                <li key={x} className="flex items-center gap-2 text-[13.5px] font-medium text-white/90">
                  <CheckCircle size={18} weight="fill" className="text-flame-400" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: enquiry form */}
        <div className="max-h-[85dvh] overflow-y-auto p-6 sm:p-8">
          <div className="md:hidden">
            {badge && <span className="label-pill">{badge}</span>}
            <h2 className="heading-lg mt-3 !text-[1.7rem]">{title || 'Admissions Open'}</h2>
          </div>
          <p className="font-heading text-[19px] font-bold text-ink max-md:mt-3">Admission Enquiry</p>
          <p className="mt-1 text-[13.5px] text-mute">Fill the form — our team will call you back.</p>
          <div className="tri-rule mt-3" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="mt-5">
            <EnquiryForm type="admission" compact />
          </div>
          {phone && (
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="mt-4 flex items-center justify-center gap-2 text-[14px] font-semibold text-brand-600 hover:underline">
              <Phone size={16} weight="fill" /> Or call {phone}
            </a>
          )}
          <a href="/admissions/apply" onClick={close} className="mt-2 block text-center text-[13.5px] font-semibold text-laurel-600 hover:underline">
            Ready to apply? Fill the full admission form →
          </a>
        </div>
      </div>
    </div>
  )
}
