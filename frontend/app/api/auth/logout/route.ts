import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const backendUrl = 'http://localhost:8000'
    
    // Get all cookies from the browser request
    const cookies = request.headers.get('cookie') || ''
    
    const response = await fetch(`${backendUrl}/api/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
    })

    // Always return success for logout, even if backend returns 403
    // This handles cases where user isn't actually authenticated on backend
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    // Still return success for logout
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  }
}
