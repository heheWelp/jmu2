import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const path = request.nextUrl.pathname
  
  // Only log on non-authenticated paths or redirects
  if (!session && !path.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If user is signed in, check role-based access
  if (session) {
    const user = session.user
    const userRole = user.user_metadata?.role || null

    // Handle root path redirect based on role
    if (path === '/' || path === '/dashboard') {
      if (userRole) {
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url), 307)
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url), 307)
    }

    // Check if user is trying to access a role-specific route
    const rolePatterns = ['admin', 'instructor', 'provider', 'student']
    
    for (const role of rolePatterns) {
      if (path.startsWith(`/${role}/`) || path === `/${role}`) {
        // If user doesn't have this role, redirect to their appropriate dashboard
        if (userRole !== role) {
          if (userRole) {
            return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url), 307)
          }
          return NextResponse.redirect(new URL('/auth/signin', request.url), 307)
        }
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/admin/:path*',
    '/instructor/:path*',
    '/provider/:path*',
    '/student/:path*',
    '/auth/:path*',
  ],
} 