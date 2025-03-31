'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart2, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  ClipboardList,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
}

type UserRole = 'admin' | 'instructor' | 'provider' | 'student'

// Admin navigation items
const adminNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Manage Users', href: '/admin/users', icon: Users },
  { name: 'Manage Content', href: '/admin/courses', icon: FileText },
  { name: 'Reports', href: '/admin/reports', icon: BarChart2 },
  { name: 'Tag & Talk', href: '/admin/tag-talk', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

// Instructor navigation items
const instructorNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/instructor/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/instructor/courses', icon: BookOpen },
  { name: 'Students', href: '/instructor/students', icon: Users },
  { name: 'Reports', href: '/instructor/reports', icon: BarChart2 },
  { name: 'Tag & Talk', href: '/instructor/tag-talk', icon: MessageSquare },
  { name: 'Assessments', href: '/instructor/assessments', icon: ClipboardList },
]

// Provider navigation items
const providerNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/provider/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/provider/courses', icon: BookOpen },
  { name: 'Students', href: '/provider/students', icon: Users },
  { name: 'Reports', href: '/provider/reports', icon: BarChart2 },
  { name: 'Tag & Talk', href: '/provider/tag-talk', icon: MessageSquare },
  { name: 'Assessments', href: '/provider/assessments', icon: ClipboardList },
]

// Student navigation items
const studentNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { name: 'My Courses', href: '/student/courses', icon: BookOpen },
  { name: 'Assignments', href: '/student/assignments', icon: ClipboardList },
  { name: 'Grades', href: '/student/grades', icon: Award },
  { name: 'Calendar', href: '/student/calendar', icon: Calendar },
  { name: 'Tag & Talk', href: '/student/tag-talk', icon: MessageSquare },
]

// Role-specific colors
const roleColors = {
  admin: 'bg-blue-600',
  instructor: 'bg-green-600',
  provider: 'bg-purple-600',
  student: 'bg-amber-600'
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname() || ''

  useEffect(() => {
    const fetchUserRole = async () => {
      setIsLoading(true)
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user?.user_metadata?.role) {
          setUserRole(user.user_metadata.role as UserRole)
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUserRole()
  }, [])

  // Get navigation items based on user role
  const getNavItems = () => {
    if (!userRole) return []
    
    switch (userRole) {
      case 'admin':
        return adminNavItems
      case 'instructor':
        return instructorNavItems
      case 'provider':
        return providerNavItems
      case 'student':
        return studentNavItems
      default:
        return []
    }
  }

  const navItems = getNavItems()
  const activeColor = userRole ? roleColors[userRole] : 'bg-gray-600'

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-[#1F2937] text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-lg font-bold truncate">JMU LMS</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-700"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm transition-colors",
                      isActive 
                        ? activeColor + " text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      collapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <item.icon size={20} className={collapsed ? "" : "mr-3"} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </nav>
    </div>
  )
} 