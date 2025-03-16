'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function TestAuth() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true)
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '[Set]' : '[Not Set]')
        
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setError(error.message)
          return
        }
        
        console.log('Session data:', data)
        setSession(data.session)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    checkSession()
  }, [])

  const handleRedirect = () => {
    if (session && session.user) {
      const userRole = session.user.user_metadata?.role || 'admin'
      console.log(`Redirecting to /${userRole}/dashboard`)
      window.location.href = `/${userRole}/dashboard`
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Auth Test Page</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">
                {session ? 'User is authenticated' : 'User is not authenticated'}
              </div>
            </div>
            
            {session && (
              <div className="space-y-2">
                <p><strong>User ID:</strong> {session.user.id}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Role:</strong> {session.user.user_metadata?.role || 'No role'}</p>
                
                <div className="pt-4">
                  <button
                    onClick={handleRedirect}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
            
            <div className="pt-4 text-center">
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800">
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 