'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCourseEditorStore } from '@/lib/store/courseEditorStore'

interface EducationLevel {
  id: string
  level_name: string
}

interface UserRole {
  id: string
  role_name: string
}

interface CourseFormProps {
  action: (formData: FormData) => Promise<{ error?: string }>
  initialData?: {
    id?: string
    name?: string
    description?: string
    course_code?: string
    education_level?: string
    user_type?: string
    duration_hours?: number
  }
  educationLevels: EducationLevel[]
  userRoles: UserRole[]
  isEdit?: boolean
}

export function CourseForm({
  action,
  initialData,
  educationLevels,
  userRoles,
  isEdit = false
}: CourseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  // Get form state from store
  const { formData, setFormData, resetForm, isDirty } = useCourseEditorStore()

  // Initialize store with initial data on component mount
  useEffect(() => {
    if (isEdit && initialData) {
      // Only initialize if store is empty or there was a change in initialData
      if (Object.keys(formData).length === 0 || formData.id !== initialData.id) {
        resetForm(initialData)
      }
    }
  }, [isEdit, initialData, formData, resetForm])

  // Add an effect to log to terminal on component mount
  useEffect(() => {
    if (isEdit && initialData?.id) {
      const logToTerminal = async () => {
        try {
          await fetch(`/api/courses/${initialData.id}/log`, {
            method: 'GET'
          })
        } catch (error) {
          // Ignore any errors, this is just for logging
          console.log('Basic info tab loaded')
        }
      }
      
      logToTerminal()
    }
  }, [isEdit, initialData?.id])

  // Handle input change to update store
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert number fields to numbers
    const parsedValue = type === 'number' ? (value ? parseInt(value) : 0) : value;
    
    setFormData({ [name]: parsedValue });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Use data from store for the main course fields
      const { description, ...courseData } = {
        name: formData.name || '',
        course_code: formData.course_code || '',
        education_level: formData.education_level || null,
        user_type: formData.user_type || null,
        status: 'draft',
        description: formData.description || '',
        duration_hours: formData.duration_hours || 0
      }
      
      // Add ID if editing
      if (isEdit && initialData?.id) {
        Object.assign(courseData, { id: initialData.id })
      }
      
      // Make API call
      const response = await fetch(
        `/api/courses${isEdit ? '?method=PATCH' : ''}`, 
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...courseData, description }),
        }
      )
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save course')
      }
      
      // Redirect or refresh page
      if (!isEdit) {
        if (result.data?.[0]?.id) {
          const courseId = result.data[0].id
          console.log('Course created with ID:', courseId)
          
          // Add a small delay to ensure Next.js is ready for navigation
          setTimeout(() => {
            router.push(`/admin/courses/${courseId}/edit`)
          }, 100)
          
          // Optionally refresh the current page while waiting
          router.refresh()
        } else {
          console.error('Invalid response data:', result)
          throw new Error('Invalid response data from server')
        }
      } else {
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg border">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Course Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="course_code" className="block text-sm font-medium text-gray-700 mb-1">
            Course Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="course_code"
            name="course_code"
            required
            value={formData.course_code || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="education_level" className="block text-sm font-medium text-gray-700 mb-1">
              Education Level
            </label>
            <select
              id="education_level"
              name="education_level"
              value={formData.education_level || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Education Level</option>
              {educationLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.level_name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-1">
              Target User Type
            </label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All User Types</option>
              {userRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-6">
        <Link href="/admin/courses">
          <Button type="button" variant="outline" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </Link>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Course' : 'Save Course'}
        </Button>
      </div>
    </form>
  )
} 