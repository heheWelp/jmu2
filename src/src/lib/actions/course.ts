'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getCourseData(courseId: string) {
  try {
    // Fetch the course using admin client
    const { data: course, error } = await supabaseAdmin
      .from('course')
      .select('*')
      .eq('id', courseId)
      .single()
    
    if (error || !course) {
      console.error('Error fetching course:', error)
      return { error: 'Course not found' }
    }
    
    // Fetch course details with description
    const { data: courseDetails, error: detailsError } = await supabaseAdmin
      .from('course_details')
      .select('*')
      .eq('course_id', courseId)
      .single()
    
    if (detailsError && detailsError.code !== 'PGRST116') { // Ignore not found errors
      console.error('Error fetching course details:', detailsError)
    }
    
    // Merge course details with main course data, ensuring description is always a string
    const mergedCourse = {
      ...course,
      description: courseDetails?.description || ''
    }
    
    // If course details don't exist, create them with an empty description
    if (!courseDetails && !detailsError) {
      const { error: createError } = await supabaseAdmin
        .from('course_details')
        .insert({
          course_id: courseId,
          description: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      
      if (createError) {
        console.error('Error creating course details:', createError)
      }
    }
    
    // Fetch education levels and user roles for the form using admin client
    const { data: educationLevels, error: levelsError } = await supabaseAdmin
      .from('education_levels')
      .select('id, level_name')
    
    if (levelsError) {
      console.error('Error fetching education levels:', levelsError)
    }
    
    const { data: userRoles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('id, role_name')
    
    if (rolesError) {
      console.error('Error fetching user roles:', rolesError)
    }
    
    // Fetch course objectives
    const { data: objectives, error: objectivesError } = await supabaseAdmin
      .from('course_objectives')
      .select('*')
      .eq('course_id', courseId)
      .order('objective_order', { ascending: true })
    
    if (objectivesError) {
      console.error('Error fetching objectives:', objectivesError)
    }
    
    // Fetch modules for this course
    const { data: modules, error: modulesError } = await supabaseAdmin
      .from('module')
      .select('*')
      .eq('course_id', courseId)
      .order('number', { ascending: true })
    
    if (modulesError) {
      console.error('Error fetching modules:', modulesError)
    }
    
    // Fetch lessons for all modules
    let lessons = []
    const moduleIds = modules?.map(module => module.id) || []
    
    if (moduleIds.length > 0) {
      const { data: lessonsData, error: lessonsError } = await supabaseAdmin
        .from('lesson')
        .select('*')
        .in('module_id', moduleIds)
        .order('number', { ascending: true })
      
      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError)
      } else {
        lessons = lessonsData || []
      }
    }
    
    return {
      course: mergedCourse,
      educationLevels: educationLevels || [],
      userRoles: userRoles || [],
      objectives: objectives || [],
      modules: modules || [],
      lessons: lessons || [],
    }
  } catch (err) {
    console.error('Unexpected error in getCourseData:', err)
    return { error: 'Failed to load course data' }
  }
} 