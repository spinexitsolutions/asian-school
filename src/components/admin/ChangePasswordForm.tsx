'use client'

import { useActionState } from 'react'

import { changePassword } from '@/app/(admin)/admin/actions'

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, null)
  return (
    <form action={action} className="mt-4 space-y-4">
      <label className="block">
        <span className="a-label">Current password</span>
        <input name="current" type="password" required className="a-input" autoComplete="current-password" />
      </label>
      <label className="block">
        <span className="a-label">New password (min. 8 characters)</span>
        <input name="next" type="password" required minLength={8} className="a-input" autoComplete="new-password" />
      </label>
      {state && <p className={state.ok ? 'text-[14px] font-medium text-leaf-500' : 'text-[14px] font-medium text-laurel-600'}>{state.message}</p>}
      <button className="a-btn a-btn-primary" disabled={pending}>
        {pending ? 'Saving…' : 'Update password'}
      </button>
    </form>
  )
}
