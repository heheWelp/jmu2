'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabType = 'basic-info' | 'learning-objectives' | 'course-structure' | 'media-content' | 'feedback-settings' | 'assessments' | 'review'

interface EditCourseLayoutProps {
  children: React.ReactNode
  courseId: string
  courseName: string
  currentTab: TabType
}

export default function EditCourseLayout({
  children,
  courseId,
  courseName,
  currentTab,
}: EditCourseLayoutProps) {
  const pathname = usePathname()
  
  const tabs = [
    { 
      id: 'basic-info' as TabType, 
      label: 'Basic Info',
      href: `/admin/courses/${courseId}/edit` 
    },
    { 
      id: 'learning-objectives' as TabType, 
      label: 'Learning Objectives',
      href: `/admin/courses/${courseId}/edit/learning-objectives` 
    },
    { 
      id: 'course-structure' as TabType, 
      label: 'Course Structure',
      href: `/admin/courses/${courseId}/edit/course-structure` 
    },
    { 
      id: 'media-content' as TabType, 
      label: 'Media Content',
      href: `/admin/courses/${courseId}/edit/media-content` 
    },
    { 
      id: 'feedback-settings' as TabType, 
      label: 'Feedback Settings',
      href: `/admin/courses/${courseId}/edit/feedback-settings` 
    },
    { 
      id: 'assessments' as TabType, 
      label: 'Assessments',
      href: `/admin/courses/${courseId}/edit/assessments` 
    },
    { 
      id: 'review' as TabType, 
      label: 'Review',
      href: `/admin/courses/${courseId}/edit/review` 
    },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center">
            <Link 
              href="/admin/courses" 
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <h1 className="text-lg font-medium text-gray-900 truncate max-w-[400px]">
              {courseName}
            </h1>
          </div>
          
          <div className="mt-6 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 flex items-center",
                    currentTab === tab.id 
                      ? "border-blue-500 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab.label}
                  {currentTab === tab.id && (
                    <CheckCircle2 className="ml-2 h-4 w-4 text-blue-500" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  )
} 