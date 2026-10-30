import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

export function WhatsAppButton({ number }: { number?: string | null }) {
  const digits = number?.replace(/\D/g, '')
  if (!digits) return null
  return (
    <a
      href={`https://wa.me/${digits}?text=${encodeURIComponent('Hello! I would like to know more about admissions.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-[0_18px_40px_-12px_rgba(31,143,78,0.6)] transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 active:scale-95"
    >
      <WhatsappLogo size={28} weight="light" />
    </a>
  )
}
