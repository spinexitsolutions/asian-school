'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CaretDown,
  CheckSquare,
  FilePdf,
  ImageSquare,
  Plus,
  Square,
  Trash,
  UploadSimple,
  X,
} from '@phosphor-icons/react'

import { iconOptions, type Field } from '@/cms/schema'
import type { Media } from '@/cms/types'
import { Icon } from '@/components/Icon'
import { RichTextEditor } from './RichTextEditor'
import { useToast } from './Toast'

type Errors = Record<string, string>

/* ───────────── upload helpers ───────────── */

async function uploadFiles(files: File[]): Promise<Media[]> {
  const body = new FormData()
  files.forEach((f) => body.append('file', f))
  const res = await fetch('/api/admin/upload', { method: 'POST', body })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Upload failed')
  return json.files as Media[]
}

function useUploader() {
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const run = async (files: File[], done: (m: Media[]) => void) => {
    if (!files.length) return
    setBusy(true)
    try {
      done(await uploadFiles(files))
    } catch (err) {
      toast(false, (err as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return { busy, run }
}

/* ───────────── media library modal ───────────── */

function MediaLibrary({
  type,
  multiple,
  onClose,
  onPick,
}: {
  type: 'image' | 'file'
  multiple?: boolean
  onClose: () => void
  onPick: (items: Media[]) => void
}) {
  const [items, setItems] = useState<(Media & { id: string })[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/media?type=${type}&page=${page}`)
      .then((r) => r.json())
      .then((j) => {
        setItems((prev) => (page === 1 ? j.items : [...prev, ...j.items]))
        setTotal(j.total)
      })
      .finally(() => setLoading(false))
  }, [type, page])

  const toggle = (id: string) => {
    if (!multiple) {
      const it = items.find((i) => i.id === id)
      if (it) onPick([it])
      return
    }
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-950/60 p-4" onClick={onClose}>
      <div className="a-card flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="text-lg font-bold">Media library</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-soft" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {!loading && items.length === 0 && <p className="py-12 text-center text-mute">Nothing uploaded yet.</p>}
          <div className={clsx('grid gap-3', type === 'image' ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2')}>
            {items.map((it) => {
              const on = selected.includes(it.id)
              return (
                <button
                  type="button"
                  key={it.id}
                  onClick={() => toggle(it.id)}
                  className={clsx(
                    'group relative overflow-hidden rounded-xl text-left ring-2 transition',
                    on ? 'ring-brand-500' : 'ring-transparent hover:ring-brand-200',
                    type === 'image' ? 'aspect-square bg-soft' : 'flex items-center gap-3 bg-soft p-3',
                  )}
                >
                  {type === 'image' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.thumb || it.url} alt={it.alt || ''} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <>
                      <FilePdf size={28} className="shrink-0 text-laurel-600" />
                      <span className="truncate text-[13px] font-medium">{it.name || it.url}</span>
                    </>
                  )}
                  {multiple && (
                    <span className="absolute right-1.5 top-1.5 rounded bg-white/90 text-brand-600">
                      {on ? <CheckSquare size={20} weight="fill" /> : <Square size={20} />}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          {items.length < total && (
            <div className="mt-5 text-center">
              <button type="button" className="a-btn a-btn-ghost" onClick={() => setPage((p) => p + 1)} disabled={loading}>
                Load more
              </button>
            </div>
          )}
        </div>
        {multiple && (
          <div className="flex items-center justify-between border-t border-line px-5 py-3">
            <span className="text-[13px] text-mute">{selected.length} selected</span>
            <button type="button" className="a-btn a-btn-primary" disabled={!selected.length} onClick={() => onPick(items.filter((i) => selected.includes(i.id)))}>
              Add selected
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────────── individual inputs ───────────── */

function ImageInput({ value, onChange }: { value: Media | null; onChange: (v: Media | null) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const { busy, run } = useUploader()
  const [library, setLibrary] = useState(false)

  return (
    <div className="rounded-xl border border-dashed border-line bg-soft/60 p-3">
      {value ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.thumb || value.url} alt="" className="h-32 w-full rounded-lg object-cover sm:w-48" />
          <div className="flex-1 space-y-2">
            <input
              className="a-input"
              placeholder="Short description of the photo (for Google)"
              value={value.alt ?? ''}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
            />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="a-btn a-btn-ghost !py-2" onClick={() => input.current?.click()} disabled={busy}>
                <UploadSimple size={16} /> {busy ? 'Uploading…' : 'Replace'}
              </button>
              <button type="button" className="a-btn a-btn-danger !py-2" onClick={() => onChange(null)}>
                <Trash size={16} /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-5 text-center">
          <ImageSquare size={36} weight="duotone" className="text-brand-500" />
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="a-btn a-btn-primary !py-2" onClick={() => input.current?.click()} disabled={busy}>
              <UploadSimple size={16} /> {busy ? 'Uploading…' : 'Upload photo'}
            </button>
            <button type="button" className="a-btn a-btn-ghost !py-2" onClick={() => setLibrary(true)}>
              Choose from library
            </button>
          </div>
          <p className="text-[12px] text-mute">JPG, PNG or WebP. Large photos are compressed automatically.</p>
        </div>
      )}
      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          e.target.value = ''
          run(files, (m) => onChange(m[0] ?? null))
        }}
      />
      {library && (
        <MediaLibrary
          type="image"
          onClose={() => setLibrary(false)}
          onPick={(m) => {
            onChange(m[0] ?? null)
            setLibrary(false)
          }}
        />
      )}
    </div>
  )
}

function GalleryInput({ value, onChange }: { value: Media[]; onChange: (v: Media[]) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const { busy, run } = useUploader()
  const [library, setLibrary] = useState(false)
  const move = (i: number, d: number) => {
    const next = [...value]
    const j = i + d
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div className="rounded-xl border border-dashed border-line bg-soft/60 p-3">
      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {value.map((m, i) => (
            <div key={m.url + i} className="group relative aspect-square overflow-hidden rounded-lg bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.thumb || m.url} alt="" className="h-full w-full object-cover" />
              {i === 0 && <span className="absolute left-1 top-1 rounded bg-flame-400 px-1.5 text-[10px] font-bold text-brand-950">COVER</span>}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-brand-950/70 p-1 opacity-0 transition group-hover:opacity-100">
                <button type="button" className="rounded p-1 text-white hover:bg-white/20" onClick={() => move(i, -1)} aria-label="Move left">
                  <ArrowLeft size={14} />
                </button>
                <button type="button" className="rounded p-1 text-white hover:bg-laurel-500" onClick={() => onChange(value.filter((_, k) => k !== i))} aria-label="Remove">
                  <Trash size={14} />
                </button>
                <button type="button" className="rounded p-1 text-white hover:bg-white/20" onClick={() => move(i, 1)} aria-label="Move right">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="a-btn a-btn-primary !py-2" onClick={() => input.current?.click()} disabled={busy}>
          <UploadSimple size={16} /> {busy ? 'Uploading…' : 'Upload photos'}
        </button>
        <button type="button" className="a-btn a-btn-ghost !py-2" onClick={() => setLibrary(true)}>
          Add from library
        </button>
        <span className="text-[12px] text-mute">{value.length} photo(s)</span>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          e.target.value = ''
          run(files, (m) => onChange([...value, ...m]))
        }}
      />
      {library && (
        <MediaLibrary
          type="image"
          multiple
          onClose={() => setLibrary(false)}
          onPick={(m) => {
            onChange([...value, ...m])
            setLibrary(false)
          }}
        />
      )}
    </div>
  )
}

function FileInput({ value, onChange, accept }: { value: Media | null; onChange: (v: Media | null) => void; accept?: string }) {
  const input = useRef<HTMLInputElement>(null)
  const { busy, run } = useUploader()
  const [library, setLibrary] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-line bg-soft/60 p-3">
      {value ? (
        <>
          <a href={value.url} target="_blank" rel="noreferrer" className="flex min-w-0 flex-1 items-center gap-2 text-[14px] font-medium text-brand-600 hover:underline">
            <FilePdf size={22} className="shrink-0 text-laurel-600" />
            <span className="truncate">{value.name || value.url}</span>
          </a>
          <button type="button" className="a-btn a-btn-ghost !py-2" onClick={() => input.current?.click()} disabled={busy}>
            {busy ? 'Uploading…' : 'Replace'}
          </button>
          <button type="button" className="a-btn a-btn-danger !py-2" onClick={() => onChange(null)}>
            <Trash size={16} />
          </button>
        </>
      ) : (
        <>
          <button type="button" className="a-btn a-btn-primary !py-2" onClick={() => input.current?.click()} disabled={busy}>
            <UploadSimple size={16} /> {busy ? 'Uploading…' : 'Upload file'}
          </button>
          <button type="button" className="a-btn a-btn-ghost !py-2" onClick={() => setLibrary(true)}>
            Choose uploaded file
          </button>
        </>
      )}
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          e.target.value = ''
          run(files, (m) => onChange(m[0] ?? null))
        }}
      />
      {library && (
        <MediaLibrary
          type="file"
          onClose={() => setLibrary(false)}
          onPick={(m) => {
            onChange(m[0] ?? null)
            setLibrary(false)
          }}
        />
      )}
    </div>
  )
}

function ArrayInput({
  field,
  value,
  onChange,
  errors,
  path,
}: {
  field: Extract<Field, { type: 'array' }>
  value: Record<string, unknown>[]
  onChange: (v: Record<string, unknown>[]) => void
  errors: Errors
  path: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const titleOf = (item: Record<string, unknown>, i: number) => {
    const first = field.fields.find((f) => ['text', 'email', 'url'].includes(f.type))
    const t = first ? String(item[first.name] ?? '') : ''
    return t || `${field.itemLabel ?? 'Item'} ${i + 1}`
  }
  const move = (i: number, d: number) => {
    const next = [...value]
    const j = i + d
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const canAdd = !field.max || value.length < field.max
  return (
    <div className="space-y-2">
      {value.map((item, i) => {
        const expanded = open === i
        return (
          <div key={i} className="overflow-hidden rounded-xl bg-white ring-1 ring-line">
            <div className="flex items-center gap-2 px-3 py-2">
              <button type="button" onClick={() => setOpen(expanded ? null : i)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                <CaretDown size={14} className={clsx('shrink-0 transition-transform', expanded ? 'rotate-0' : '-rotate-90')} />
                <span className="truncate text-[14px] font-semibold">{titleOf(item, i)}</span>
              </button>
              <button type="button" onClick={() => move(i, -1)} className="rounded p-1.5 text-mute hover:bg-soft" aria-label="Move up">
                <ArrowUp size={14} />
              </button>
              <button type="button" onClick={() => move(i, 1)} className="rounded p-1.5 text-mute hover:bg-soft" aria-label="Move down">
                <ArrowDown size={14} />
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, k) => k !== i))} className="rounded p-1.5 text-laurel-600 hover:bg-laurel-50" aria-label="Remove">
                <Trash size={14} />
              </button>
            </div>
            {expanded && (
              <div className="grid gap-4 border-t border-line bg-soft/40 p-4 sm:grid-cols-2">
                {field.fields.map((f) => (
                  <FieldControl
                    key={f.name}
                    field={f}
                    value={item[f.name]}
                    data={item}
                    errors={errors}
                    path={`${path}.${i}.`}
                    onChange={(v) => onChange(value.map((it, k) => (k === i ? { ...it, [f.name]: v } : it)))}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
      {canAdd && (
        <button
          type="button"
          className="a-btn a-btn-ghost !py-2"
          onClick={() => {
            onChange([...value, {}])
            setOpen(value.length)
          }}
        >
          <Plus size={16} weight="bold" /> Add {field.itemLabel?.toLowerCase() ?? 'item'}
        </button>
      )}
    </div>
  )
}

/* ───────────── dispatcher ───────────── */

const toDateInput = (v: unknown) => (v ? String(v).slice(0, 10) : '')

export function FieldControl({
  field,
  value,
  onChange,
  errors,
  path = '',
  data,
}: {
  field: Field
  value: unknown
  onChange: (v: unknown) => void
  errors: Errors
  path?: string
  data: Record<string, unknown>
}) {
  const key = path + field.name
  const error = errors[key]
  const wide = !field.half || ['richtext', 'gallery', 'array', 'image'].includes(field.type)

  let control: React.ReactNode
  switch (field.type) {
    case 'text':
    case 'email':
    case 'url':
      control = (
        <input
          className="a-input"
          type={field.type === 'text' ? 'text' : field.type}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
        />
      )
      break
    case 'password':
      control = <input className="a-input" type="password" autoComplete="new-password" value={String(value ?? '')} aria-invalid={!!error} onChange={(e) => onChange(e.target.value)} />
      break
    case 'textarea':
      control = (
        <textarea
          className="a-input resize-y"
          rows={field.rows ?? 4}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
        />
      )
      break
    case 'number':
      control = <input className="a-input" type="number" value={value == null ? '' : String(value)} aria-invalid={!!error} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />
      break
    case 'date':
      control = <input className="a-input" type="date" value={toDateInput(value)} aria-invalid={!!error} onChange={(e) => onChange(e.target.value)} />
      break
    case 'checkbox':
      control = (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-left ring-1 ring-line"
        >
          <span className={clsx('relative h-6 w-11 shrink-0 rounded-full transition-colors', value ? 'bg-leaf-500' : 'bg-line')}>
            <span className={clsx('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', value ? 'translate-x-[22px]' : 'translate-x-0.5')} />
          </span>
          <span className="text-[14px] font-medium">{field.label}</span>
        </button>
      )
      break
    case 'select':
      control = (
        <select className="a-input" value={String(value ?? field.options[0]?.value ?? '')} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
      break
    case 'icon':
      control = (
        <div className="flex items-center gap-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon name={String(value || 'sparkle')} size={22} />
          </span>
          <select className="a-input" value={String(value || 'sparkle')} onChange={(e) => onChange(e.target.value)}>
            {iconOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )
      break
    case 'slug':
      control = (
        <div className="flex items-center rounded-[0.7rem] ring-1 ring-line">
          <span className="pl-3 text-[13px] text-mute">/</span>
          <input
            className="a-input !shadow-none"
            value={String(value ?? '')}
            placeholder={String(data[field.from] ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'auto'}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )
      break
    case 'richtext':
      control = <RichTextEditor value={String(value ?? '')} onChange={onChange} />
      break
    case 'image':
      control = <ImageInput value={(value as Media) ?? null} onChange={onChange} />
      break
    case 'gallery':
      control = <GalleryInput value={(value as Media[]) ?? []} onChange={onChange} />
      break
    case 'file':
      control = <FileInput value={(value as Media) ?? null} onChange={onChange} accept={field.accept} />
      break
    case 'array':
      control = <ArrayInput field={field} value={(value as Record<string, unknown>[]) ?? []} onChange={onChange} errors={errors} path={key} />
      break
  }

  return (
    <div className={clsx(wide && 'sm:col-span-2')}>
      {field.type !== 'checkbox' && (
        <span className="a-label">
          {field.label}
          {field.required && <span className="text-laurel-500"> *</span>}
        </span>
      )}
      {control}
      {field.help && !error && <p className="mt-1.5 text-[12.5px] text-mute">{field.help}</p>}
      {error && <p className="mt-1.5 text-[12.5px] font-medium text-laurel-600">{error}</p>}
    </div>
  )
}
