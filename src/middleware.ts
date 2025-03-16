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
  
  console.log(`[Middleware] Path: ${path}, Session exists: ${!!session}`)
  
  if (session) {
    console.log(`[Middleware] User ID: ${session.user.id}`)
    console.log(`[Middleware] User email: ${session.user.email}`)
    console.log(`[Middleware] User metadata:`, JSON.stringify(session.user.user_metadata))
  }

  // If user is not signed in and the current path is not /auth/*, redirect to /auth/signin
  if (!session && !path.startsWith('/auth/')) {
    console.log(`[Middleware] No session, redirecting to signin from ${path}`)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If user is signed in, check role-based access
  if (session) {
    const user = session.user
    const userRole = user.user_metadata?.role || null
    console.log(`[Middleware] User role: ${userRole}, path: ${path}`)

    // Handle root path redirect based on role
    if (path === '/' || path === '/dashboard') {
      if (userRole) {
        console.log(`[Middleware] Redirecting to ${userRole} dashboard`)
        // Use a 307 temporary redirect to ensure the redirect is followed
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url), 307)
      }
      console.log(`[Middleware] No user role, redirecting to signin`)
      return NextResponse.redirect(new URL('/auth/signin', request.url), 307)
    }

    // Check if user is trying to access a role-specific route
    const rolePatterns = ['admin', 'instructor', 'provider', 'student']
    
    for (const role of rolePatterns) {
      if (path.startsWith(`/${role}/`) || path === `/${role}`) {
        // If user doesn't have this role, redirect to their appropriate dashboard
        if (userRole !== role) {
          console.log(`[Middleware] User with role ${userRole} trying to access ${role} route`)
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