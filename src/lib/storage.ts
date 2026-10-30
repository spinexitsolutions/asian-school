import 'server-only'

import { v2 as cloudinary } from 'cloudinary'
import { randomBytes } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

import type { Media } from '@/cms/types'

/** Uploaded files live here when Cloudinary isn't configured; served by /media/[...path]. */
export const UPLOAD_DIR = path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.UPLOAD_DIR || 'uploads')

const useCloudinary = () =>
  Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)

const MAX_BYTES = 20 * 1024 * 1024

const safeBase = (name: string) =>
  path
    .parse(name)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'file'

async function put(buffer: Buffer, filename: string, contentType: string): Promise<string> {
  if (useCloudinary()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    const isImage = contentType.startsWith('image/')
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'asian-school', public_id: isImage ? path.parse(filename).name : filename, resource_type: isImage ? 'image' : 'raw' },
          (err, res) => (err || !res ? reject(err) : resolve(res)),
        )
        .end(buffer)
    })
    return result.secure_url
  }
  const month = new Date().toISOString().slice(0, 7)
  const dir = path.join(UPLOAD_DIR, month)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), buffer)
  return `/media/${month}/${filename}`
}

/** Store an uploaded file. Images are converted to WebP with a thumbnail. */
export async function storeUpload(file: File): Promise<Media> {
  if (file.size > MAX_BYTES) throw new Error('File is larger than 20 MB')
  const buffer = Buffer.from(await file.arrayBuffer())
  const id = randomBytes(4).toString('hex')
  const base = `${safeBase(file.name)}-${id}`

  if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
    const image = sharp(buffer, { failOn: 'none' }).rotate()
    const main = await image.clone().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true })
    const thumb = await image.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer()
    const [url, thumbUrl] = await Promise.all([put(main.data, `${base}.webp`, 'image/webp'), put(thumb, `${base}-thumb.webp`, 'image/webp')])
    return { url, thumb: thumbUrl, width: main.info.width, height: main.info.height, alt: '', name: file.name, size: main.data.length, type: 'image/webp' }
  }

  const allowed = ['application/pdf', 'image/svg+xml', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowed.includes(file.type)) throw new Error('Only images, PDF and Word files can be uploaded')
  const ext = path.extname(file.name).toLowerCase() || '.pdf'
  const url = await put(buffer, `${base}${ext}`, file.type)
  return { url, name: file.name, size: file.size, type: file.type }
}

/* ───────────── Private documents (admission applications) ─────────────
   Kept outside the public uploads area and served only through /api/files
   to staff or to the parent holding the application's secret link. */

export const PRIVATE_DIR = path.join(UPLOAD_DIR, 'private')
const PRIVATE_MAX = 5 * 1024 * 1024

export async function storePrivate(file: File, kind: string): Promise<Media> {
  if (file.size > PRIVATE_MAX) throw new Error(`${kind}: file is larger than 5 MB`)
  const okType = file.type.startsWith('image/') || file.type === 'application/pdf'
  if (!okType || file.type === 'image/svg+xml') throw new Error(`${kind}: please upload a photo (JPG/PNG) or PDF`)
  const buffer = Buffer.from(await file.arrayBuffer())
  await mkdir(PRIVATE_DIR, { recursive: true })
  const id = randomBytes(16).toString('hex')

  if (file.type.startsWith('image/')) {
    const out = await sharp(buffer, { failOn: 'none' })
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true })
    await writeFile(path.join(PRIVATE_DIR, `${id}.webp`), out.data)
    return { url: `/api/files/${id}.webp`, name: file.name, size: out.data.length, type: 'image/webp', width: out.info.width, height: out.info.height }
  }
  // Check the PDF signature, not just the browser-reported type.
  if (buffer.subarray(0, 5).toString() !== '%PDF-') throw new Error(`${kind}: this file is not a valid PDF`)
  await writeFile(path.join(PRIVATE_DIR, `${id}.pdf`), buffer)
  return { url: `/api/files/${id}.pdf`, name: file.name, size: file.size, type: 'application/pdf' }
}
