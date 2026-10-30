'use client'

import { useEffect, useRef, useState } from 'react'

/** Animates the numeric part of values like "1,200+" or "25:1" when scrolled into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : null
  const [shown, setShown] = useState(target === null ? value : `${match![1]}0${match![3]}`)

  useEffect(() => {
    if (target === null || !ref.current) return
    const el = ref.current
    const decimals = match![2].includes('.') ? match![2].split('.')[1].length : 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 1800
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 4)
          const n = (target * eased).toLocaleString('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
          setShown(`${match![1]}${n}${match![3]}`)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} aria-label={value}>
      {shown}
    </span>
  )
}
