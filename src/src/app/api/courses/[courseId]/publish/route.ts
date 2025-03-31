import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params
    
    // Update course status to published
    const { data, error } = await supabaseAdmin
      .from('course')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', courseId)
      .select()
      .single()
    
    if (error) {
      console.error('Error publishing course:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to publish course' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, course: data })
  } catch (error) {
    console.error('Unexpected error in publish course:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 