'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

export default function VerifyEmail() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      setLoading(false)
      return
    }

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Verification email resent. Please check your inbox.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <div className="mt-4 rounded-md bg-blue-50 p-4">
            <div className="text-sm text-blue-700">
              We've sent you an email with a link to verify your account. Please check your inbox and click the link to complete the registration process.
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            If you don't see the email, check your spam folder. If you still don't see it, you can request a new verification email.
          </p>
          
          {message && (
            <div className={`mt-4 rounded-md ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'} p-4`}>
              <div className={`text-sm ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {message.text}
              </div>
            </div>
          )}
          
          <form className="mt-6 space-y-4" onSubmit={handleResendEmail}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Sending...' : 'Resend verification email'}
            </button>
          </form>
          
          <div className="mt-6">
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 