'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { CheckCircle, FilePdf, PaperPlaneTilt, UploadSimple, WarningCircle, X } from '@phosphor-icons/react'

const classes = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI – Science', 'Class XI – Commerce', 'Class XI – Arts']

const docs = [
  { name: 'photo', label: 'Student photo', hint: 'Passport-size photo (JPG/PNG)', required: true, accept: 'image/*' },
  { name: 'birthCertificate', label: 'Birth certificate', hint: 'Photo or PDF', required: true, accept: 'image/*,application/pdf' },
  { name: 'reportCard', label: 'Previous report card', hint: 'Class I onwards', required: false, accept: 'image/*,application/pdf' },
  { name: 'transferCertificate', label: 'Transfer certificate', hint: 'Class II onwards (if available)', required: false, accept: 'image/*,application/pdf' },
  { name: 'aadhaarCard', label: 'Aadhaar card of student', hint: 'Optional', required: false, accept: 'image/*,application/pdf' },
]

const MAX = 5 * 1024 * 1024

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6 sm:p-8" data-reveal>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-heading font-bold text-white">{n}</span>
        <h2 className="heading-md !text-[1.35rem]">{title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}

function Field({ label, error, required, wide, children }: { label: string; error?: string; required?: boolean; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={clsx('block', wide && 'sm:col-span-2')}>
      <span className="mb-1.5 block text-[13.5px] font-semibold text-ink">
        {label}
        {required && <span className="text-laurel-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[13px] font-medium text-laurel-600">{error}</span>}
    </label>
  )
}

