'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { ArrowLeft, FloppyDisk, Trash } from '@phosphor-icons/react'

import { deleteDocument, saveDocument, saveGlobal } from '@/app/(admin)/admin/actions'
import type { Section } from '@/cms/schema'
import { FieldControl } from './fields'
import { useToast } from './Toast'

type Props =
  | { kind: 'collection'; slug: string; id: string | null; sections: Section[]; initial: Record<string, unknown>; title: string; backHref: string; canDelete: boolean; previewHref?: string }
  | { kind: 'global'; slug: string; sections: Section[]; initial: Record<string, unknown>; title: string; previewHref?: string }

export function DocForm(props: Props) {
  const router = useRouter()
  const toast = useToast()
  const [data, setData] = useState<Record<string, unknown>>(props.initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dirty, setDirty] = useState(false)
  const [pending, start] = useTransition()

  const set = (name: string, value: unknown) => {
    setData((d) => ({ ...d, [name]: value }))
    setDirty(true)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    start(async () => {
      const res =
        props.kind === 'collection' ? await saveDocument(props.slug, props.id, data) : await saveGlobal(props.slug, data)
      setErrors(res.errors ?? {})
      toast(res.ok, res.message)
      if (!res.ok) return
      setDirty(false)
      if (props.kind === 'collection' && !props.id && res.id) router.replace(`/admin/collections/${props.slug}/${res.id}`)
      else router.refresh()
    })
  }

  const remove = () => {
    if (props.kind !== 'collection' || !props.id) return
    if (!window.confirm('Delete this permanently? This cannot be undone.')) return
    start(async () => {
      const res = await deleteDocument(props.slug, props.id!)
      toast(res.ok, res.message)
      if (res.ok) router.replace(props.backHref)
    })
  }

  return (
    <form onSubmit={submit} className="pb-24">
      <div className="sticky top-0 z-20 -mx-4 mb-6 flex flex-wrap items-center gap-3 border-b border-line bg-soft/90 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
        {props.kind === 'collection' && (
          <Link href={props.backHref} className="a-btn a-btn-ghost !px-2.5" aria-label="Back">
            <ArrowLeft size={18} />
          </Link>
        )}
        <h1 className="min-w-0 flex-1 truncate text-xl font-bold sm:text-2xl">{props.title}</h1>
        {dirty && <span className="hidden text-[13px] font-medium text-flame-500 sm:inline">Unsaved changes</span>}
        {props.previewHref && (
          <a href={props.previewHref} target="_blank" className="a-btn a-btn-ghost hidden sm:inline-flex">
            View on site
          </a>
        )}
        {props.kind === 'collection' && props.id && props.canDelete && (
          <button type="button" onClick={remove} className="a-btn a-btn-danger" disabled={pending}>
            <Trash size={16} /> Delete
          </button>
        )}
        <button className="a-btn a-btn-primary" disabled={pending}>
          <FloppyDisk size={17} weight="fill" /> {pending ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="space-y-6">
        {props.sections.map((section) => (
          <section key={section.title} className="a-card p-5 sm:p-7">
            <h2 className="text-[17px] font-bold">{section.title}</h2>
            {section.description && <p className="mt-1 text-[13.5px] text-mute">{section.description}</p>}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {section.fields.map((f) => (
                <FieldControl key={f.name} field={f} value={data[f.name]} data={data} errors={errors} onChange={(v) => set(f.name, v)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </form>
  )
}
