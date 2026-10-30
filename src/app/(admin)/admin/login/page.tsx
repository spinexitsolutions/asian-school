import Image from 'next/image'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/admin/LoginForm'
import { currentUser } from '@/lib/auth'
import { count } from '@/lib/db'

export const metadata = { title: 'Login' }
export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  let setup = false
  let dbError = false
  try {
    if (await currentUser()) redirect('/admin')
    setup = (await count('users', { passwordHash: { $exists: true } })) === 0
  } catch (err) {
    if ((err as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) throw err
    dbError = true
  }

  return (
    <main className="grid min-h-[100dvh] lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-brand-900 lg:block">
        <Image src="/images/campus.webp" alt="" fill priority sizes="50vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/70 to-brand-700/50" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-1">
              <Image src="/images/logo.png" alt="" width={52} height={52} className="rounded-full" />
            </span>
            <div>
              <p className="font-heading text-lg font-bold">The Asian International School</p>
              <p className="text-sm text-white/70">Chomu, Jaipur</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-flame-400">Admin Panel</p>
            <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight">Manage the whole website from one place.</h1>
            <p className="mt-4 max-w-md text-white/75">Notices, news, gallery, toppers, admissions enquiries, pages and settings — all changes go live instantly.</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-10 rounded-full bg-brand-500" />
            <span className="h-1.5 w-5 rounded-full bg-laurel-500" />
            <span className="h-1.5 w-2.5 rounded-full bg-flame-400" />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm">
          <Image src="/images/logo.png" alt="" width={64} height={64} className="mb-6 lg:hidden" />
          <h2 className="text-2xl font-bold">{setup ? 'Create the admin account' : 'Welcome back'}</h2>
          <p className="mt-1.5 text-[15px] text-mute">
            {setup ? 'First time here — set up the main administrator.' : 'Sign in to manage the school website.'}
          </p>
          {dbError ? (
            <div className="mt-8 rounded-xl bg-laurel-50 p-4 text-[14px] text-laurel-600">
              <p className="font-semibold">Database is not reachable.</p>
              <p className="mt-1">
                Start the local database with <code className="font-mono">npm run db:local</code> or set <code className="font-mono">DATABASE_URI</code> in the .env file, then refresh.
              </p>
            </div>
          ) : (
            <LoginForm setup={setup} />
          )}
          <a href="/" className="mt-8 inline-block text-[14px] font-medium text-brand-600 hover:underline">
            ← Back to website
          </a>
        </div>
      </section>
    </main>
  )
}
