import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default async function Home() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  console.log('[Root] Checking session:', !!session)
  
  if (session && session.user) {
    const userRole = session.user.user_metadata?.role || 'admin'
    console.log(`[Root] User authenticated with role: ${userRole}, redirecting to /${userRole}/dashboard`)
    console.log(`[Root] User email: ${session.user.email}`)
    console.log(`[Root] User metadata:`, JSON.stringify(session.user.user_metadata))
    
    // Use a 307 temporary redirect to ensure the redirect is followed
    return redirect(`/${userRole}/dashboard`)
  }
  
  console.log('[Root] No session, redirecting to signin')
  return redirect('/auth/signin')
}
