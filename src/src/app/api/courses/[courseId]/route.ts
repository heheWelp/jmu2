import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params

    // Delete all related data in the correct order to maintain referential integrity
    
    // 1. Delete course content structure
    await supabaseAdmin
      .from('course_content_structure')
      .delete()
      .eq('course_id', courseId)

    // 2. Delete course media
    await supabaseAdmin
      .from('course_media')
      .delete()
      .eq('course_id', courseId)

    // 3. Delete course feedback settings
    await supabaseAdmin
      .from('course_feedback_settings')
      .delete()
      .eq('course_id', courseId)

    // 4. Delete course pricing
    await supabaseAdmin
      .from('course_pricing')
      .delete()
      .eq('course_id', courseId)

    // 5. Delete course objectives
    await supabaseAdmin
      .from('course_objectives')
      .delete()
      .eq('course_id', courseId)

    // 6. Delete course details
    await supabaseAdmin
      .from('course_details')
      .delete()
      .eq('course_id', courseId)

    // 7. Delete discussion posts
    await supabaseAdmin
      .from('discussion_posts')
      .delete()
      .eq('course_id', courseId)

    // 8. Delete student quiz attempts for all quizzes in the course
    const { data: quizzes } = await supabaseAdmin
      .from('quiz')
      .select('id')
      .eq('course_id', courseId)

    if (quizzes) {
      const quizIds = quizzes.map(q => q.id)
      await supabaseAdmin
        .from('student_quiz_attempt')
        .delete()
        .in('quiz_id', quizIds)
    }

    // 9. Delete quiz answers and questions
    const { data: quizQuestions } = await supabaseAdmin
      .from('quiz_question')
      .select('id')
      .eq('quiz_id', 'in', quizzes?.map(q => q.id) || [])

    if (quizQuestions) {
      await supabaseAdmin
        .from('quiz_answer')
        .delete()
        .in('question_id', quizQuestions.map(q => q.id))

      await supabaseAdmin
        .from('quiz_question')
        .delete()
        .in('id', quizQuestions.map(q => q.id))
    }

    // 10. Delete quizzes
    await supabaseAdmin
      .from('quiz')
      .delete()
      .eq('course_id', courseId)

    // 11. Delete student lesson progress
    const { data: lessons } = await supabaseAdmin
      .from('lesson')
      .select('id')
      .eq('module_id', 'in', (await supabaseAdmin
        .from('module')
        .select('id')
        .eq('course_id', courseId)).data?.map(m => m.id) || [])

    if (lessons) {
      await supabaseAdmin
        .from('student_lesson')
        .delete()
        .in('lesson_id', lessons.map(l => l.id))
    }

    // 12. Delete lesson content
    if (lessons) {
      await supabaseAdmin
        .from('lesson_content')
        .delete()
        .in('lesson_id', lessons.map(l => l.id))
    }

    // 13. Delete lessons
    await supabaseAdmin
      .from('lesson')
      .delete()
      .eq('module_id', 'in', (await supabaseAdmin
        .from('module')
        .select('id')
        .eq('course_id', courseId)).data?.map(m => m.id) || [])

    // 14. Delete modules
    await supabaseAdmin
      .from('module')
      .delete()
      .eq('course_id', courseId)

    // 15. Delete enrollments
    await supabaseAdmin
      .from('enrolment')
      .delete()
      .eq('course_id', courseId)

    // 16. Finally delete the course itself
    const { error } = await supabaseAdmin
      .from('course')
      .delete()
      .eq('id', courseId)

    if (error) {
      console.error('Error deleting course:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete course' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in DELETE course:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 