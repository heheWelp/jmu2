'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CourseForm } from './CourseForm'
import LearningObjectivesForm from './LearningObjectivesForm'
import CourseStructureForm from './CourseStructureForm'
import MediaContentForm from './MediaContentForm'
import FeedbackSettingsForm from './FeedbackSettingsForm'
import AssessmentsForm from './AssessmentsForm'
import CourseReview from './CourseReview'
import TabSynchronizer from './TabSynchronizer'
import { useCourseEditorStore } from '@/lib/store/courseEditorStore'

type TabType = 'basic-info' | 'learning-objectives' | 'course-structure' | 'media-content' | 'feedback-settings' | 'assessments' | 'review'

interface DynamicCourseEditorProps {
  courseId: string
  courseName: string
  initialTab: TabType
  courseData: any
  educationLevels: any[]
  userRoles: any[]
  objectives?: any[]
  modules?: any[]
  lessons?: any[]
}

export default function DynamicCourseEditor({
  courseId,
  courseName,
  initialTab,
  courseData,
  educationLevels,
  userRoles,
  objectives = [],
  modules = [],
  lessons = []
}: DynamicCourseEditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [reviewSections, setReviewSections] = useState<any[]>([])
  const [isAddingModule, setIsAddingModule] = useState(false)
  const [isAddingContent, setIsAddingContent] = useState(false)
  
  // Get course data from store
  const { formData } = useCourseEditorStore()
  
  // Get current course name (from store if available, otherwise from props)
  const displayCourseName = formData.name || courseName
  
  // URL state management without page reload
  useEffect(() => {
    // Skip URL update if we're in the middle of adding content
    if (isAddingModule || isAddingContent) return;

    // Get base URL path based on user role path
    const pathParts = window.location.pathname.split('/')
    const roleIndex = pathParts.findIndex(part => 
      ['admin', 'instructor', 'provider'].includes(part)
    )
    
    if (roleIndex >= 0) {
      const role = pathParts[roleIndex]
      const baseUrl = `/${role}/courses/${courseId}/edit`
      const url = activeTab === 'basic-info' 
        ? baseUrl 
        : `${baseUrl}/${activeTab}`
      
      window.history.pushState({}, '', url)
    }
  }, [activeTab, courseId, isAddingModule, isAddingContent])

  // Generate review sections based on course data
  useEffect(() => {
    // Use the store data for review sections when available
    const courseDataForReview = formData.id ? {
      ...courseData,
      name: formData.name || courseData.name,
      description: formData.description || courseData.description,
      course_code: formData.course_code || courseData.course_code,
      duration_hours: formData.duration_hours || courseData.duration_hours
    } : courseData;
    
    const sections = [
      {
        id: 'basic-info',
        name: 'Basic Information',
        status: courseDataForReview.name && courseDataForReview.description ? 'complete' : 'incomplete',
        items: [
          { id: 'name', name: 'Course Name', status: courseDataForReview.name ? 'complete' : 'incomplete' },
          { id: 'description', name: 'Course Description', status: courseDataForReview.description ? 'complete' : 'incomplete' },
          { id: 'code', name: 'Course Code', status: courseDataForReview.course_code ? 'complete' : 'incomplete' },
          { id: 'duration', name: 'Duration', status: courseDataForReview.duration_hours ? 'complete' : 'incomplete' }
        ]
      },
      {
        id: 'learning-objectives',
        name: 'Learning Objectives',
        status: objectives && objectives.length > 0 ? 'complete' : 'incomplete',
        items: [
          { id: 'main-objective', name: 'Main Objective', status: courseData.learning_objective ? 'complete' : 'incomplete' },
          { id: 'sub-objectives', name: 'Sub-Objectives', status: objectives && objectives.length > 0 ? 'complete' : 'incomplete' }
        ]
      },
      {
        id: 'course-structure',
        name: 'Course Structure',
        status: modules && modules.length > 0 ? 'complete' : 'incomplete',
        items: [
          { id: 'modules', name: 'Modules', status: modules && modules.length > 0 ? 'complete' : 'incomplete' },
          { id: 'lessons', name: 'Lessons', status: lessons && lessons.length > 0 ? 'complete' : 'incomplete' }
        ]
      }
    ]
    
    setReviewSections(sections)
  }, [formData, courseData, objectives, modules, lessons])

  // Placeholder action function for forms
  async function formActionHandler(formData: FormData) {
    return { error: 'This method is deprecated. Using API route instead.' }
  }

  const tabs = [
    { id: 'basic-info' as TabType, label: 'Basic Info' },
    { id: 'learning-objectives' as TabType, label: 'Learning Objectives' },
    { id: 'course-structure' as TabType, label: 'Course Structure' },
    { id: 'media-content' as TabType, label: 'Media Content' },
    { id: 'feedback-settings' as TabType, label: 'Feedback Settings' },
    { id: 'assessments' as TabType, label: 'Assessments' },
    { id: 'review' as TabType, label: 'Review' },
  ]

  // Group lessons by module for course structure tab
  const modulesWithLessons = modules?.map(module => ({
    ...module,
    lessons: lessons?.filter(lesson => lesson.module_id === module.id) || []
  })) || []

  // Get the back link path based on user role
  const getBackLink = () => {
    const pathParts = typeof window !== 'undefined' ? window.location.pathname.split('/') : []
    const roleIndex = pathParts.findIndex(part => 
      ['admin', 'instructor', 'provider'].includes(part)
    )
    
    if (roleIndex >= 0) {
      const role = pathParts[roleIndex]
      return `/${role}/courses`
    }
    
    return '/admin/courses' // Default fallback
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TabSynchronizer to sync URL with tab state */}
      <TabSynchronizer courseId={courseId} setActiveTab={setActiveTab as (tab: string) => void} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center">
            <Link 
              href={getBackLink()}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <h1 className="text-lg font-medium text-gray-900 truncate max-w-[400px]">
              {displayCourseName}
            </h1>
          </div>
          
          <div className="mt-6 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 flex items-center",
                    activeTab === tab.id 
                      ? "border-blue-500 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <CheckCircle2 className="ml-2 h-4 w-4 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <main className="py-6">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'basic-info' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Basic Information</h1>
                  <p className="text-gray-500 mt-2">
                    Edit the basic information for this course.
                  </p>
                </div>
                <CourseForm 
                  action={formActionHandler}
                  initialData={{
                    id: courseData.id,
                    name: courseData.name,
                    description: courseData.description,
                    course_code: courseData.course_code,
                    education_level: courseData.education_level,
                    user_type: courseData.user_type,
                    duration_hours: courseData.duration_hours,
                  }}
                  educationLevels={educationLevels}
                  userRoles={userRoles}
                  isEdit={true}
                />
              </>
            )}
            
            {activeTab === 'learning-objectives' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Learning Objectives</h1>
                  <p className="text-gray-500 mt-2">
                    Define what students will learn from this course.
                  </p>
                </div>
                <LearningObjectivesForm 
                  courseId={courseId}
                  objectives={objectives}
                />
              </>
            )}
            
            {activeTab === 'course-structure' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Course Structure</h1>
                  <p className="text-gray-500 mt-2">
                    Organize your course into modules and lessons.
                  </p>
                </div>
                <CourseStructureForm 
                  courseId={courseId}
                  modules={modulesWithLessons}
                  isAddingModule={isAddingModule}
                  setIsAddingModule={setIsAddingModule}
                  isAddingContent={isAddingContent}
                  setIsAddingContent={setIsAddingContent}
                />
              </>
            )}
            
            {activeTab === 'media-content' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Media Content</h1>
                  <p className="text-gray-500 mt-2">
                    Manage media content for this course.
                  </p>
                </div>
                <MediaContentForm 
                  courseId={courseId}
                />
              </>
            )}
            
            {activeTab === 'feedback-settings' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Feedback Settings</h1>
                  <p className="text-gray-500 mt-2">
                    Configure feedback settings for this course.
                  </p>
                </div>
                <FeedbackSettingsForm 
                  courseId={courseId}
                />
              </>
            )}
            
            {activeTab === 'assessments' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Assessments</h1>
                  <p className="text-gray-500 mt-2">
                    Create and manage assessments for this course.
                  </p>
                </div>
                <AssessmentsForm 
                  courseId={courseId}
                />
              </>
            )}
            
            {activeTab === 'review' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Review</h1>
                  <p className="text-gray-500 mt-2">
                    Review and publish your course.
                  </p>
                </div>
                <CourseReview 
                  courseId={courseId}
                  courseName={courseName}
                  courseStatus={courseData.status || 'draft'}
                  courseData={courseData}
                  sections={reviewSections}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 