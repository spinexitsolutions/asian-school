import { ChangePasswordForm } from '@/components/admin/ChangePasswordForm'
import { requireUser } from '@/lib/auth'

export const metadata = { title: 'My account' }

export default async function AccountPage() {
  const user = await requireUser()
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">My account</h1>
      <div className="a-card p-6">
        <p className="text-[13px] text-mute">Signed in as</p>
        <p className="mt-1 text-lg font-semibold">{user.name}</p>
        <p className="text-[14px] text-ink-2">
          {user.email} · <span className="capitalize">{user.role}</span>
        </p>
      </div>
      <div className="a-card p-6">
        <h2 className="text-lg font-bold">Change password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  )
}
