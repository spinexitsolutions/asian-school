import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
  // MongoDB driver and sharp are Node-only; keep them out of the bundle.
  serverExternalPackages: ['mongodb', 'sharp'],
}

export default nextConfig
