import { notFound } from 'next/navigation'
import DynamicCourseEditor from '@/components/courses/DynamicCourseEditor'
import { getCourseData } from '@/lib/actions/course'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Course'
}

export default async function EditCoursePage({ 
  params 
}: {
  params: { id: string }
}) {
  const params_id = await params.id
  
  // Use the server action to get all course data
  const result = await getCourseData(params_id)
  
  // Handle errors
  if ('error' in result) {
    console.error('Error fetching course data:', result.error)
    notFound()
  }
  
  const { course, educationLevels, userRoles, objectives, modules, lessons } = result
  
  // Return the dynamic course editor with all required data
  return (
    <DynamicCourseEditor
      courseId={params_id}
      courseName={course.name}
      initialTab="basic-info"
      courseData={course}
      educationLevels={educationLevels}
      userRoles={userRoles}
      objectives={objectives}
      modules={modules}
      lessons={lessons}
    />
  )
} 