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
  | {
      kind: 'collection'
      slug: string
      id: string | null
      sections: Section[]
      initial: Record<string, unknown>
      title: string
      backHref: string
      canDelete: boolean
      previewHref?: string
    }
  | { kind: 'global'; slug: string; sections: Section[]; initial: Record<string, unknown>; title: string; previewHref?: string; description?: string }

/** The "Show this section / page" checkbox of a section, shown as a switch in its header. */
const toggleOf = (section: Section) => section.fields.find((f) => f.type === 'checkbox' && /(Show|Enabled)$/.test(f.name) && section.fields.indexOf(f) === 0)

const anchor = (title: string) => `sec-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

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
      const res = props.kind === 'collection' ? await saveDocument(props.slug, props.id, data) : await saveGlobal(props.slug, data)
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

      {props.kind === 'global' && props.description && <p className="-mt-2 mb-5 max-w-3xl text-[14px] text-mute">{props.description}</p>}

      {props.sections.length > 3 && (
        <nav aria-label="Sections" className="mb-6 flex flex-wrap gap-2">
          {props.sections.map((section) => {
            const toggle = toggleOf(section)
            const off = toggle && data[toggle.name] === false
            return (
              <a
                key={section.title}
                href={`#${anchor(section.title)}`}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold ring-1 transition-colors ${
                  off ? 'bg-white text-mute line-through ring-line' : 'bg-white text-ink ring-line hover:text-brand-600 hover:ring-brand-200'
                }`}
              >
                {section.title.split('  ·  ')[0]}
              </a>
            )
          })}
        </nav>
      )}

      <div className="space-y-6">
        {props.sections.map((section) => {
          const toggle = toggleOf(section)
          const on = !toggle || data[toggle.name] !== false
          const isPage = toggle?.name.endsWith('Enabled')
          return (
            <section key={section.title} id={anchor(section.title)} className={`a-card scroll-mt-24 p-5 sm:p-7 ${on ? '' : 'bg-soft/60'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[17px] font-bold">
                    {section.title}
                    {!on && (
                      <span className="ml-2 rounded-full bg-laurel-50 px-2 py-0.5 align-middle text-[11.5px] font-semibold text-laurel-600">
                        Hidden on website
                      </span>
                    )}
                  </h2>
                  {section.description && <p className="mt-1 text-[13.5px] text-mute">{section.description}</p>}
                </div>
                {toggle && (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => set(toggle.name, !on)}
                    className="flex shrink-0 items-center gap-2.5 text-[13px] font-semibold text-ink-2"
                  >
                    {on ? (isPage ? 'Page on' : 'Shown') : isPage ? 'Page off' : 'Hidden'}
                    <span className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-leaf-500' : 'bg-line'}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
                    </span>
                  </button>
                )}
              </div>
              {section.fields.length > (toggle ? 1 : 0) && (
                <div className={`mt-5 grid gap-5 sm:grid-cols-2 ${on ? '' : 'opacity-60'}`}>
                  {section.fields
                    .filter((f) => f !== toggle)
                    .map((f) => (
                      <FieldControl key={f.name} field={f} value={data[f.name]} data={data} errors={errors} onChange={(v) => set(f.name, v)} />
                    ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </form>
  )
}