function DocInput({ doc, error, onError }: { doc: (typeof docs)[number]; error?: string; onError: (msg: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  return (
    <div className={clsx('rounded-2xl border-2 border-dashed p-4 transition-colors', error ? 'border-laurel-500/60 bg-laurel-50/50' : file ? 'border-leaf-500/50 bg-leaf-500/5' : 'border-line bg-soft/60')}>
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-line">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : file ? (
            <FilePdf size={28} className="text-laurel-600" />
          ) : (
            <UploadSimple size={24} className="text-brand-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold">
            {doc.label}
            {doc.required && <span className="text-laurel-500"> *</span>}
          </p>
          <p className="truncate text-[12.5px] text-mute">{file ? file.name : doc.hint}</p>
        </div>
        {file ? (
          <button
            type="button"
            aria-label="Remove file"
            className="rounded-full p-2 text-mute hover:bg-white hover:text-laurel-600"
            onClick={() => {
              setFile(null)
              setPreview(null)
              if (ref.current) ref.current.value = ''
            }}
          >
            <X size={18} weight="bold" />
          </button>
        ) : (
          <button type="button" onClick={() => ref.current?.click()} className="btn btn-outline !px-4 !py-2 !text-[13px]">
            Choose
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        name={doc.name}
        accept={doc.accept}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null
          if (f && f.size > MAX) {
            onError('File is larger than 5 MB')
            e.target.value = ''
            return
          }
          onError(null)
          setFile(f)
          setPreview(f && f.type.startsWith('image/') ? URL.createObjectURL(f) : null)
        }}
      />
      {error && <p className="mt-2 text-[13px] font-medium text-laurel-600">{error}</p>}
    </div>
  )
}

export function ApplyForm({ session, stops }: { session: string; stops: string[] }) {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [transport, setTransport] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setMessage(null)
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: new FormData(e.currentTarget) })
      const json = await res.json()
      if (!res.ok) {
        setErrors(json.errors ?? {})
        setMessage(json.error ?? 'Something went wrong. Please try again.')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      router.push(`/admissions/application/${json.applicationNo}?t=${json.token}&new=1`)
    } catch {
      setMessage('Network problem. Please check your internet and try again.')
    } finally {
      setPending(false)
    }
  }

  const err = errors
  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {message && (
        <p className="flex items-center gap-2 rounded-2xl bg-laurel-50 px-5 py-4 text-[15px] font-medium text-laurel-600 ring-1 ring-laurel-500/20">
          <WarningCircle size={22} weight="fill" /> {message}
        </p>
      )}

      <Section n={1} title="Student details">
        <Field label="Student's full name" required error={err.studentName}>
          <input name="studentName" className="input" placeholder="As per birth certificate" />
        </Field>
        <Field label={`Class applying for (${session})`} required error={err.classApplying}>
          <select name="classApplying" className="input" defaultValue="">
            <option value="" disabled>
              Select class
            </option>
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Date of birth" required error={err.dob}>
          <input name="dob" type="date" className="input" />
        </Field>
        <Field label="Gender" required error={err.gender}>
          <select name="gender" className="input" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Blood group">
          <input name="bloodGroup" className="input" placeholder="e.g. B+" />
        </Field>
        <Field label="Category">
          <select name="category" className="input" defaultValue="">
            <option value="">Select</option>
            {['General', 'OBC', 'SC', 'ST', 'EWS', 'Other'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Religion">
          <input name="religion" className="input" />
        </Field>
        <Field label="Previous school (if any)">
          <input name="previousSchool" className="input" />
        </Field>
        <Field label="Previous class & result" wide>
          <input name="previousClass" className="input" placeholder="e.g. Class IV – 86%" />
        </Field>
      </Section>

      <Section n={2} title="Parent / guardian details">
        <Field label="Father's / guardian's name" required error={err.fatherName}>
          <input name="fatherName" className="input" />
        </Field>
        <Field label="Father's occupation">
          <input name="fatherOccupation" className="input" />
        </Field>
        <Field label="Father's mobile number" required error={err.fatherPhone}>
          <input name="fatherPhone" type="tel" inputMode="tel" className="input" placeholder="10-digit mobile number" />
        </Field>
        <Field label="Mother's name">
          <input name="motherName" className="input" />
        </Field>
        <Field label="Mother's occupation">
          <input name="motherOccupation" className="input" />
        </Field>
        <Field label="Mother's mobile number" error={err.motherPhone}>
          <input name="motherPhone" type="tel" inputMode="tel" className="input" />
        </Field>
        <Field label="Email" error={err.email}>
          <input name="email" type="email" className="input" placeholder="Optional" />
        </Field>
        <Field label="Need school transport?">
          <select name="transport" className="input" defaultValue="no" onChange={(e) => setTransport(e.target.value === 'yes')}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
        {transport && (
          <Field label="Preferred bus stop" wide>
            <input name="transportStop" list="bus-stops" className="input" placeholder="Choose or type your stop" />
            <datalist id="bus-stops">
              {stops.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Field>
        )}
        <Field label="Full address" required wide error={err.address}>
          <textarea name="address" rows={3} className="input resize-none" />
        </Field>
      </Section>

      <Section n={3} title="Documents">
        <p className="-mt-2 text-[14px] text-ink-2 sm:col-span-2">Upload a clear photo or PDF of each document (max 5 MB each). Originals will be checked at the school office.</p>
        {docs.map((d) => (
          <DocInput key={d.name} doc={d} error={err[d.name]} onError={(m) => setErrors((x) => ({ ...x, [d.name]: m ?? '' }))} />
        ))}
      </Section>

      <section className="card p-6 sm:p-8" data-reveal>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-heading font-bold text-white">4</span>
          <h2 className="heading-md !text-[1.35rem]">Declaration</h2>
        </div>
        <label className="flex items-start gap-3 text-[15px] text-ink-2">
          <input type="checkbox" name="declaration" value="yes" className="mt-1 h-5 w-5 shrink-0 accent-brand-600" />
          <span>
            I declare that the information given above is correct. I understand that admission is subject to availability of seats, the interaction / test and
            verification of original documents, and I agree to follow the rules of the school. I have read the{' '}
            <a href="/privacy-policy" target="_blank" className="font-semibold text-brand-600 underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {err.declaration && <p className="mt-2 text-[13px] font-medium text-laurel-600">{err.declaration}</p>}
        <button disabled={pending} className={clsx('btn btn-red mt-7 w-full !py-4 !text-[16px] sm:w-auto sm:!px-10', pending && 'opacity-70')}>
          {pending ? (
            'Submitting, please wait…'
          ) : (
            <>
              Submit Application <PaperPlaneTilt size={18} weight="fill" />
            </>
          )}
        </button>
        <p className="mt-3 flex items-center gap-1.5 text-[13px] text-mute">
          <CheckCircle size={16} weight="fill" className="text-leaf-500" /> You will get an application number and a printable form right after submitting.
        </p>
      </section>
    </form>
  )
}
