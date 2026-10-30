/**
 * Starts a MongoDB server on this computer for local development, so the
 * site and admin panel work before a MongoDB Atlas link is configured.
 * No separate MongoDB install is needed: the server binary is downloaded
 * once (~100 MB) on first run. Data is kept in ./.mongo-data between runs.
 *
 *   npm run db:local      (keep this running, then `npm run dev` in another terminal)
 */
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { MongoMemoryServer } from 'mongodb-memory-server-core'

const dbPath = path.resolve('.mongo-data')
mkdirSync(dbPath, { recursive: true })

const server = await MongoMemoryServer.create({
  instance: { port: 27017, ip: '127.0.0.1', dbPath, storageEngine: 'wiredTiger' },
})

console.log('\n✔ Local MongoDB is running')
console.log(`  DATABASE_URI=${server.getUri('asian-school')}`)
console.log(`  Data folder: ${dbPath}`)
console.log('  Press Ctrl+C to stop.\n')

const stop = async () => {
  await server.stop({ doCleanup: false })
  process.exit(0)
}
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
