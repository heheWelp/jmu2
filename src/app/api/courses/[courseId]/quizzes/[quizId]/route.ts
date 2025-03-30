import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; quizId: string } }
) {
  try {
    const { courseId, quizId } = params
    
    // Start a transaction to delete quiz and associated data
    // In a real implementation, this would use a Supabase function to handle the transaction
    
    // First, delete any related quiz settings
    const { error: settingsError } = await supabaseAdmin
      .from('quiz_settings')
      .delete()
      .eq('quiz_id', quizId)
    
    if (settingsError) {
      console.error('Error deleting quiz settings:', settingsError)
      return NextResponse.json(
        { success: false, error: 'Failed to delete quiz settings' },
        { status: 500 }
      )
    }
    
    // Delete any quiz questions
    const { error: questionsError } = await supabaseAdmin
      .from('quiz_questions')
      .delete()
      .eq('quiz_id', quizId)
    
    if (questionsError) {
      console.error('Error deleting quiz questions:', questionsError)
      return NextResponse.json(
        { success: false, error: 'Failed to delete quiz questions' },
        { status: 500 }
      )
    }
    
    // Finally delete the quiz itself
    const { error: quizError } = await supabaseAdmin
      .from('quizzes')
      .delete()
      .eq('id', quizId)
      .eq('course_id', courseId)
    
    if (quizError) {
      console.error('Error deleting quiz:', quizError)
      return NextResponse.json(
        { success: false, error: 'Failed to delete quiz' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in DELETE quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 