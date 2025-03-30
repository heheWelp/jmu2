import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { CourseForm } from '@/components/courses/CourseForm'

export default async function CreateCoursePage() {
  const supabase = createClient()
  
  // Fetch education levels and user roles for the form
  const { data: educationLevels } = await supabase
    .from('education_levels')
    .select('id, level_name')
  
  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('id, role_name')

  // Get current user to set as creator
  const { data: { session } } = await supabase.auth.getSession()
  const userId = session?.user?.id

  // Placeholder action function (not used anymore, as CourseForm now handles the submission)
  async function createCourse(formData: FormData) {
    'use server'
    return { error: 'This method is deprecated. Using API route instead.' }
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-gray-500 mt-2">
          Fill in the basic information to create a new course. You can edit more details later.
        </p>
      </div>
      
      <CourseForm 
        action={createCourse}
        educationLevels={educationLevels || []}
        userRoles={userRoles || []}
        isEdit={false}
      />
    </div>
  )
} 