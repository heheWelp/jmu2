'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Only run once the router is ready and we have access to query params
    if (!router.isReady) return
    
    const handleAuthCallback = async () => {
      try {
        setLoading(true)
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        // Get code from URL
        const { code, error_description } = router.query
        
        if (error_description) {
          console.error('Error in auth callback:', error_description)
          setError(error_description as string)
          return
        }
        
        if (!code) {
          console.error('No code in URL')
          setError('No authentication code found in the URL')
          return
        }
        
        // Exchange code for session
        const { error } = await supabase.auth.exchangeCodeForSession(code as string)
        
        if (error) {
          console.error('Error exchanging code for session:', error)
          setError(error.message)
          return
        }
        
        // Get the current session after exchange
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session && session.user) {
          const role = session.user.user_metadata?.role || 'student'
          console.log(`[Callback] Authentication successful for ${session.user.email}`)
          console.log(`[Callback] User role: ${role}`)
          console.log(`[Callback] Redirecting to /${role}/dashboard`)
          
          // Add a small delay to ensure session is properly established
          setTimeout(() => {
            window.location.href = `/${role}/dashboard`
          }, 500)
        } else {
          console.log('[Callback] Session exchange successful but no user data available')
          window.location.href = '/auth/signin'
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err)
        setError('An unexpected error occurred during authentication')
      } finally {
        setLoading(false)
      }
    }
    
    handleAuthCallback()
  }, [router.isReady, router.query])
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Authentication Error</h2>
            <p className="mt-2 text-gray-600">{error}</p>
          </div>
          <div className="flex justify-center">
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-medium">
              Return to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Processing...</h2>
          <p className="mt-2 text-gray-600">Please wait while we complete your authentication.</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  )
} 