import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase'

// Create Supabase client with service role key to bypass RLS
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    // Get user ID from session
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Extract description and prepare course data
    const { description, ...otherFormData } = formData
    const courseData = {
      name: otherFormData.name,
      course_code: otherFormData.course_code,
      education_level: otherFormData.education_level || null,
      user_type: otherFormData.user_type || null,
      status: 'draft',
      created_by: session.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    // Insert the course
    const { data, error } = await supabaseAdmin
      .from('course')
      .insert(courseData)
      .select()
    
    if (error) {
      console.error('Course creation error:', error.message)
      return NextResponse.json(
        { error: `Failed to create course: ${error.message}` },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Failed to create course - no data returned' },
        { status: 500 }
      )
    }
    
    // Create course details with description
    if (data[0].id) {
      const courseDetailsData = {
        course_id: data[0].id,
        description: description || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const { error: detailsError } = await supabaseAdmin
        .from('course_details')
        .insert(courseDetailsData)
        .select()
      
      if (detailsError) {
        console.error('Course details creation error:', detailsError.message)
        return NextResponse.json(
          { error: `Failed to save course description: ${detailsError.message}` },
          { status: 500 }
        )
      }
      
      return NextResponse.json({ 
        success: true, 
        data: [{
          ...data[0],
          description: description || ''
        }]
      })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Unexpected error:', err.message)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const formData = await request.json()
    console.log('Received course update data:', JSON.stringify(formData, null, 2))
    
    // Extract description and ID first
    const { description, id, ...otherFormData } = formData;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }
    
    // IMPORTANT: Create a new object with ONLY the fields that exist in the course table
    // Do NOT use spread operators on the formData to avoid unexpected fields
    const courseData = {
      name: otherFormData.name,
      course_code: otherFormData.course_code,
      education_level: otherFormData.education_level,
      user_type: otherFormData.user_type,
      status: otherFormData.status,
      updated_at: new Date().toISOString()
    }
    
    // Remove undefined/null fields to avoid overwriting with null
    Object.keys(courseData).forEach(key => {
      if (courseData[key as keyof typeof courseData] === undefined) {
        delete courseData[key as keyof typeof courseData]
      }
    })
    
    console.log('Updating course table:', JSON.stringify(courseData, null, 2))
    
    // Update the course with service role
    const { data, error } = await supabaseAdmin
      .from('course')
      .update(courseData)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Server course update error:', error)
      return NextResponse.json(
        { error: `Failed to update course: ${error.message}` },
        { status: 500 }
      )
    }
    
    // Handle description update in course_details only if description was provided
    if (description !== undefined) {
      // First check if course_details entry exists
      const { data: existingDetails } = await supabaseAdmin
        .from('course_details')
        .select('id')
        .eq('course_id', id)
        .single()
      
      if (existingDetails) {
        // Update existing record
        console.log('Updating existing course_details record with description')
        const { error: detailsError } = await supabaseAdmin
          .from('course_details')
          .update({
            description,
            updated_at: new Date().toISOString()
          })
          .eq('course_id', id)
        
        if (detailsError) {
          console.error('Server course details update error:', detailsError)
        }
      } else {
        // Create new record
        console.log('Creating new course_details record with description')
        const { error: detailsError } = await supabaseAdmin
          .from('course_details')
          .insert({
            course_id: id,
            description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        
        if (detailsError) {
          console.error('Server course details creation error:', detailsError)
        }
      }
    }
    
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Unexpected error in update-course:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 