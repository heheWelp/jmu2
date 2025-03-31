import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// DELETE: Remove an objective
export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string, objectiveId: string } }
) {
  try {
    const { objectiveId } = params

    // Delete the objective
    const { error } = await supabaseAdmin
      .from('course_objectives')
      .delete()
      .eq('id', objectiveId)

    if (error) {
      console.error('Error deleting objective:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete objective' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in DELETE objective:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 