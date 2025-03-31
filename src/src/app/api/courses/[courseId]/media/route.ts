import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params
    
    // Fetch media for the course
    const { data, error } = await supabaseAdmin
      .from('course_media')
      .select('*')
      .eq('course_id', courseId)
      .order('course_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching course media:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch course media' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, media: data })
  } catch (error) {
    console.error('Unexpected error in GET media:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params
    const body = await req.json()
    
    const { media_type, media_url, course_order } = body
    
    // Validation
    if (!media_type || !media_url) {
      return NextResponse.json(
        { success: false, error: 'Media type and URL are required' },
        { status: 400 }
      )
    }
    
    // Insert new media
    const { data, error } = await supabaseAdmin
      .from('course_media')
      .insert({
        course_id: courseId,
        media_type,
        media_url,
        course_order,
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error adding course media:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to add course media' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, media: data })
  } catch (error) {
    console.error('Unexpected error in POST media:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 