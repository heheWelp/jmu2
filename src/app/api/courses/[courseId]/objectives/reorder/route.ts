import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// PUT: Reorder objectives
export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { updates } = await req.json()

    // Process each update
    for (const update of updates) {
      const { id, objective_order } = update
      
      const { error } = await supabaseAdmin
        .from('course_objectives')
        .update({ objective_order })
        .eq('id', id)

      if (error) {
        console.error('Error updating objective order:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to reorder objectives' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in PUT reorder objectives:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 