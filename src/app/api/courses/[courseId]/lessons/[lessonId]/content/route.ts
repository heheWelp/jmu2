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
    const { lessonId } = await Promise.resolve(params)

    // Fetch all lesson content with their associated content from respective tables
    const { data: content, error } = await supabaseAdmin
      .from('lesson_content')
      .select(`
        id,
        content_type,
        title,
        display_order,
        content_id,
        text_content (
          id,
          content
        ),
        media (
          id,
          media_type,
          media_url,
          file_type,
          file_size,
          duration
        ),
        lesson_discussions (
          id,
          title,
          description
        )
      `)
      .eq('lesson_id', lessonId)
      .order('display_order', { ascending: true })

    if (error) throw error

    // Transform the response to include the actual content based on type
    const transformedContent = content?.map(item => {
      let contentData = null
      switch (item.content_type) {
        case 'text':
          contentData = item.text_content
          break
        case 'media':
          contentData = item.media
          break
        case 'discussion':
          contentData = item.lesson_discussions
          break
      }

      return {
        id: item.id,
        content_type: item.content_type,
        title: item.title,
        display_order: item.display_order,
        content: contentData
      }
    })

    return NextResponse.json({ success: true, content: transformedContent })
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
    const { lessonId } = await Promise.resolve(params)
    const body = await request.json()

    // Insert content based on type first
    let contentId: string | null = null
    
    if (body.content_type === 'text') {
      const { data: textContent, error: textError } = await supabaseAdmin
        .from('text_content')
        .insert({ content: body.content })
        .select('id')
        .single()

      if (textError) throw textError
      contentId = textContent.id
    } 
    else if (body.content_type === 'media') {
      const { data: mediaContent, error: mediaError } = await supabaseAdmin
        .from('media')
        .insert({
          media_type: body.media_type,
          media_url: body.media_url,
          file_type: body.file_type,
          course_id: params.courseId
        })
        .select('id')
        .single()

      if (mediaError) throw mediaError
      contentId = mediaContent.id
    } 
    else if (body.content_type === 'discussion') {
      const { data: discussionContent, error: discussionError } = await supabaseAdmin
        .from('lesson_discussions')
        .insert({
          title: body.title,
          description: body.description
        })
        .select('id')
        .single()

      if (discussionError) throw discussionError
      contentId = discussionContent.id
    }

    if (!contentId) {
      throw new Error('Failed to create content')
    }

    // Get the next display order position
    const { data: maxOrderData } = await supabaseAdmin
      .from('lesson_content')
      .select('display_order')
      .eq('lesson_id', lessonId)
      .order('display_order', { ascending: false })
      .limit(1)

    const nextPosition = (maxOrderData?.[0]?.display_order || 0) + 1

    // Use the insert_lesson_content_at_position function
    const { data: insertResult, error: insertError } = await supabaseAdmin
      .rpc('insert_lesson_content_at_position', {
        p_lesson_id: lessonId,
        p_content_type: body.content_type,
        p_title: body.title,
        p_content_id: contentId,
        p_desired_position: nextPosition
      })

    if (insertError) throw insertError

    // Fetch the newly created content with its relationships
    const { data: newContent, error: fetchError } = await supabaseAdmin
      .from('lesson_content')
      .select(`
        id,
        content_type,
        title,
        display_order,
        content_id,
        text_content (
          id,
          content
        ),
        media (
          id,
          media_type,
          media_url,
          file_type,
          file_size,
          duration
        ),
        lesson_discussions (
          id,
          title,
          description
        )
      `)
      .eq('id', insertResult)
      .single()

    if (fetchError) throw fetchError

    return NextResponse.json({ success: true, content: newContent })
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
    const { lessonId } = await Promise.resolve(params)
    const url = new URL(request.url)
    const contentId = url.searchParams.get('contentId')

    if (!contentId) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Get the content type and content_id before deletion
    const { data: contentInfo, error: fetchError } = await supabaseAdmin
      .from('lesson_content')
      .select('content_type, content_id')
      .eq('id', contentId)
      .single()

    if (fetchError) throw fetchError

    // Delete from the specific content table first
    if (contentInfo.content_type === 'text') {
      await supabaseAdmin
        .from('text_content')
        .delete()
        .eq('id', contentInfo.content_id)
    } 
    else if (contentInfo.content_type === 'media') {
      await supabaseAdmin
        .from('media')
        .delete()
        .eq('id', contentInfo.content_id)
    } 
    else if (contentInfo.content_type === 'discussion') {
      await supabaseAdmin
        .from('lesson_discussions')
        .delete()
        .eq('id', contentInfo.content_id)
    }

    // Then delete from lesson_content
    const { error: deleteError } = await supabaseAdmin
      .from('lesson_content')
      .delete()
      .eq('id', contentId)

    if (deleteError) throw deleteError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lesson content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete lesson content' },
      { status: 500 }
    )
  }
} 