import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const backendUrl = 'http://localhost:8000'
    
    const response = await fetch(`${backendUrl}/api/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const result = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )

    return result
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Unable to logout' },
      { status: 500 }
    )
  }
}
