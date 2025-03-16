'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Bell, User, LogOut, ChevronDown, Settings, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type UserRole = 'admin' | 'instructor' | 'provider' | 'student'

// Role-specific colors
const roleColors = {
  admin: 'bg-blue-600',
  instructor: 'bg-green-600',
  provider: 'bg-purple-600',
  student: 'bg-amber-600'
}

// Role display names
const roleNames = {
  admin: 'Administrator',
  instructor: 'Instructor',
  provider: 'Provider',
  student: 'Student'
}

interface HeaderProps {
  showTitle?: boolean;
}

export default function Header({ showTitle = true }: HeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user?.user_metadata?.role) {
          setUserRole(user.user_metadata.role as UserRole)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          if (session.user.user_metadata?.role) {
            setUserRole(session.user.user_metadata.role as UserRole)
          }
          setIsLoading(false)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setUserRole(null)
          setIsLoading(false)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/signin')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const avatarColor = userRole ? roleColors[userRole] : 'bg-gray-400'
  const roleName = userRole ? roleNames[userRole] : 'User'

  // Get the correct profile link based on user role
  const getProfileLink = () => {
    if (!userRole) return '/profile'
    
    if (userRole === 'admin') {
      return '/admin/profile'
    } else {
      return `/${userRole}/profile`
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      {showTitle && (
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">JMU Learning Management System</h1>
        </div>
      )}
      
      <div className={cn("flex items-center space-x-4", !showTitle && "ml-auto")}>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        
        {isLoading ? (
          <div className="w-8 h-8 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : user ? (
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
            >
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", avatarColor)}>
                <User size={16} />
              </div>
              <div className="hidden md:block text-sm text-left">
                <p className="font-medium text-gray-700 truncate max-w-[150px]">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500">{roleName}</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <Link 
                  href={getProfileLink()}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link 
            href="/auth/signin"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
} 