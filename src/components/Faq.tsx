import { Plus } from '@phosphor-icons/react/dist/ssr'

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="card group overflow-hidden open:ring-1 open:ring-brand-200" data-reveal style={{ ['--d' as string]: `${i * 60}ms` }}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-500 ease-[var(--ease-spring)] group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
              <Plus size={16} weight="bold" />
            </span>
          </summary>
          <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-2">{f.answer}</p>
        </details>
      ))}
    </div>
  )
}
