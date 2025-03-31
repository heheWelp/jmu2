import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()
    const { fileName, contentType } = body

    // Generate a unique file path
    const timestamp = Date.now()
    const filePath = `courses/${params.courseId}/media/${timestamp}-${fileName}`

    // Get presigned URL from Supabase Storage
    const { data, error } = await supabase.storage
      .from('media')
      .createSignedUploadUrl(filePath)

    if (error) throw error

    // Return the presigned URL and the final file URL
    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${filePath}`
    
    return NextResponse.json({
      success: true,
      url: data.signedUrl,
      fields: {},
      fileUrl
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
} 