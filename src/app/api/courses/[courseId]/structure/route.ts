import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Fetch all content structure items for the course
    const { data: structureData, error: structureError } = await supabaseAdmin
      .from('course_content_structure')
      .select('*')
      .eq('course_id', params.courseId)
      .order('display_order', { ascending: true })

    if (structureError) {
      console.error('Error fetching course structure:', structureError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch course structure' },
        { status: 500 }
      )
    }

    // Fetch all related content
    const moduleIds = structureData
      .filter(item => item.content_type === 'module')
      .map(item => item.content_id)
    const lessonIds = structureData
      .filter(item => item.content_type === 'lesson')
      .map(item => item.content_id)
    const mediaIds = structureData
      .filter(item => item.content_type === 'media')
      .map(item => item.content_id)
    const quizIds = structureData
      .filter(item => item.content_type === 'quiz')
      .map(item => item.content_id)

    // Fetch modules
    const { data: modules } = await supabaseAdmin
      .from('module')
      .select('*')
      .in('id', moduleIds)

    // Fetch lessons
    const { data: lessons } = await supabaseAdmin
      .from('lesson')
      .select('*')
      .in('id', lessonIds)

    // Fetch lesson content
    const { data: lessonContent } = await supabaseAdmin
      .from('lesson_content')
      .select('*')
      .in('lesson_id', lessonIds)
      .order('created_at', { ascending: true })

    // Create a map of lesson content
    const lessonContentMap = new Map()
    lessonContent?.forEach(content => {
      if (!lessonContentMap.has(content.lesson_id)) {
        lessonContentMap.set(content.lesson_id, [])
      }
      lessonContentMap.get(content.lesson_id).push(content)
    })

    // Fetch media
    const { data: media } = await supabaseAdmin
      .from('media')
      .select('*')
      .in('id', mediaIds)

    // Fetch quizzes
    const { data: quizzes } = await supabaseAdmin
      .from('quiz')
      .select('*, quiz_settings(*)')
      .in('id', quizIds)

    // Build the hierarchical structure
    const contentMap = new Map()
    modules?.forEach(module => {
      contentMap.set(module.id, { ...module, content_type: 'module', children: [] })
    })
    lessons?.forEach(lesson => {
      contentMap.set(lesson.id, { 
        ...lesson, 
        content_type: 'lesson', 
        children: [],
        content: lessonContentMap.get(lesson.id) || [] // Add lesson content here
      })
    })
    media?.forEach(item => {
      contentMap.set(item.id, { ...item, content_type: 'media' })
    })
    quizzes?.forEach(quiz => {
      contentMap.set(quiz.id, { ...quiz, content_type: 'quiz' })
    })

    // Build the tree structure
    const processedItems = new Set() // Keep track of processed items
    const processedContent = new Set() // Keep track of content IDs

    // First pass: Process all items and build parent-child relationships
    structureData.forEach(item => {
      if (processedItems.has(item.id)) return // Skip if this structure item was already processed
      
      const content = contentMap.get(item.content_id)
      if (!content || processedContent.has(item.content_id)) return // Skip if content not found or already processed
      
      if (item.parent_id) {
        const parent = contentMap.get(item.parent_id)
        if (parent) {
          parent.children = parent.children || []
          parent.children.push({
            ...content,
            display_order: item.display_order
          })
        }
      }
      
      processedItems.add(item.id)
      processedContent.add(item.content_id)
    })

    // Get top-level modules
    const courseStructure = structureData
      .filter(item => !item.parent_id && item.content_type === 'module')
      .map(item => {
        const module = contentMap.get(item.content_id)
        if (!module) return null
        return {
          ...module,
          display_order: item.display_order,
          children: module.children?.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order) || []
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.display_order - b.display_order)

    return NextResponse.json({ success: true, structure: courseStructure })
  } catch (error) {
    console.error('Unexpected error in GET course structure:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { structure } = await req.json()

    // Start a transaction
    const { error } = await supabaseAdmin.rpc('update_course_structure', {
      p_course_id: params.courseId,
      p_structure: structure
    })

    if (error) {
      console.error('Error updating course structure:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update course structure' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in PUT course structure:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 