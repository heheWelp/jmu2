import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Fetch all lessons for a module
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    const { moduleId } = params

    // Fetch lessons
    const { data, error } = await supabaseAdmin
      .from('lesson')
      .select('*')
      .eq('module_id', moduleId)
      .order('number', { ascending: true })

    if (error) {
      console.error('Error fetching lessons:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch lessons' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, lessons: data })
  } catch (error: unknown) {
    console.error('Unexpected error in GET lessons:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// POST: Create a new lesson
export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    const { moduleId, courseId } = params
    const lessonData = await req.json()

    // Create new lesson
    const { data: newLesson, error: lessonError } = await supabaseAdmin
      .from('lesson')
      .insert({
        module_id: moduleId,
        ...lessonData
      })
      .select()

    if (lessonError) {
      console.error('Error creating lesson:', lessonError)
      return NextResponse.json(
        { success: false, error: 'Failed to create lesson' },
        { status: 500 }
      )
    }

    // Get the highest display_order for the module or default to 0
    const { data: maxOrderData } = await supabaseAdmin
      .from('course_content_structure')
      .select('display_order')
      .eq('course_id', courseId)
      .eq('parent_id', moduleId)
      .order('display_order', { ascending: false })
      .limit(1)

    const newDisplayOrder = (maxOrderData?.[0]?.display_order || 0) + 1

    // Create the structure entry
    const { error: structureError } = await supabaseAdmin
      .from('course_content_structure')
      .insert({
        course_id: courseId,
        content_type: 'lesson',
        content_id: newLesson[0].id,
        parent_id: moduleId,
        display_order: newDisplayOrder
      })

    if (structureError) {
      console.error('Error creating lesson structure:', structureError)
      // Rollback lesson creation
      await supabaseAdmin
        .from('lesson')
        .delete()
        .eq('id', newLesson[0].id)
      
      return NextResponse.json(
        { success: false, error: 'Failed to create lesson structure' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      lesson: newLesson?.[0] || null
    })
  } catch (error: unknown) {
    console.error('Unexpected error in POST lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 