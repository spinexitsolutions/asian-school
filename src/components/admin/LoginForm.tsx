'use client'

import { useActionState, useState } from 'react'
import { Eye, EyeSlash, SignIn } from '@phosphor-icons/react'

import { login, setupAdmin } from '@/app/(admin)/admin/actions'

export function LoginForm({ setup }: { setup: boolean }) {
  const [state, action, pending] = useActionState(setup ? setupAdmin : login, null)
  const [show, setShow] = useState(false)
  return (
    <form action={action} className="mt-8 space-y-4">
      {setup && (
        <label className="block">
          <span className="a-label">Your name</span>
          <input name="name" required className="a-input !py-3" autoComplete="name" />
        </label>
      )}
      <label className="block">
        <span className="a-label">Email</span>
        <input name="email" type="email" required className="a-input !py-3" autoComplete="email" />
      </label>
      <label className="block">
        <span className="a-label">Password{setup && ' (min. 8 characters)'}</span>
        <span className="relative block">
          <input name="password" type={show ? 'text' : 'password'} required minLength={setup ? 8 : undefined} className="a-input !py-3 pr-11" autoComplete={setup ? 'new-password' : 'current-password'} />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mute" aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeSlash size={18} /> : <Eye size={18} />}
          </button>
        </span>
      </label>
      {state && !state.ok && <p className="rounded-lg bg-laurel-50 px-3 py-2 text-[14px] font-medium text-laurel-600">{state.message}</p>}
      <button disabled={pending} className="a-btn a-btn-primary w-full !py-3 !text-[15px]">
        <SignIn size={18} weight="bold" /> {pending ? 'Please wait…' : setup ? 'Create account & sign in' : 'Sign in'}
      </button>
    </form>
  )
}
