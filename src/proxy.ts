import { NextResponse, type NextRequest } from 'next/server'

/**
 * Optimistic check only: send visitors without a session cookie to the login
 * page. Every admin page and action still verifies the session on the server.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/admin/login') return NextResponse.next()
  if (!request.cookies.has('ais_session')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
