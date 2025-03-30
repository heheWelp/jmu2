import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Fetch all modules for a course
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params

    // Fetch modules
    const { data, error } = await supabaseAdmin
      .from('module')
      .select('*')
      .eq('course_id', courseId)
      .order('number', { ascending: true })

    if (error) {
      console.error('Error fetching modules:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch modules' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, modules: data })
  } catch (error: any) {
    console.error('Unexpected error in GET modules:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// POST: Create a new module
export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params
    const { name, number } = await req.json()

    // Start a transaction
    const { data: moduleData, error: moduleError } = await supabaseAdmin
      .from('module')
      .insert({
        course_id: courseId,
        name,
      })
      .select()

    if (moduleError) {
      console.error('Error creating module:', moduleError)
      return NextResponse.json(
        { success: false, error: 'Failed to create module' },
        { status: 500 }
      )
    }

    // Get the highest display_order for the course or default to 0
    const { data: maxOrderData } = await supabaseAdmin
      .from('course_content_structure')
      .select('display_order')
      .eq('course_id', courseId)
      .is('parent_id', null)
      .order('display_order', { ascending: false })
      .limit(1)

    const newDisplayOrder = (maxOrderData?.[0]?.display_order || 0) + 1

    // Create the structure entry
    const { error: structureError } = await supabaseAdmin
      .from('course_content_structure')
      .insert({
        course_id: courseId,
        content_type: 'module',
        content_id: moduleData[0].id,
        parent_id: null,
        display_order: newDisplayOrder
      })

    if (structureError) {
      console.error('Error creating module structure:', structureError)
      // Rollback module creation
      await supabaseAdmin
        .from('module')
        .delete()
        .eq('id', moduleData[0].id)
      
      return NextResponse.json(
        { success: false, error: 'Failed to create module structure' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      module: moduleData?.[0] || null
    })
  } catch (error: any) {
    console.error('Unexpected error in POST module:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 