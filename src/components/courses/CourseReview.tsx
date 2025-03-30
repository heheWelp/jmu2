'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, AlertTriangle, X, ChevronRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { useCourseEditorStore } from '@/lib/store/courseEditorStore'

interface Section {
  id: string
  name: string
  status: 'complete' | 'incomplete' | 'attention'
  items?: { id: string; name: string; status: 'complete' | 'incomplete' | 'attention' }[]
}

interface CourseReviewProps {
  courseId: string
  courseName: string
  courseStatus: string
  courseData: any
  sections: Section[]
}

export default function CourseReview({
  courseId,
  courseName,
  courseStatus,
  courseData,
  sections
}: CourseReviewProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  
  // Get the latest course data from the store
  const { formData } = useCourseEditorStore()
  
  // Merge data from store with original course data for display
  const mergedCourseData = {
    ...courseData,
    ...(formData.id ? {
      name: formData.name || courseData.name,
      description: formData.description || courseData.description,
      course_code: formData.course_code || courseData.course_code,
      duration_hours: formData.duration_hours || courseData.duration_hours,
      education_level: formData.education_level || courseData.education_level,
      user_type: formData.user_type || courseData.user_type,
    } : {})
  }
  
  // Use the latest course name from store if available
  const displayCourseName = formData.name || courseName
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <Check className="h-5 w-5 text-green-500" />
      case 'attention':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case 'incomplete':
        return <X className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complete</Badge>
      case 'attention':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Attention</Badge>
      case 'incomplete':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Incomplete</Badge>
      default:
        return null
    }
  }
  
  const getPublishStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
    }
  }
  
  const handlePublish = async () => {
    if (courseStatus === 'published') {
      return
    }
    
    // Check if there are incomplete sections
    const hasIncomplete = sections.some(section => section.status === 'incomplete')
    const hasAttention = sections.some(section => section.status === 'attention')
    
    if (hasIncomplete) {
      const confirmPublish = confirm('This course has incomplete sections. Are you sure you want to publish it?')
      if (!confirmPublish) return
    } else if (hasAttention) {
      const confirmPublish = confirm('This course has sections that need attention. Are you sure you want to publish it?')
      if (!confirmPublish) return
    }
    
    setIsLoading(true)
    
    try {
      // First update any pending changes from the store
      if (formData.id && Object.keys(formData).length > 1) {
        const updateResponse = await fetch(`/api/courses?method=PATCH`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: courseId,
            ...formData
          }),
        });
        
        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(errorData.error || 'Failed to update course data');
        }
      }
      
      // Then publish the course
      const response = await fetch(`/api/courses/${courseId}/publish`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      })
      
      if (!response.ok) throw new Error('Failed to publish course')
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Course published successfully',
        })
        
        // Redirect to course list after successful publish
        router.push('/admin/courses')
        router.refresh()
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error publishing course:', error)
      toast({
        title: 'Error',
        description: 'Failed to publish course. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSaveDraft = async () => {
    setIsLoading(true)
    
    try {
      // First update any pending changes from the store
      if (formData.id && Object.keys(formData).length > 1) {
        const updateResponse = await fetch(`/api/courses?method=PATCH`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: courseId,
            ...formData
          }),
        });
        
        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(errorData.error || 'Failed to update course data');
        }
      }
      
      // API call to save as draft (effectively just updates timestamp)
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'draft' })
      })
      
      if (!response.ok) throw new Error('Failed to save draft')
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Course saved as draft',
        })
        
        // Redirect to course list
        router.push('/admin/courses')
        router.refresh()
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error saving course draft:', error)
      toast({
        title: 'Error',
        description: 'Failed to save course draft. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Course Review</h2>
        <p className="text-sm text-gray-500">
          Review your course before publishing or saving as draft.
        </p>
      </div>
      
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Course Summary</CardTitle>
            {getPublishStatusBadge(courseStatus)}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">Course Name</span>
              <span className="font-medium">{displayCourseName}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">Course Code</span>
              <span>{mergedCourseData.course_code || 'Not specified'}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">Description</span>
              <span className="text-sm">{mergedCourseData.description || 'No description'}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">Duration</span>
              <span>{mergedCourseData.duration_hours} hours</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">Target Audience</span>
              <span>{mergedCourseData.user_type_name || 'Not specified'}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">Education Level</span>
              <span>{mergedCourseData.education_level_name || 'Not specified'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Course Completion Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map(section => (
              <div key={section.id} className="border rounded-md">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(section.status)}
                    <span className="font-medium">{section.name}</span>
                    {getStatusBadge(section.status)}
                  </div>
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${
                      expandedSections[section.id] ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
                
                {expandedSections[section.id] && section.items && (
                  <div className="border-t px-4 py-2 bg-gray-50">
                    <ul className="space-y-2">
                      {section.items.map(item => (
                        <li key={item.id} className="flex items-center justify-between py-1">
                          <span className="text-sm">{item.name}</span>
                          {getStatusIcon(item.status)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isLoading}
          >
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isLoading || courseStatus === 'published'}
            className={courseStatus === 'published' ? 'bg-gray-300' : ''}
          >
            {courseStatus === 'published' ? (
              <span className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4" />
                Published
              </span>
            ) : (
              'Publish Course'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 