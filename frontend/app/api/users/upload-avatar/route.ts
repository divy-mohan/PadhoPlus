import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = 'http://localhost:8000'
    
    const cookies = request.headers.get('cookie') || ''
    
    // Convert base64 to File/Blob
    const base64String = body.image
    const binaryString = atob(base64String)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: 'image/jpeg' })
    
    const formData = new FormData()
    formData.append('profile_image', blob, 'avatar.jpg')

    const response = await fetch(`${backendUrl}/api/users/upload-avatar/`, {
      method: 'POST',
      headers: {
        'Cookie': cookies,
      },
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      const error = await response.json()
      return NextResponse.json(error, { status: response.status })
    }
  } catch (error) {
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { message: 'Unable to upload avatar' },
      { status: 500 }
    )
  }
}
