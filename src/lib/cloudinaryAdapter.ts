import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'

/**
 * Minimal Cloudinary storage adapter for Payload uploads.
 * Files are stored under `<folder>/<collection>/<filename-without-ext>` so a
 * file's public id can always be rebuilt from its filename.
 */
export const cloudinaryAdapter =
  ({ folder }: { folder: string }): Adapter =>
  ({ collection }) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    const publicIdFor = (filename: string) =>
      `${folder}/${collection.slug}/${filename.replace(path.extname(filename), '')}`

    // Images and videos keep their own resource type; PDFs and other files are "raw"
    // so Cloudinary serves them byte-for-byte.
    const resourceTypeFor = (filename: string) => {
      const ext = path.extname(filename).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'].includes(ext)) return 'image'
      if (['.mp4', '.webm', '.mov'].includes(ext)) return 'video'
      return 'raw'
    }

    const urlFor = (filename: string) => {
      const type = resourceTypeFor(filename)
      const ext = path.extname(filename)
      const id = publicIdFor(filename)
      return cloudinary.url(type === 'raw' ? `${id}${ext}` : id, {
        resource_type: type,
        format: type === 'raw' ? undefined : ext.replace('.', ''),
        secure: true,
      })
    }

    return {
      name: 'cloudinary',
      generateURL: ({ filename }) => urlFor(filename),
      handleUpload: async ({ file }) => {
        const type = resourceTypeFor(file.filename)
        const ext = path.extname(file.filename)
        const publicId = publicIdFor(file.filename)
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              public_id: type === 'raw' ? `${publicId}${ext}` : publicId,
              resource_type: type,
              overwrite: true,
            },
            (error, result) => (error ? reject(error) : resolve(result)),
          )
          stream.end(file.buffer)
        })
      },
      handleDelete: async ({ filename }) => {
        const type = resourceTypeFor(filename)
        const id = publicIdFor(filename)
        await cloudinary.uploader.destroy(type === 'raw' ? `${id}${path.extname(filename)}` : id, {
          resource_type: type,
        })
      },
      staticHandler: async (_req, { params }) => {
        const upstream = await fetch(urlFor(params.filename))
        if (!upstream.ok) return new Response('Not found', { status: 404 })
        return new Response(upstream.body, {
          headers: {
            'content-type': upstream.headers.get('content-type') ?? 'application/octet-stream',
            'cache-control': 'public, max-age=31536000, immutable',
          },
        })
      },
    }
  }
