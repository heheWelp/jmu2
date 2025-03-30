import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: media, error } = await supabase
      .from('media')
      .select('*')
      .eq('lesson_id', params.lessonId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, media })
  } catch (error) {
    console.error('Error fetching lesson media:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lesson media' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()

    const { data: media, error } = await supabase
      .from('media')
      .insert({
        lesson_id: params.lessonId,
        course_id: params.courseId,
        title: body.title,
        file_type: body.file_type,
        file_url: body.file_url
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, media })
  } catch (error) {
    console.error('Error adding lesson media:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add lesson media' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const url = new URL(request.url)
    const mediaId = url.searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json(
        { success: false, error: 'Media ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', mediaId)
      .eq('lesson_id', params.lessonId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lesson media:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete lesson media' },
      { status: 500 }
    )
  }
} 