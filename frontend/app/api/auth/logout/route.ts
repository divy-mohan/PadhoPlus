import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const backendUrl = 'http://localhost:8000'
    
    await fetch(`${backendUrl}/api/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
