import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = 'http://localhost:8000'
    
    // Get cookies from the browser request
    const cookies = request.headers.get('cookie') || ''
    
    const response = await fetch(`${backendUrl}/api/users/update_profile/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      const error = await response.json()
      return NextResponse.json(error, { status: response.status })
    }
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { message: 'Unable to update profile' },
      { status: 500 }
    )
  }
}
