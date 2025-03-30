import { NextRequest, NextResponse } from 'next/server'
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
    
    // Fetch feedback settings for the course
    const { data, error } = await supabaseAdmin
      .from('course_feedback_settings')
      .select('*')
      .eq('course_id', courseId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
      console.error('Error fetching feedback settings:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch feedback settings' },
        { status: 500 }
      )
    }
    
    // Return default settings if none exist
    const settings = data || {
      course_id: courseId,
      feedback_enabled: false,
      feedback_type: null,
      feedback_frequency: null
    }
    
    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Unexpected error in GET feedback settings:', error)
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
    const { courseId } = params
    const body = await req.json()
    
    const { feedback_enabled, feedback_type, feedback_frequency } = body
    
    // Check if settings already exist
    const { data: existingSettings, error: fetchError } = await supabaseAdmin
      .from('course_feedback_settings')
      .select('id')
      .eq('course_id', courseId)
      .single()
    
    let result;
    
    if (existingSettings) {
      // Update existing settings
      result = await supabaseAdmin
        .from('course_feedback_settings')
        .update({
          feedback_enabled,
          feedback_type,
          feedback_frequency,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings.id)
        .select()
        .single()
    } else {
      // Insert new settings
      result = await supabaseAdmin
        .from('course_feedback_settings')
        .insert({
          course_id: courseId,
          feedback_enabled,
          feedback_type,
          feedback_frequency
        })
        .select()
        .single()
    }
    
    if (result.error) {
      console.error('Error updating feedback settings:', result.error)
      return NextResponse.json(
        { success: false, error: 'Failed to update feedback settings' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, settings: result.data })
  } catch (error) {
    console.error('Unexpected error in PUT feedback settings:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 