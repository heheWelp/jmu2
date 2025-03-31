import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Function to get the current user's profile data
export async function getProfileData(userId: string) {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

// Function to get all education levels
export async function getEducationLevels() {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data, error } = await supabase
    .from('education_levels')
    .select('id, level_name')
    .order('level_name')

  if (error) {
    console.error('Error fetching education levels:', error)
    return []
  }

  return data || []
}

// Function to get user role data
export async function getUserRoleData(roleId: string) {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data, error } = await supabase
    .from('user_roles')
    .select('*')
    .eq('id', roleId)
    .single()

  if (error) {
    console.error('Error fetching user role:', error)
    return null
  }

  return data
} 