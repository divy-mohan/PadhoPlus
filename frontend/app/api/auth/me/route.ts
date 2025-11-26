import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendUrl = 'http://localhost:8000'
    
    const response = await fetch(`${backendUrl}/api/auth/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
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
