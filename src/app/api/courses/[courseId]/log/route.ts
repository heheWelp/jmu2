import { NextRequest, NextResponse } from 'next/server'

// This endpoint exists solely to generate terminal logging for tabs that otherwise don't show activity
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  // Get courseId directly from params object
  const { courseId } = params
  
  // Log to the terminal
  console.log(`Course tab accessed for courseId: ${courseId}`)
  
  // Return a simple response
  return NextResponse.json({ success: true, message: 'Log entry created' })
} 