'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Define types
interface UserRole {
  id: string
  role_name: string
}

interface ProfileData {
  first_name: string
  last_name: string
  preferred_name: string
  user_role: string
}

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [userRoles, setUserRoles] = useState<UserRole[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()
  
  // Profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    preferred_name: '',
    user_role: '',
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch user roles on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      
      try {
        console.log('Fetching user roles...')
        
        // First check if user_roles table exists and has data
        const { count, error: countError } = await supabase
          .from('user_roles')
          .select('*', { count: 'exact', head: true })
        
        console.log('User roles count:', count)
        
        if (countError) {
          console.error('Error checking user_roles table:', countError)
          throw countError
        }
        
        // If no roles exist, create default roles
        if (!count || count === 0) {
          console.log('No user roles found, creating default roles...')
          
          const defaultRoles = [
            { role_name: 'admin' },
            { role_name: 'instructor' },
            { role_name: 'provider' },
            { role_name: 'student' }
          ]
          
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert(defaultRoles)
          
          if (insertError) {
            console.error('Error creating default roles:', insertError)
            throw insertError
          }
        }
        
        // Fetch user roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('id, role_name')
          .neq('role_name', 'admin') // Exclude admin role
        
        if (rolesError) {
          console.error('Error fetching user roles:', rolesError)
          throw rolesError
        }
        
        console.log('Fetched user roles:', roles)
        setUserRoles(roles || [])
      } catch (err) {
        console.error('Error in fetchData:', err)
        setError('Failed to load user roles. Please try again later.')
      } finally {
        setLoadingData(false)
      }
    }
    
    fetchData()
  }, [])

  // Handle profile data changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle user role selection
  const handleRoleSelect = (roleId: string) => {
    console.log('Selected role ID:', roleId)
    setProfileData(prev => ({
      ...prev,
      user_role: roleId
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    
    if (!profileData.user_role) {
      setError('Please select a user type')
      setLoading(false)
      return
    }

    try {
      console.log('Creating user with data:', {
        email,
        role: userRoles.find(role => role.id === profileData.user_role)?.role_name,
        profileData
      })
      
      // 1. Create the user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            role: userRoles.find(role => role.id === profileData.user_role)?.role_name || 'student'
          }
        },
      })

      if (authError) {
        console.error('Auth error:', authError)
        setError(authError.message)
        return
      }
      
      console.log('Auth data:', authData)
      
      // 2. Create profile record
      if (authData?.user) {
        const profileRecord = {
          user_id: authData.user.id,
          email,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          preferred_name: profileData.preferred_name || null,
          user_role: profileData.user_role,
        }
        
        console.log('Creating profile record:', profileRecord)
        
        // Use the server API endpoint instead of direct Supabase call
        const response = await fetch('/api/create-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileRecord),
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          console.error('Profile API error:', result)
          setError('Failed to create user profile')
          return
        }
        
        console.log('Profile created successfully:', result)
      }

      // Show success message or redirect
      router.push('/auth/verify-email')
    } catch (err) {
      console.error('Signup error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Get role color based on role name
  const getRoleColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'instructor':
        return 'bg-green-600 hover:bg-green-500 border-green-600';
      case 'provider':
        return 'bg-purple-600 hover:bg-purple-500 border-purple-600';
      case 'student':
        return 'bg-amber-600 hover:bg-amber-500 border-amber-600';
      default:
        return 'bg-blue-600 hover:bg-blue-500 border-blue-600';
    }
  }

  // If no user roles are available, show hardcoded options
  const renderUserRoleButtons = () => {
    if (loadingData) {
      return (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )
    }
    
    if (userRoles.length === 0) {
      // Fallback to hardcoded roles if no roles are fetched
      const fallbackRoles = [
        { id: 'instructor', role_name: 'instructor' },
        { id: 'provider', role_name: 'provider' },
        { id: 'student', role_name: 'student' }
      ]
      
      return (
        <div className="grid grid-cols-3 gap-3">
          {fallbackRoles.map(role => {
            const isSelected = profileData.user_role === role.id;
            const baseClasses = "flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium transition-colors";
            const colorClasses = getRoleColor(role.role_name);
            const selectedClasses = isSelected 
              ? `text-white ${colorClasses}` 
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50";
            
            return (
              <button
                key={role.id}
                type="button"
                className={`${baseClasses} ${selectedClasses}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                {role.role_name.charAt(0).toUpperCase() + role.role_name.slice(1)}
              </button>
            );
          })}
        </div>
      )
    }
    
    return (
      <div className="grid grid-cols-3 gap-3">
        {userRoles.map(role => {
          const isSelected = profileData.user_role === role.id;
          const baseClasses = "flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium transition-colors";
          const colorClasses = getRoleColor(role.role_name);
          const selectedClasses = isSelected 
            ? `text-white ${colorClasses}` 
            : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50";
          
          return (
            <button
              key={role.id}
              type="button"
              className={`${baseClasses} ${selectedClasses}`}
              onClick={() => handleRoleSelect(role.id)}
            >
              {role.role_name.charAt(0).toUpperCase() + role.role_name.slice(1)}
            </button>
          );
        })}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-6">
            {/* User Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a:
              </label>
              {renderUserRoleButtons()}
            </div>
            
            <hr className="border-gray-200" />
            
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="First Name"
                value={profileData.first_name}
                onChange={handleProfileChange}
              />
            </div>
            
            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Last Name"
                value={profileData.last_name}
                onChange={handleProfileChange}
              />
            </div>
            
            {/* Preferred Name (Optional) */}
            <div>
              <label htmlFor="preferred_name" className="block text-sm font-medium text-gray-700">
                Preferred Name (Optional)
              </label>
              <input
                id="preferred_name"
                name="preferred_name"
                type="text"
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Preferred Name"
                value={profileData.preferred_name}
                onChange={handleProfileChange}
              />
            </div>
            
            <hr className="border-gray-200" />
            
            {/* Email field */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password fields */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || loadingData}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 