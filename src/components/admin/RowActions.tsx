'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { PencilSimple, Trash } from '@phosphor-icons/react'

import { deleteDocument, setEnquiryStatus } from '@/app/(admin)/admin/actions'
import { useToast } from './Toast'

export function RowActions({ slug, id, editHref, canDelete }: { slug: string; id: string; editHref: string; canDelete: boolean }) {
  const router = useRouter()
  const toast = useToast()
  const [pending, start] = useTransition()
  return (
    <div className="flex justify-end gap-1">
      <Link href={editHref} className="rounded-lg p-2 text-mute hover:bg-brand-50 hover:text-brand-600" aria-label="Edit">
        <PencilSimple size={17} />
      </Link>
      {canDelete && (
        <button
          type="button"
          disabled={pending}
          aria-label="Delete"
          className="rounded-lg p-2 text-mute hover:bg-laurel-50 hover:text-laurel-600"
          onClick={() => {
            if (!window.confirm('Delete this permanently?')) return
            start(async () => {
              const res = await deleteDocument(slug, id)
              toast(res.ok, res.message)
              router.refresh()
            })
          }}
        >
          <Trash size={17} />
        </button>
      )}
    </div>
  )
}

const options = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'visit', label: 'Visit scheduled' },
  { value: 'admitted', label: 'Admitted' },
  { value: 'closed', label: 'Closed' },
]

export function StatusSelect({ id, value }: { id: string; value: string }) {
  const toast = useToast()
  const router = useRouter()
  const [pending, start] = useTransition()
  return (
    <select
      defaultValue={value}
      disabled={pending}
      className="rounded-lg bg-soft px-2 py-1.5 text-[13px] font-semibold ring-1 ring-line"
      onChange={(e) => {
        const next = e.target.value
        start(async () => {
          const res = await setEnquiryStatus(id, next)
          toast(res.ok, res.message)
          router.refresh()
        })
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
