import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const backendUrl = 'http://localhost:8000'
    
    // Get all cookies from the browser request
    const cookies = request.headers.get('cookie') || ''
    
    const response = await fetch(`${backendUrl}/api/auth/check/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
    })

    const data = await response.json()
    
    if (data.authenticated && data.user) {
      return NextResponse.json({ user: data.user }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Unable to connect to server' },
      { status: 500 }
    )
  }
}
