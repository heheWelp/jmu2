'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/router'
import { ProfileForm } from '@/components/profile/ProfileForm'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function InstructorProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profileData, setProfileData] = useState<any>(null)
  const [educationLevels, setEducationLevels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/auth/signin')
          return
        }
        
        setUser(user)
        
        // Get the user's profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        setProfileData(profile)
        
        // Get all education levels
        const { data: levels } = await supabase
          .from('education_levels')
          .select('id, level_name')
          .order('level_name')
        
        setEducationLevels(levels || [])
      } catch (error) {
        console.error('Error fetching profile data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      )
    }

    return (
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {user && (
            <ProfileForm 
              userId={user.id}
              initialData={profileData}
              userRole="instructor"
              educationLevels={educationLevels}
              themeColor="green"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  )
} 