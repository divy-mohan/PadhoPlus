import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const backendUrl = 'http://localhost:8000'
    
    // Get all cookies from the browser request
    const cookies = request.headers.get('cookie') || ''
    
    await fetch(`${backendUrl}/api/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
    })

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Unable to logout' },
      { status: 500 }
    )
  }
}
