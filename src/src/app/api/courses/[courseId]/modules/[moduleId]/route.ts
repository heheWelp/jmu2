import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Create Supabase admin client to bypass RLS
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Fetch a specific module
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    const { moduleId } = params

    // Fetch the module
    const { data, error } = await supabaseAdmin
      .from('module')
      .select('*')
      .eq('id', moduleId)
      .single()

    if (error) {
      console.error('Error fetching module:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch module' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, module: data })
  } catch (error: any) {
    console.error('Unexpected error in GET module:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// PATCH: Update a module
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    const { moduleId } = params
    const updates = await req.json()

    // Update the module
    const { error } = await supabaseAdmin
      .from('module')
      .update(updates)
      .eq('id', moduleId)

    if (error) {
      console.error('Error updating module:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update module' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in PATCH module:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

// DELETE: Remove a module
export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    const { moduleId } = params

    // Delete the module
    const { error } = await supabaseAdmin
      .from('module')
      .delete()
      .eq('id', moduleId)

    if (error) {
      console.error('Error deleting module:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete module' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in DELETE module:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
} 