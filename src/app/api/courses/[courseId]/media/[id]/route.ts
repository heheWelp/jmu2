import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; id: string } }
) {
  try {
    const { courseId, id } = params
    
    // Delete the media item
    const { error } = await supabaseAdmin
      .from('course_media')
      .delete()
      .eq('id', id)
      .eq('course_id', courseId)
    
    if (error) {
      console.error('Error deleting course media:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete course media' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in DELETE media:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 