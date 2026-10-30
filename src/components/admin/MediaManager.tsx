'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Copy, FilePdf, UploadSimple } from '@phosphor-icons/react'

import type { Media } from '@/cms/types'
import { useToast } from './Toast'

export function MediaManager() {
  const toast = useToast()
  const input = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<(Media & { id: string })[]>([])
  const [busy, setBusy] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const load = useCallback(async (p: number) => {
    const j = await fetch(`/api/admin/media?page=${p}`).then((r) => r.json())
    setItems((prev) => (p === 1 ? j.items : [...prev, ...j.items]))
    setTotal(j.total)
  }, [])

  useEffect(() => {
    load(page)
  }, [page, load])

  const upload = async (files: File[]) => {
    if (!files.length) return
    setBusy(true)
    try {
      const body = new FormData()
      files.forEach((f) => body.append('file', f))
      const res = await fetch('/api/admin/upload', { method: 'POST', body })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error)
      toast(true, `${j.files.length} file(s) uploaded`)
      setPage(1)
      load(1)
    } catch (err) {
      toast(false, (err as Error).message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          upload(Array.from(e.dataTransfer.files))
        }}
        className="a-card flex flex-col items-center gap-3 border-2 border-dashed border-brand-200 px-6 py-10 text-center"
      >
        <UploadSimple size={36} weight="duotone" className="text-brand-500" />
        <p className="font-semibold">Drag & drop photos or PDFs here</p>
        <button type="button" onClick={() => input.current?.click()} disabled={busy} className="a-btn a-btn-primary">
          {busy ? 'Uploading…' : 'Choose files'}
        </button>
        <input ref={input} type="file" multiple hidden accept="image/*,application/pdf" onChange={(e) => { upload(Array.from(e.target.files ?? [])); e.target.value = '' }} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((m) => (
          <div key={m.id} className="a-card group overflow-hidden">
            <div className="aspect-square bg-soft">
              {m.type?.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.thumb || m.url} alt="" className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FilePdf size={44} className="text-laurel-600" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 p-2">
              <span className="min-w-0 flex-1 truncate text-[12px] text-mute">{m.name}</span>
              <button
                type="button"
                title="Copy link"
                className="rounded p-1 text-mute hover:bg-soft hover:text-brand-600"
                onClick={() => {
                  navigator.clipboard.writeText(new URL(m.url, window.location.origin).toString())
                  toast(true, 'Link copied')
                }}
              >
                <Copy size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="py-8 text-center text-mute">Nothing uploaded yet.</p>}
      {items.length < total && (
        <div className="text-center">
          <button className="a-btn a-btn-ghost" onClick={() => setPage((p) => p + 1)}>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
