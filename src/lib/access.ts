import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'

const hasRole = (user: unknown, roles: Role[]) =>
  Boolean(user && roles.includes((user as { role?: Role }).role ?? 'editor'))

export const anyone: Access = () => true
export const loggedIn: Access = ({ req }) => Boolean(req.user)
export const adminOnly: Access = ({ req }) => hasRole(req.user, ['admin'])
export const adminOnlyField: FieldAccess = ({ req }) => hasRole(req.user, ['admin'])

/** Public sees published docs only; logged-in staff see everything. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
