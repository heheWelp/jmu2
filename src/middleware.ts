import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = [
    '/',
    '/dashboard',
    '/manage-users',
    '/manage-users/*',
    '/manage-content',
    '/manage-content/*',
    '/reports',
    '/reports/*',
    '/tag-talk',
    '/tag-talk/*',
    '/settings',
    '/settings/*',
  ]

  // Check if the current path matches any protected route pattern
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.endsWith('/*')) {
      const basePath = route.slice(0, -2)
      return req.nextUrl.pathname.startsWith(basePath)
    }
    return req.nextUrl.pathname === route
  })

  // If accessing a protected route without a session, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/manage-users/:path*',
    '/manage-content/:path*',
    '/reports/:path*',
    '/tag-talk/:path*',
    '/settings/:path*',
  ],
} 