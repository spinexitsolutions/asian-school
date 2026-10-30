'use client'

import { useActionState } from 'react'
import clsx from 'clsx'
import { CheckCircle, PaperPlaneTilt, WarningCircle } from '@phosphor-icons/react'

import { submitEnquiry, type EnquiryState } from '@/lib/actions/enquiry'

const classes = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI – Science', 'Class XI – Commerce', 'Class XI – Arts']

const initial: EnquiryState = { ok: false, message: '' }

export function EnquiryForm({ type = 'admission', compact = false }: { type?: 'admission' | 'contact'; compact?: boolean }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial)
  const err = state.errors ?? {}

  if (state.ok) {
    return (
      <div className={clsx('flex flex-col items-center gap-4 rounded-2xl bg-leaf-500/10 px-6 text-center ring-1 ring-leaf-500/20', compact ? 'py-10' : 'py-12')}>
        <CheckCircle size={56} weight="fill" className="text-leaf-500" />
        <p className="font-heading text-xl font-semibold text-ink">{state.message}</p>
      </div>
    )
  }

  const admission = type === 'admission'
  return (
    <form action={action} className={clsx('grid', compact ? 'gap-3' : 'gap-4 sm:grid-cols-2')} noValidate>
      <input type="hidden" name="type" value={type} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Field label={admission ? 'Student name *' : 'Your name *'} error={err.studentName}>
        <input name="studentName" className="input" placeholder={admission ? "Child's full name" : 'Full name'} required />
      </Field>
      {admission ? (
        <Field label="Parent / Guardian name" error={err.parentName}>
          <input name="parentName" className="input" placeholder="Father / Mother name" />
        </Field>
      ) : (
        <Field label="Email" error={err.email}>
          <input name="email" type="email" className="input" placeholder="you@example.com" />
        </Field>
      )}
      <Field label="Mobile number *" error={err.phone}>
        <input name="phone" type="tel" inputMode="tel" className="input" placeholder="10-digit mobile number" required />
      </Field>
      {admission ? (
        <Field label="Class applying for *" error={err.classApplying}>
          <select name="classApplying" className="input" defaultValue="" required>
            <option value="" disabled>
              Select class
            </option>
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      ) : (
        <Field label="Subject">
          <input name="classApplying" className="input" placeholder="e.g. Transport, Fee, General" />
        </Field>
      )}
      {admission && !compact && (
        <Field label="Email" error={err.email} className="sm:col-span-2">
          <input name="email" type="email" className="input" placeholder="you@example.com (optional)" />
        </Field>
      )}
      {!compact && (
      <Field label="Message" className="sm:col-span-2">
        <textarea name="message" rows={4} className="input resize-none" placeholder={admission ? 'Any question about admission (optional)' : 'How can we help you?'} />
      </Field>
      )}
      {state.message && !state.ok && (
        <p className="flex items-center gap-2 text-[14px] font-medium text-laurel-600 sm:col-span-2">
          <WarningCircle size={18} weight="fill" /> {state.message}
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={clsx('btn w-full !py-4', compact ? 'btn-red' : 'btn-primary sm:w-auto', pending && 'opacity-70')}>
          {pending ? 'Sending…' : admission ? 'Submit Enquiry' : 'Send Message'} <PaperPlaneTilt size={18} weight="fill" />
        </button>
        <p className="mt-2.5 text-[12px] leading-snug text-mute">
          By submitting, you agree to our{' '}
          <a href="/privacy-policy" target="_blank" className="underline hover:text-brand-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}

function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={clsx('block', className)}>
      <span className="mb-1.5 block text-[13.5px] font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[13px] text-laurel-600">{error}</span>}
    </label>
  )
}
