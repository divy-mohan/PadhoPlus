import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendUrl = 'http://localhost:8000'
    
    const response = await fetch(`${backendUrl}/api/user/profile/`, {
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
