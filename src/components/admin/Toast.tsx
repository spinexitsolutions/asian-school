'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import clsx from 'clsx'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react'

type Toast = { id: number; ok: boolean; message: string }
const Ctx = createContext<(ok: boolean, message: string) => void>(() => {})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = useCallback((ok: boolean, message: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, ok, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              'flex items-center gap-2.5 rounded-xl px-4 py-3 text-[14px] font-semibold shadow-xl',
              t.ok ? 'bg-brand-950 text-white' : 'bg-laurel-600 text-white',
            )}
          >
            {t.ok ? <CheckCircle size={20} weight="fill" className="text-flame-400" /> : <WarningCircle size={20} weight="fill" />}
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
