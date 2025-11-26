import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = 'http://localhost:8000'
    
    const response = await fetch(`${backendUrl}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })

    const data = await response.json()
    
    if (response.ok) {
      const result = NextResponse.json(data, { status: 200 })
      const setCookieHeader = response.headers.get('set-cookie')
      if (setCookieHeader) {
        result.headers.set('set-cookie', setCookieHeader)
      }
      return result
    } else {
      return NextResponse.json(data, { status: response.status })
    }
  } catch (error) {
    console.error('Backend error:', error)
    return NextResponse.json(
      { error: 'Unable to connect to server' },
      { status: 500 }
    )
  }
}
