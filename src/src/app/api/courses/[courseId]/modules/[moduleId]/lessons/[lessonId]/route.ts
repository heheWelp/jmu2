import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Fetch a specific lesson
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string, lessonId: string } }
) {
  try {
    const { lessonId } = params

    // Fetch the lesson
    const { data, error } = await supabaseAdmin
      .from('lesson')
      .select('*')
      .eq('id', lessonId)
      .single()

    if (error) {
      console.error('Error fetching lesson:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch lesson' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, lesson: data })
  } catch (error: any) {
    console.error('Unexpected error in GET lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// PATCH: Update a lesson
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string, lessonId: string } }
) {
  try {
    const { lessonId } = params
    const updates = await req.json()

    // Update the lesson
    const { error } = await supabaseAdmin
      .from('lesson')
      .update(updates)
      .eq('id', lessonId)

    if (error) {
      console.error('Error updating lesson:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update lesson' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in PATCH lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// DELETE: Remove a lesson
export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string, lessonId: string } }
) {
  try {
    const { lessonId } = params

    // Delete the lesson
    const { error } = await supabaseAdmin
      .from('lesson')
      .delete()
      .eq('id', lessonId)

    if (error) {
      console.error('Error deleting lesson:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete lesson' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in DELETE lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 