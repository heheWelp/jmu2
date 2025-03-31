import { createClient } from '@/lib/supabase'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { PlusIcon, PencilIcon, EyeIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import DeleteCourseButton from '@/components/courses/DeleteCourseButton'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Define course type based on the database schema
interface Course {
  id: string
  name: string
  description: string
  course_code: string
  status: 'draft' | 'published'
  thumbnail_url: string | null
  created_at: string
  education_level: {
    level_name: string
  } | null
  user_type: {
    role_name: string
  } | null
  duration_hours: number | null
}

// Function to fetch courses
async function getCourses() {
  const { data: courses, error } = await supabaseAdmin
    .from('course')
    .select(`
      *,
      education_level:education_level (
        level_name
      ),
      user_type:user_type (
        role_name
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }

  return courses as Course[]
}

export default async function AdminCoursesPage() {
  const courses = await getCourses()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Link href="/admin/courses/create">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No courses found. Create your first course to get started.</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                {course.thumbnail_url ? (
                  <Image
                    src={course.thumbnail_url}
                    alt={course.name}
                    width={400}
                    height={225}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <span className="text-gray-400">No thumbnail</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">{course.name}</h2>
                  <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-500 mb-2">Code: {course.course_code}</p>

                {course.education_level && (
                  <p className="text-sm text-gray-500 mb-2">
                    Level: {course.education_level.level_name}
                  </p>
                )}

                {course.user_type && (
                  <p className="text-sm text-gray-500 mb-4">
                    Target: {course.user_type.role_name}
                  </p>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="space-x-2">
                    <Link href={`/admin/courses/${course.id}/edit`}>
                      <Button size="sm" variant="outline" className="h-8">
                        <PencilIcon className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/admin/courses/${course.id}`}>
                      <Button size="sm" variant="outline" className="h-8">
                        <EyeIcon className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                  
                  <DeleteCourseButton courseId={course.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 