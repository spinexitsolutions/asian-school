import { currentUser } from '@/lib/auth'
import { insertDoc } from '@/lib/db'
import { storeUpload } from '@/lib/storage'

export async function POST(request: Request) {
  if (!(await currentUser())) return Response.json({ error: 'Please log in again.' }, { status: 401 })
  const form = await request.formData()
  const files = form.getAll('file').filter((f): f is File => f instanceof File)
  if (!files.length) return Response.json({ error: 'No file received.' }, { status: 400 })
  try {
    const uploaded = []
    for (const file of files) {
      const media = await storeUpload(file)
      await insertDoc('media', media)
      uploaded.push(media)
    }
    return Response.json({ files: uploaded })
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : 'Upload failed' }, { status: 400 })
  }
}
