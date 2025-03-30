import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string; quizId: string } }
) {
  try {
    const { quizId } = params
    
    // Fetch quiz settings
    const { data, error } = await supabaseAdmin
      .from('quiz_settings')
      .select('*')
      .eq('quiz_id', quizId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
      console.error('Error fetching quiz settings:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch quiz settings' },
        { status: 500 }
      )
    }
    
    // Return default settings if none exist
    const settings = data || {
      quiz_id: quizId,
      min_pass_score: 70,
      is_pass_required: false,
      time_limit_minutes: null,
      allow_retakes: true,
      max_attempts: null
    }
    
    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Unexpected error in GET quiz settings:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string; quizId: string } }
) {
  try {
    const { quizId } = params
    const body = await req.json()
    
    const { min_pass_score, is_pass_required, time_limit_minutes, allow_retakes, max_attempts } = body
    
    // Check if settings already exist
    const { data: existingSettings, error: fetchError } = await supabaseAdmin
      .from('quiz_settings')
      .select('id')
      .eq('quiz_id', quizId)
      .single()
    
    let result;
    
    if (existingSettings) {
      // Update existing settings
      result = await supabaseAdmin
        .from('quiz_settings')
        .update({
          min_pass_score,
          is_pass_required,
          time_limit_minutes,
          allow_retakes,
          max_attempts,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings.id)
        .select()
        .single()
    } else {
      // Insert new settings
      result = await supabaseAdmin
        .from('quiz_settings')
        .insert({
          quiz_id: quizId,
          min_pass_score,
          is_pass_required,
          time_limit_minutes,
          allow_retakes,
          max_attempts
        })
        .select()
        .single()
    }
    
    if (result.error) {
      console.error('Error updating quiz settings:', result.error)
      return NextResponse.json(
        { success: false, error: 'Failed to update quiz settings' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, settings: result.data })
  } catch (error) {
    console.error('Unexpected error in PUT quiz settings:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 