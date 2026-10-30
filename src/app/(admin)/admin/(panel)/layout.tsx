import { collections, globals } from '@/cms/schema'
import { Sidebar, type NavGroup } from '@/components/admin/Sidebar'
import { ToastProvider } from '@/components/admin/Toast'
import { requireUser } from '@/lib/auth'
import { count } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  const [newEnquiries, newApplications] = await Promise.all([
    count('enquiries', { status: 'new' }).catch(() => 0),
    count('applications', { status: 'received' }).catch(() => 0),
  ])

  const order = ['Inbox', 'Updates', 'School', 'Pages', 'CBSE Corner', 'Settings']
  const groups: NavGroup[] = [{ title: 'Overview', items: [{ href: '/admin', label: 'Dashboard', icon: 'dashboard' }] }]
  for (const title of order) {
    const items: NavGroup['items'] = [
      ...collections
        .filter((c) => c.group === title && (!c.adminOnly || user.role === 'admin'))
        .map((c) => ({ href: `/admin/collections/${c.slug}`, label: c.label, icon: c.icon, badge: c.slug === 'enquiries' ? newEnquiries : c.slug === 'applications' ? newApplications : undefined })),
      ...globals.filter((g) => g.group === title).map((g) => ({ href: `/admin/globals/${g.slug}`, label: g.label, icon: g.icon })),
    ]
    if (title === 'Updates') items.push({ href: '/admin/media', label: 'Media Library', icon: 'media', badge: undefined })
    if (items.length) groups.push({ title, items })
  }

  return (
    <ToastProvider>
      <Sidebar groups={groups} user={{ name: user.name, email: user.email, role: user.role }} />
      <main className="min-h-[100dvh] px-4 py-6 sm:px-8 lg:ml-[272px] lg:py-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </ToastProvider>
  )
}
