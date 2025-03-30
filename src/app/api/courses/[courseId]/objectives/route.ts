import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Fetch all objectives for a course
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params

    // Fetch objectives
    const { data, error } = await supabaseAdmin
      .from('course_objectives')
      .select('*')
      .eq('course_id', courseId)
      .order('objective_order', { ascending: true })

    if (error) {
      console.error('Error fetching objectives:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch objectives' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, objectives: data })
  } catch (error: any) {
    console.error('Unexpected error in GET objectives:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// POST: Create a new objective
export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params
    const { objective_text, objective_order } = await req.json()

    // Create new objective
    const { data, error } = await supabaseAdmin
      .from('course_objectives')
      .insert({
        course_id: courseId,
        objective_text,
        objective_order,
      })
      .select()

    if (error) {
      console.error('Error creating objective:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create objective' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      objective: data?.[0] || null
    })
  } catch (error: any) {
    console.error('Unexpected error in POST objective:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 