import { MongoClient, ObjectId, type Db, type Filter, type Document, type Sort } from 'mongodb'

/** Local MongoDB is used until an Atlas link is put in DATABASE_URI. */
const uri = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/asian-school'

const cache = globalThis as unknown as { __mongo?: Promise<MongoClient> }

function client() {
  if (!cache.__mongo) {
    cache.__mongo = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect().catch((err) => {
      // Allow the next request to retry instead of caching the failure.
      cache.__mongo = undefined
      throw err
    })
  }
  return cache.__mongo
}

export async function db(): Promise<Db> {
  if (uri.startsWith('memory://')) return memoryDb() as unknown as Db
  const c = await client()
  return c.db(process.env.DATABASE_NAME || undefined)
}

/* ───────────── In-memory store (automated tests only) ─────────────
   DATABASE_URI=memory:// runs the app without a MongoDB server. Data is lost
   on restart, so never use it for the real site. Supports just the queries
   this app makes. */

type Row = Record<string, unknown> & { _id: unknown }
const mem = globalThis as unknown as { __memDb?: Map<string, Row[]> }

function matches(row: Row, filter: Record<string, unknown>): boolean {
  return Object.entries(filter).every(([key, cond]) => {
    if (key === '$or') return (cond as Record<string, unknown>[]).some((f) => matches(row, f))
    const value = key === '_id' ? String(row._id) : row[key]
    if (cond && typeof cond === 'object' && !Array.isArray(cond) && !(cond instanceof ObjectId)) {
      const c = cond as Record<string, unknown>
      if ('$exists' in c) return (value !== undefined) === Boolean(c.$exists)
      if ('$ne' in c) return value !== c.$ne
      if ('$regex' in c) return new RegExp(String(c.$regex), String(c.$options ?? '')).test(String(value ?? ''))
      if ('$not' in c) return !new RegExp(String((c.$not as { $regex: string }).$regex)).test(String(value ?? ''))
    }
    return key === '_id' ? value === String(cond) : value === cond
  })
}

function memoryDb() {
  mem.__memDb ??= new Map()
  const store = mem.__memDb
  const rows = (name: string) => {
    if (!store.has(name)) store.set(name, [])
    return store.get(name)!
  }
  return {
    collection(name: string) {
      const all = () => rows(name)
      return {
        find(filter: Record<string, unknown>) {
          let list = all().filter((r) => matches(r, filter))
          const cursor = {
            sort(sort: Record<string, 1 | -1>) {
              const keys = Object.entries(sort)
              list = [...list].sort((a, b) => {
                for (const [k, dir] of keys) {
                  const av = a[k] as never, bv = b[k] as never
                  if (av === bv) continue
                  if (av == null) return 1
                  if (bv == null) return -1
                  return (av > bv ? 1 : -1) * dir
                }
                return 0
              })
              return cursor
            },
            skip(n: number) { list = list.slice(n); return cursor },
            limit(n: number) { list = list.slice(0, n); return cursor },
            toArray: async () => list.map((r) => ({ ...r })),
          }
          return cursor
        },
        findOne: async (filter: Record<string, unknown>) => all().find((r) => matches(r, filter)) ?? null,
        countDocuments: async (filter: Record<string, unknown> = {}) => all().filter((r) => matches(r, filter)).length,
        insertOne: async (doc: Record<string, unknown>) => {
          const _id = new ObjectId()
          all().push({ ...doc, _id })
          return { insertedId: _id }
        },
        updateOne: async (filter: Record<string, unknown>, update: { $set: Record<string, unknown> }, opts?: { upsert?: boolean }) => {
          const row = all().find((r) => matches(r, filter))
          if (row) Object.assign(row, update.$set)
          else if (opts?.upsert) all().push({ ...filter, ...update.$set } as Row)
        },
        deleteOne: async (filter: Record<string, unknown>) => {
          const list = all()
          const i = list.findIndex((r) => matches(r, filter))
          if (i >= 0) list.splice(i, 1)
        },
        createIndex: async () => undefined,
      }
    },
  }
}

export const now = () => new Date().toISOString()

/** Mongo document → plain object with a string `id` (safe to pass to client components). */
export function serialize<T = Record<string, unknown>>(raw: Document | null): T | null {
  if (!raw) return null
  const { _id, passwordHash: _hidden, ...rest } = raw
  return JSON.parse(JSON.stringify({ id: String(_id), ...rest })) as T
}

const idFilter = (id: string): Filter<Document> => (ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id as never })

export async function findMany<T>(
  collection: string,
  opts: { filter?: Filter<Document>; sort?: Sort; limit?: number; skip?: number } = {},
) {
  const col = (await db()).collection(collection)
  const filter = opts.filter ?? {}
  const [docs, total] = await Promise.all([
    col
      .find(filter)
      .sort(opts.sort ?? { createdAt: -1 })
      .skip(opts.skip ?? 0)
      .limit(opts.limit ?? 100)
      .toArray(),
    col.countDocuments(filter),
  ])
  return { docs: docs.map((d) => serialize<T>(d)!) as T[], total }
}

/** Raw document including private fields (password hash). Server use only. */
export async function findRaw(collection: string, filter: Filter<Document>) {
  return (await db()).collection(collection).findOne(filter)
}

export async function findOne<T>(collection: string, filter: Filter<Document>) {
  return serialize<T>(await (await db()).collection(collection).findOne(filter))
}

export async function findById<T>(collection: string, id: string) {
  return findOne<T>(collection, idFilter(id))
}

export async function count(collection: string, filter: Filter<Document> = {}) {
  return (await db()).collection(collection).countDocuments(filter)
}

export async function insertDoc(collection: string, data: Record<string, unknown>) {
  const doc = { ...data, createdAt: now(), updatedAt: now() }
  const res = await (await db()).collection(collection).insertOne(doc)
  return String(res.insertedId)
}

export async function updateDoc(collection: string, id: string, data: Record<string, unknown>) {
  await (await db()).collection(collection).updateOne(idFilter(id), { $set: { ...data, updatedAt: now() } })
}

export async function deleteDoc(collection: string, id: string) {
  await (await db()).collection(collection).deleteOne(idFilter(id))
}

/** Settings pages ("globals") live in one collection, keyed by slug. */
export async function getGlobalDoc<T = Record<string, unknown>>(slug: string) {
  const doc = await (await db()).collection<{ _id: string }>('globals').findOne({ _id: slug })
  if (!doc) return null
  const { _id, ...rest } = doc
  return JSON.parse(JSON.stringify(rest)) as T
}

export async function setGlobalDoc(slug: string, data: Record<string, unknown>) {
  await (await db())
    .collection<{ _id: string }>('globals')
    .updateOne({ _id: slug }, { $set: { ...data, updatedAt: now() } }, { upsert: true })
}
