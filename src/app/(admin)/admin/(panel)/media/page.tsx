import { MediaManager } from '@/components/admin/MediaManager'
import { requireUser } from '@/lib/auth'

export const metadata = { title: 'Media Library' }

export default async function MediaPage() {
  await requireUser()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Media Library</h1>
        <p className="text-[13.5px] text-mute">All photos and documents uploaded to the website. Upload here and reuse them anywhere.</p>
      </div>
      <MediaManager />
    </div>
  )
}
