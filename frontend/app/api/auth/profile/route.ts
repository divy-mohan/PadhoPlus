import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const backendUrl = 'http://localhost:8000'
    
    // Get cookies from the browser request
    const cookies = request.headers.get('cookie') || ''
    
    const response = await fetch(`${backendUrl}/api/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'Unable to fetch profile' },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Unable to connect to server' },
      { status: 500 }
    )
  }
}
