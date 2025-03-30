import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const { lessonId } = params

    const { data: content, error } = await supabaseAdmin
      .from('lesson_content')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, content })
  } catch (error) {
    console.error('Error fetching lesson content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lesson content' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const { lessonId } = params
    const body = await request.json()

    const { data: content, error } = await supabaseAdmin
      .from('lesson_content')
      .insert({
        lesson_id: lessonId,
        title: body.title,
        content_type: body.content_type,
        content: body.content,
        file_type: body.file_type,
        file_url: body.file_url
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, content })
  } catch (error) {
    console.error('Error adding lesson content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add lesson content' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const { lessonId } = params
    const url = new URL(request.url)
    const contentId = url.searchParams.get('contentId')

    if (!contentId) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('lesson_content')
      .delete()
      .eq('id', contentId)
      .eq('lesson_id', lessonId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lesson content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete lesson content' },
      { status: 500 }
    )
  }
} 